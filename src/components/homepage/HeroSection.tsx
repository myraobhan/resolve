import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Users, FileText } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-24 xl:py-32 bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-xs sm:text-sm font-medium">Protected by Consumer Protection Act 2019</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Resolve Your Consumer Complaints with 
              <span className="block text-accent">Confidence</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto px-2">
              Navigate India's consumer protection system with AI-powered guidance. 
              Get professional complaint documents generated instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link to="/complaint-form" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="text-primary hover:text-primary w-full sm:w-auto">
                Start Your Complaint
              </Button>
            </Link>
            <Link to="/chatbot" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-white border-white bg-white text-primary w-full sm:w-auto">
                Get AI Assistance
              </Button>
            </Link>
          </div>

          {/* E-Jagriti Portal Link */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span className="text-sm sm:text-base font-semibold">Official Government Portal</span>
              </div>
              <p className="text-xs sm:text-sm opacity-90 mb-4 text-center">
                File complaints directly with the National Consumer Disputes Redressal Commission
              </p>
              <div className="flex justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white bg-white/20 hover:bg-white/30"
                  onClick={() => window.open('https://e-jagriti.gov.in/', '_blank', 'noopener,noreferrer')}
                >
                  Visit E-Jagriti Portal
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">No Registration Required</h3>
              <p className="opacity-80 text-sm sm:text-base">Start filing your complaint immediately without any signup</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">AI-Powered Guidance</h3>
              <p className="opacity-80 text-sm sm:text-base">Get instant answers about consumer rights and legal procedures</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Professional Documents</h3>
              <p className="opacity-80 text-sm sm:text-base">Receive legally compliant PDF complaints ready for submission</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;