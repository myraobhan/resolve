import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Globe, Shield } from "lucide-react";

const LegalDocuments = () => {
  const documents = [
    
    {
      id: "legal-document",
      title: "Privacy Policy",
      description: "Learn about how we collect, use, and protect your personal information when you use our platform and services.",
      url: "https://docs.google.com/document/d/1EW99ByfYMVPYewNmNzI1IS1cgwp1_Skm/edit?usp=sharing&ouid=108867789058297546033&rtpof=true&sd=true",
      type: "Legal Document",
      icon: FileText
    }
  ];

  const governmentResources = [
    {
      id: "e-jagriti-portal",
      title: "E-Jagriti Portal - Official",
      description: "File consumer complaints online directly with the National Consumer Disputes Redressal Commission.",
      url: "https://e-jagriti.gov.in/",
      type: "Government Portal",
      icon: Globe
    },
    {
      id: "national-consumer-helpline",
      title: "National Consumer Helpline (NCH)",
      description: "Access the National Consumer Helpline service for assistance with consumer complaints and grievances.",
      url: "https://services.india.gov.in/service/detail/national-consumer-helpline-nch",
      type: "Government Service",
      icon: Shield
    },
    {
      id: "ejagriti-guide",
      title: "Complete E-Jagriti Guide",
      description: "Step-by-step guide on how to file consumer complaints online using the E-Jagriti portal.",
      url: "https://lawgicalshots.com/how-to-file-a-case-in-consumer-court-and-ejagriti-portal/",
      type: "Tutorial Guide",
      icon: FileText
    }
  ];

  const handleDocumentClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderCard = (item: any) => {
    const IconComponent = item.icon;
    return (
      <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 overflow-hidden group">
        <CardHeader className="bg-gradient-primary text-white p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xs sm:text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
              {item.type}
            </span>
          </div>
          <CardTitle className="text-lg sm:text-xl">{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            {item.description}
          </p>
          <Button
            onClick={() => handleDocumentClick(item.url)}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {item.type.includes('Government') ? 'Visit Portal' : 'View Document'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        {/* Government Resources Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Official Government Resources
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Access the official E-Jagriti portal and government resources for filing consumer complaints online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16">
          {governmentResources.map(renderCard)}
        </div>

        {/* Legal Documents Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Important Legal Documents
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Access our legal documents, privacy policies, and user guides to understand your rights and our services better.
          </p>
        </div>

        <div className="flex justify-center items-center mt-8 sm:mt-12">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-md w-full justify-items-center">
            {documents.map(renderCard)}
          </div>
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
