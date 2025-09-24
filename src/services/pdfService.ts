import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ComplaintFormData {
  complainantName: string;
  complainantAddress: string;
  complainantPhone: string;
  complainantEmail: string;
  oppositePartyName: string;
  oppositePartyAddress: string;
  oppositePartyContact: string;
  totalValue: string;
  productDescription: string;
  transactionDate: string;
  transactionPlace: string;
  amountPaid: string;
  paymentMode: string;
  issueDescription: string;
  communicationAttempts: string;
  supportingDocuments: string;
  causeOfActionDate: string;
  refundAmount: string;
  compensationAmount: string;
  declarationDate: string;
  declarationPlace: string;
  district: string;
  state: string;
}

export const generateComplaintPDF = async (complaintData: ComplaintFormData) => {
  try {
    // Determine forum type based on claim value
    const claimValue = parseFloat(complaintData.totalValue.replace(/[^0-9.]/g, ""));
    let forumName, commissionType;

    if (claimValue <= 10000000) {
      forumName = "DISTRICT";
      commissionType = "DISTRICT COMMISSION";
    } else if (claimValue <= 100000000) {
      forumName = "STATE";
      commissionType = "STATE COMMISSION";
    } else {
      forumName = "NATIONAL";
      commissionType = "NATIONAL COMMISSION";
    }

    // Create HTML content for the complaint form
    const location = `${complaintData.district}, ${complaintData.state}`;
    const htmlContent = createComplaintHTML(complaintData, forumName, commissionType, location);

    // Create a temporary div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Times New Roman, serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.color = '#333';
    
    document.body.appendChild(tempDiv);

    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    });

    // Remove temporary div
    document.body.removeChild(tempDiv);

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const filename = `consumer_complaint_${Date.now()}.pdf`;

    // Save PDF
    pdf.save(filename);

    return {
      success: true,
      filename: filename,
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate PDF",
    };
  }
};

const createComplaintHTML = (data: ComplaintFormData, forumName: string, commissionType: string, location: string) => {
  return `
    <div style="font-family: 'Times New Roman', serif; line-height: 1.6; color: #333;">
      <div style="text-align: center; font-weight: bold; margin-bottom: 30px;">
        <div style="font-size: 18px; margin-bottom: 10px;">BEFORE THE ${forumName} CONSUMER DISPUTES REDRESSAL COMMISSION</div>
        <div style="font-size: 16px; margin-bottom: 5px;">${commissionType}</div>
        <div style="font-size: 14px; margin-bottom: 20px;">${location}</div>
      </div>

      <div style="margin-bottom: 25px;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 10px; text-decoration: underline;">IN THE MATTER OF:</div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; margin-bottom: 5px;">Complainant</div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Name:</span>
            <span style="margin-left: 20px;">${data.complainantName}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Address:</span>
            <span style="margin-left: 20px;">${data.complainantAddress}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Phone Number:</span>
            <span style="margin-left: 20px;">${data.complainantPhone}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Email:</span>
            <span style="margin-left: 20px;">${data.complainantEmail}</span>
          </div>
        </div>

        <div style="text-align: center; font-weight: bold; margin: 20px 0; font-size: 16px;">Versus</div>

        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; margin-bottom: 5px;">Opposite Party</div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Name:</span>
            <span style="margin-left: 20px;">${data.oppositePartyName}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Address:</span>
            <span style="margin-left: 20px;">${data.oppositePartyAddress}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: bold;">Phone/Email:</span>
            <span style="margin-left: 20px;">${data.oppositePartyContact}</span>
          </div>
        </div>
      </div>

      <div style="text-align: center; font-weight: bold; font-size: 16px; margin: 30px 0 20px 0; text-decoration: underline;">COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019</div>

      <div style="margin-bottom: 20px;">
        <div style="font-weight: bold; margin-bottom: 8px;">1. Jurisdiction</div>
        <div style="margin-left: 20px; text-align: justify;">
          The complainant submits that this Hon'ble Forum has territorial jurisdiction to entertain the present complaint as the cause of action arose within its jurisdiction, and/or the opposite party resides or carries on business within this jurisdiction. The pecuniary jurisdiction is also established as the value of the goods/services and compensation claimed is ₹${data.totalValue}.
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="font-weight: bold; margin-bottom: 8px;">2. Facts of the Case</div>
        <div style="margin-left: 20px; text-align: justify;">
          The complainant purchased/availed the following product/service:<br><br>
          <strong>Product/Service Description:</strong> ${data.productDescription}<br>
          <strong>Date of transaction:</strong> ${data.transactionDate}<br>
          <strong>Place of transaction:</strong> ${data.transactionPlace}<br>
          <strong>Amount paid:</strong> ₹${data.amountPaid}<br>
          <strong>Mode of payment:</strong> ${data.paymentMode}<br><br>
          
          The complainant experienced the following issue:<br>
          ${data.issueDescription}<br><br>
          
          Despite repeated attempts, the opposite party failed to resolve the issue:<br>
          ${data.communicationAttempts}<br><br>
          
          The complainant has attached the following documents in support:<br>
          ${data.supportingDocuments}
        </div>
      </div>

      <div style="margin-bottom: 20px; page-break-before: always; margin-top: 60px;">
        <div style="font-weight: bold; margin-bottom: 8px;">3. Cause of Action</div>
        <div style="margin-left: 20px; text-align: justify;">
          The cause of action arose on ${data.causeOfActionDate}, when the product/service was found to be defective/deficient and the opposite party failed to respond or rectify the issue, leading to inconvenience, financial loss, and mental harassment.
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="font-weight: bold; margin-bottom: 8px;">4. Reliefs Sought</div>
        <div style="margin-left: 20px; text-align: justify;">
          The complainant prays for the following reliefs:<br>
          • Refund of ₹${data.refundAmount}, or<br>
          • Replacement of the product/service, or<br>
          • Compensation of ₹${data.compensationAmount} for inconvenience, mental agony, and loss, and<br>
          • Any other relief deemed just and proper by this Hon'ble Forum.
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="font-weight: bold; margin-bottom: 8px;">5. Declaration and Verification</div>
        <div style="margin-left: 20px; text-align: justify;">
          I, ${data.complainantName}, the complainant herein, do hereby declare that the facts stated above are true to the best of my knowledge and belief, and no part of it is false or concealed.
        </div>
      </div>

      <div style="margin-top: 40px;">
        <div style="margin-bottom: 8px;">
          <span style="font-weight: bold;">Date:</span>
          <span style="margin-left: 20px;">${data.declarationDate}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span style="font-weight: bold;">Place:</span>
          <span style="margin-left: 20px;">${data.declarationPlace}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span style="font-weight: bold;">Signature:</span>
          <div style="border-top: 1px solid #000; width: 200px; margin-top: 30px;"></div>
          <span style="margin-left: 20px;">(Complainant)</span>
        </div>
      </div>
    </div>
  `;
};
