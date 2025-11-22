import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Bot, FileCheck, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "Answer Simple Questions",
      description: "Fill out our easy assessment form with details about your complaint and transaction",
      step: "01"
    },
    {
      icon: Bot,
      title: "Get AI Guidance",
      description: "Our AI assistant helps you understand your rights and guides you through the process",
      step: "02"
    },
    {
      icon: FileCheck,
      title: "Receive Professional Documents",
      description: "Download your legally compliant complaint document ready for submission to the appropriate forum",
      step: "03"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How It Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Get your consumer complaint document ready in minutes. Follow these simple steps to generate a professional, legally compliant complaint form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-accent text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-soft flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;