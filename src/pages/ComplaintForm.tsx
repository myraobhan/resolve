import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateComplaintPDF } from "@/services/pdfService";

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
  causeOfActionPlace: string;
  filingPlace: string;
  reliefType: string;
  reliefAmount: string;
  compensationAmount: string;
  declarationDate: string;
  declarationPlace: string;
  district: string;
  state: string;
}

const ComplaintForm = () => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    complainantName: "",
    complainantAddress: "",
    complainantPhone: "",
    complainantEmail: "",
    oppositePartyName: "",
    oppositePartyAddress: "",
    oppositePartyContact: "",
    totalValue: "",
    productDescription: "",
    transactionDate: "",
    transactionPlace: "",
    amountPaid: "",
    paymentMode: "",
    issueDescription: "",
    communicationAttempts: "",
    supportingDocuments: "",
    causeOfActionDate: "",
    causeOfActionPlace: "",
    filingPlace: "",
    reliefType: "",
    reliefAmount: "",
    compensationAmount: "",
    declarationDate: new Date().toISOString().split("T")[0],
    declarationPlace: "",
    district: "",
    state: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to get date validation message
  const getDateValidationMessage = () => {
    if (formData.transactionDate && formData.causeOfActionDate) {
      const transactionDate = new Date(formData.transactionDate);
      const causeOfActionDate = new Date(formData.causeOfActionDate);
      
      if (transactionDate >= causeOfActionDate) {
        return "Date of Transaction must be earlier than Date of Cause of Action.";
      }
      
      const daysDiff = Math.floor((causeOfActionDate.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < 10) {
        return `Minimum 10 days gap required. Current gap: ${daysDiff} days.`;
      }
      
      return `✓ Valid date range. Gap: ${daysDiff} days.`;
    }
    return "";
  };

  const handleInputChange = (field: keyof ComplaintFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    // Check if transaction date is earlier than cause of action date
    if (formData.transactionDate && formData.causeOfActionDate) {
      const transactionDate = new Date(formData.transactionDate);
      const causeOfActionDate = new Date(formData.causeOfActionDate);
      
      // Check if transaction date is later than cause of action date
      if (transactionDate >= causeOfActionDate) {
        toast({
          title: "Validation Error",
          description: "Date of Transaction must be earlier than Date of Cause of Action.",
          variant: "destructive",
        });
        return false;
      }
      
      // Check minimum 10 days gap between transaction and cause of action
      const daysDiff = Math.floor((causeOfActionDate.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < 10) {
        toast({
          title: "Validation Error",
          description: "There must be a minimum 10 days gap between the transaction date and cause of action date.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await generateComplaintPDF(formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your complaint form has been generated and downloaded.",
          variant: "default",
        });
      } else {
        throw new Error(result.error || "Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getForumType = () => {
    const value = parseFloat(formData.totalValue.replace(/[^0-9.]/g, ""));
    if (value <= 10000000) return "District Forum";
    if (value <= 100000000) return "State Commission";
    return "National Commission";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Consumer Complaint Form
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Generate a professional complaint form for consumer disputes
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="bg-gradient-primary text-white p-4 sm:p-6">
              <CardTitle className="flex items-center text-sm sm:text-base">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Complaint Form Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Forum Type Display */}
                {formData.totalValue && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800 text-sm sm:text-base">
                        Recommended Forum: {getForumType()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) =>
                          handleInputChange("district", e.target.value)
                        }
                        placeholder="e.g., Mumbai"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="e.g., Maharashtra"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Complainant Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Complainant Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="complainantName">Full Name *</Label>
                      <Input
                        id="complainantName"
                        value={formData.complainantName}
                        onChange={(e) =>
                          handleInputChange("complainantName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="complainantPhone">Phone Number *</Label>
                      <Input
                        id="complainantPhone"
                        value={formData.complainantPhone}
                        onChange={(e) =>
                          handleInputChange("complainantPhone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="complainantEmail">Email Address *</Label>
                    <Input
                      id="complainantEmail"
                      type="email"
                      value={formData.complainantEmail}
                      onChange={(e) =>
                        handleInputChange("complainantEmail", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="complainantAddress">
                      Complete Address *
                    </Label>
                    <Textarea
                      id="complainantAddress"
                      value={formData.complainantAddress}
                      onChange={(e) =>
                        handleInputChange("complainantAddress", e.target.value)
                      }
                      required
                      rows={3}
                    />
                  </div>
                </div>

                {/* Opposite Party Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Opposite Party Information
                  </h3>

                  <div>
                    <Label htmlFor="oppositePartyName">
                      Name/Business Name *
                    </Label>
                    <Input
                      id="oppositePartyName"
                      value={formData.oppositePartyName}
                      onChange={(e) =>
                        handleInputChange("oppositePartyName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="oppositePartyAddress">
                      Complete Address *
                    </Label>
                    <Textarea
                      id="oppositePartyAddress"
                      value={formData.oppositePartyAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "oppositePartyAddress",
                          e.target.value
                        )
                      }
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="oppositePartyContact">
                      Phone/Email (if available)
                    </Label>
                    <Input
                      id="oppositePartyContact"
                      value={formData.oppositePartyContact}
                      onChange={(e) =>
                        handleInputChange(
                          "oppositePartyContact",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                 {/* Transaction Details */}
                 <div className="space-y-3 sm:space-y-4">
                   <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                     Transaction Details
                   </h3>

                   <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                     <div className="flex items-start space-x-2">
                       <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                       <div>
                         <h4 className="font-semibold text-orange-800 text-sm sm:text-base mb-1">
                           Important Date Requirements
                         </h4>
                         <ul className="text-xs sm:text-sm text-orange-700 space-y-1">
                           <li>• <strong>Date of Transaction:</strong> When you purchased/availed the service</li>
                           <li>• <strong>Date of Cause of Action:</strong> When you first noticed the defect/deficiency</li>
                           <li>• <strong>Rule:</strong> Transaction date must be earlier than cause of action date</li>
                           <li>• <strong>Minimum Gap:</strong> At least 10 days between transaction and cause of action</li>
                         </ul>
                       </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                     <div>
                       <Label htmlFor="totalValue">
                         Total Claim Value (₹) *
                       </Label>
                       <Input
                         id="totalValue"
                         value={formData.totalValue}
                         onChange={(e) =>
                           handleInputChange("totalValue", e.target.value)
                         }
                         placeholder="e.g., 50000"
                         required
                       />
                     </div>
                     <div>
                       <Label htmlFor="amountPaid">Amount Paid (₹) *</Label>
                       <Input
                         id="amountPaid"
                         value={formData.amountPaid}
                         onChange={(e) =>
                           handleInputChange("amountPaid", e.target.value)
                         }
                         required
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                     <div>
                       <Label htmlFor="transactionDate">
                         Date of Transaction *
                       </Label>
                       <Input
                         id="transactionDate"
                         type="date"
                         value={formData.transactionDate}
                         onChange={(e) =>
                           handleInputChange("transactionDate", e.target.value)
                         }
                         required
                       />
                       {getDateValidationMessage() && (
                         <p className={`text-xs mt-1 ${
                           getDateValidationMessage().includes('✓') 
                             ? 'text-green-600' 
                             : 'text-red-600'
                         }`}>
                           {getDateValidationMessage()}
                         </p>
                       )}
                     </div>
                     <div>
                       <Label htmlFor="paymentMode">Mode of Payment *</Label>
                       <Select
                         value={formData.paymentMode}
                         onValueChange={(value) =>
                           handleInputChange("paymentMode", value)
                         }
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Select payment mode" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Cash">Cash</SelectItem>
                           <SelectItem value="Credit Card">
                             Credit Card
                           </SelectItem>
                           <SelectItem value="Debit Card">Debit Card</SelectItem>
                           <SelectItem value="UPI">UPI</SelectItem>
                           <SelectItem value="Net Banking">
                             Net Banking
                           </SelectItem>
                           <SelectItem value="Cheque">Cheque</SelectItem>
                           <SelectItem value="Other">Other</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>

                   <div>
                     <Label htmlFor="transactionPlace">
                       Place of Transaction *
                     </Label>
                     <Input
                       id="transactionPlace"
                       value={formData.transactionPlace}
                       onChange={(e) =>
                         handleInputChange("transactionPlace", e.target.value)
                       }
                       required
                     />
                   </div>

                   <div>
                     <Label htmlFor="productDescription">
                       Product/Service Description *
                     </Label>
                     <Textarea
                       id="productDescription"
                       value={formData.productDescription}
                       onChange={(e) =>
                         handleInputChange("productDescription", e.target.value)
                       }
                       required
                       rows={3}
                     />
                   </div>
                 </div>

                {/* Issue Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Issue Details
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 text-sm sm:text-base mb-1">
                          Important Guidelines for Issue Description
                        </h4>
                        <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                          <li>• Be specific about the defect or deficiency</li>
                          <li>• Mention when you first noticed the problem</li>
                          <li>• Describe how it affects the product's functionality</li>
                          <li>• Include any safety concerns or health risks</li>
                          <li>• Mention if the issue was present from purchase or developed later</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="issueDescription">
                      Detailed Description of the Issue *
                    </Label>
                    <Textarea
                      id="issueDescription"
                      value={formData.issueDescription}
                      onChange={(e) =>
                        handleInputChange("issueDescription", e.target.value)
                      }
                      required
                      rows={5}
                      placeholder="Provide a detailed description of the defect in goods or deficiency in services. Include specific details about what went wrong, when you noticed it, and how it impacts the product's intended use..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="communicationAttempts">
                      Communication Attempts with Opposite Party *
                    </Label>
                    <Textarea
                      id="communicationAttempts"
                      value={formData.communicationAttempts}
                      onChange={(e) =>
                        handleInputChange(
                          "communicationAttempts",
                          e.target.value
                        )
                      }
                      required
                      rows={4}
                      placeholder="Describe all your attempts to resolve the issue with the opposite party. Include dates, methods of communication (phone, email, in-person), responses received, and any promises made by them..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportingDocuments">
                      Supporting Documents Available *
                    </Label>
                    <Textarea
                      id="supportingDocuments"
                      value={formData.supportingDocuments}
                      onChange={(e) =>
                        handleInputChange("supportingDocuments", e.target.value)
                      }
                      required
                      rows={3}
                      placeholder="List all documents you have: receipts, invoices, warranty cards, emails, photos, videos, witness statements, expert reports, etc. Be specific about what each document proves..."
                    />
                  </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                     <div>
                       <Label htmlFor="causeOfActionDate">
                         Date of Cause of Action *
                       </Label>
                       <Input
                         id="causeOfActionDate"
                         type="date"
                         value={formData.causeOfActionDate}
                         onChange={(e) =>
                           handleInputChange("causeOfActionDate", e.target.value)
                         }
                         required
                       />
                       <p className="text-xs text-muted-foreground mt-1">
                         Date when you first became aware of the defect/deficiency
                       </p>
                       {getDateValidationMessage() && (
                         <p className={`text-xs mt-1 ${
                           getDateValidationMessage().includes('✓') 
                             ? 'text-green-600' 
                             : 'text-red-600'
                         }`}>
                           {getDateValidationMessage()}
                         </p>
                       )}
                     </div>
                    <div>
                      <Label htmlFor="causeOfActionPlace">
                        Place of Cause of Action *
                      </Label>
                      <Input
                        id="causeOfActionPlace"
                        value={formData.causeOfActionPlace}
                        onChange={(e) =>
                          handleInputChange("causeOfActionPlace", e.target.value)
                        }
                        required
                        placeholder="e.g., Mumbai, Maharashtra"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="filingPlace">
                      Place of Filing Complaint *
                    </Label>
                    <Input
                      id="filingPlace"
                      value={formData.filingPlace}
                      onChange={(e) =>
                        handleInputChange("filingPlace", e.target.value)
                      }
                      required
                      placeholder="e.g., Mumbai, Maharashtra"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Usually the same as your residence or where the transaction occurred
                    </p>
                  </div>
                </div>

                {/* Relief Sought and Compensation */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Relief Sought and Compensation
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 text-sm sm:text-base mb-1">
                          Types of Relief Available
                        </h4>
                        <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                          <li>• <strong>Replacement:</strong> Get a new product/service</li>
                          <li>• <strong>Refund:</strong> Get your money back</li>
                          <li>• <strong>Return with Money Back:</strong> Return product and get refund</li>
                          <li>• <strong>Compensation:</strong> Additional amount for inconvenience</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reliefType">Type of Relief Sought *</Label>
                    <Select
                      value={formData.reliefType}
                      onValueChange={(value) =>
                        handleInputChange("reliefType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of relief you are seeking" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="replacement">Replacement of Product/Service</SelectItem>
                        <SelectItem value="refund">Refund of Amount Paid</SelectItem>
                        <SelectItem value="return_with_refund">Return of Product with Money Back</SelectItem>
                        <SelectItem value="compensation_only">Compensation Only</SelectItem>
                        <SelectItem value="multiple">Multiple Reliefs (specify in amount field)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="reliefAmount">
                        Relief Amount (₹) *
                      </Label>
                      <Input
                        id="reliefAmount"
                        value={formData.reliefAmount}
                        onChange={(e) =>
                          handleInputChange("reliefAmount", e.target.value)
                        }
                        required
                        placeholder="Amount for replacement/refund"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Amount you paid or value of replacement
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="compensationAmount">
                        Additional Compensation (₹)
                      </Label>
                      <Input
                        id="compensationAmount"
                        value={formData.compensationAmount}
                        onChange={(e) =>
                          handleInputChange(
                            "compensationAmount",
                            e.target.value
                          )
                        }
                        placeholder="For inconvenience, mental agony, etc."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Additional amount for inconvenience and mental harassment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    Declaration
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="declarationDate">
                        Declaration Date *
                      </Label>
                      <Input
                        id="declarationDate"
                        type="date"
                        value={formData.declarationDate}
                        onChange={(e) =>
                          handleInputChange("declarationDate", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="declarationPlace">
                        Declaration Place *
                      </Label>
                      <Input
                        id="declarationPlace"
                        value={formData.declarationPlace}
                        onChange={(e) =>
                          handleInputChange("declarationPlace", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* District Court Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold border-b pb-2">
                    District Court Information
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 text-sm sm:text-base mb-2">
                          Important Information About District Consumer Forums
                        </h4>
                        <div className="text-xs sm:text-sm text-yellow-700 space-y-2">
                          <div>
                            <strong>Jurisdiction:</strong> District Consumer Disputes Redressal Commission handles complaints up to ₹1 crore.
                          </div>
                          <div>
                            <strong>Filing Fee:</strong> ₹200 for claims up to ₹1 lakh, ₹500 for claims up to ₹5 lakh, ₹1000 for claims up to ₹10 lakh, ₹2000 for claims up to ₹50 lakh, ₹5000 for claims up to ₹1 crore.
                          </div>
                          <div>
                            <strong>Time Limit:</strong> Complaint must be filed within 2 years from the date of cause of action.
                          </div>
                          <div>
                            <strong>Process:</strong> After filing, the forum will issue notice to the opposite party and schedule hearings.
                          </div>
                          <div>
                            <strong>Documents Required:</strong> Original complaint, supporting documents, and fee payment receipt.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 text-sm sm:text-base mb-1">
                          Next Steps After Filing
                        </h4>
                        <ol className="text-xs sm:text-sm text-blue-700 space-y-1 list-decimal list-inside">
                          <li>Submit the printed and signed complaint form to the District Consumer Forum</li>
                          <li>Pay the required filing fee</li>
                          <li>Attach all supporting documents mentioned in your complaint</li>
                          <li>Keep copies of all submitted documents for your records</li>
                          <li>Attend all scheduled hearings</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4 sm:pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        <span className="text-sm sm:text-base">Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">Generate Complaint PDF</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Important Information */}
          <div className="mt-6 sm:mt-8 bg-warning/10 border border-warning/20 rounded-lg p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning mb-2 text-sm sm:text-base">
                  Important Information
                </h3>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <li>
                    • This form generates a professional complaint document
                    based on the Consumer Protection Act, 2019
                  </li>
                  <li>
                    • The appropriate forum (District/State/National) is
                    automatically determined based on claim value
                  </li>
                  <li>
                    • Print the generated PDF and sign it before submitting to
                    the consumer forum
                  </li>
                  <li>
                    • Attach all supporting documents mentioned in the complaint
                  </li>
                  <li>
                    • This is a template and should not be considered as legal
                    advice
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintForm;
