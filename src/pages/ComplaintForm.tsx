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
  refundAmount: string;
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
    refundAmount: "",
    compensationAmount: "",
    declarationDate: new Date().toISOString().split("T")[0],
    declarationPlace: "",
    district: "",
    state: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ComplaintFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Consumer Complaint Form
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate a professional complaint form for consumer disputes
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="bg-gradient-primary text-white">
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Complaint Form Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Forum Type Display */}
                {formData.totalValue && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">
                        Recommended Forum: {getForumType()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Complainant Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Transaction Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Issue Details
                  </h3>

                  <div>
                    <Label htmlFor="issueDescription">
                      Description of the Issue *
                    </Label>
                    <Textarea
                      id="issueDescription"
                      value={formData.issueDescription}
                      onChange={(e) =>
                        handleInputChange("issueDescription", e.target.value)
                      }
                      required
                      rows={4}
                      placeholder="Describe the defect in goods or deficiency in services..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="communicationAttempts">
                      Communication Attempts *
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
                      rows={3}
                      placeholder="Describe your attempts to resolve the issue with the opposite party..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportingDocuments">
                      Supporting Documents *
                    </Label>
                    <Textarea
                      id="supportingDocuments"
                      value={formData.supportingDocuments}
                      onChange={(e) =>
                        handleInputChange("supportingDocuments", e.target.value)
                      }
                      required
                      rows={3}
                      placeholder="List all documents you have (receipts, invoices, emails, photos, etc.)"
                    />
                  </div>

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
                  </div>
                </div>

                {/* Relief Sought */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Relief Sought
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="refundAmount">Refund Amount (₹)</Label>
                      <Input
                        id="refundAmount"
                        value={formData.refundAmount}
                        onChange={(e) =>
                          handleInputChange("refundAmount", e.target.value)
                        }
                        placeholder="Amount to be refunded"
                      />
                    </div>
                    <div>
                      <Label htmlFor="compensationAmount">
                        Compensation Amount (₹)
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
                        placeholder="Compensation for inconvenience"
                      />
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Declaration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Generate Complaint PDF
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Important Information */}
          <div className="mt-8 bg-warning/10 border border-warning/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning mb-2">
                  Important Information
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
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
