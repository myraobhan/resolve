import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

const LegalDocuments = () => {
  const documents = [
    {
      id: "privacy-notice",
      title: "Privacy Notice - AI Assistant",
      description: "Learn about how we handle your data and privacy when using our AI assistant for consumer complaints.",
      url: "https://docs.google.com/document/d/1oteoqAi7FZ4zwpz46taKR5iaIF5FEHC_/edit?usp=sharing&ouid=101723352975393781795&rtpof=true&sd=true",
      type: "Privacy Policy"
    },
    {
      id: "terms-service",
      title: "Terms of Service",
      description: "Read our terms and conditions for using the ConsumerAssist platform and services.",
      url: "https://docs.google.com/document/d/1mDOZ2qr9j6CPVoZHZpesslL2NhUlRhIa/edit?usp=sharing&ouid=101723352975393781795&rtpof=true&sd=true",
      type: "Legal Document"
    },
    {
      id: "user-guide",
      title: "User Guide & Instructions",
      description: "Comprehensive guide on how to use our platform effectively for filing consumer complaints.",
      url: "https://docs.google.com/document/d/15YiJoPN9tZVWIu5BPkVBuKuUnxR4iLGB/edit?usp=sharing&ouid=101723352975393781795&rtpof=true&sd=true",
      type: "User Guide"
    }
  ];

  const handleDocumentClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Important Legal Documents
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Access our legal documents, privacy policies, and user guides to understand your rights and our services better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {documents.map((doc) => (
            <Card key={doc.id} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-primary text-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-xs sm:text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                    {doc.type}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {doc.description}
                </p>
                <Button
                  onClick={() => handleDocumentClick(doc.url)}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 sm:p-6 max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-warning mb-2 sm:mb-3">
              Important Notice
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              These documents contain important legal information about your rights and our services. 
              Please read them carefully before using our platform. If you have any questions, 
              please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDocuments;
