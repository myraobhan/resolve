import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Users, FileText } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Protected by Consumer Protection Act 2019</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Resolve Your Consumer Complaints with 
              <span className="block text-accent">Confidence</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Navigate India's consumer protection system with AI-powered guidance. 
              Get professional complaint documents generated instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/assessment-form">
              <Button size="lg" variant="secondary" className="text-primary hover:text-primary">
                Start Your Complaint
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button size="lg" variant="outline" className="text-white border-white bg-white text-primary">
                Get AI Assistance
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Registration Required</h3>
              <p className="opacity-80">Start filing your complaint immediately without any signup</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Guidance</h3>
              <p className="opacity-80">Get instant answers about consumer rights and legal procedures</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Documents</h3>
              <p className="opacity-80">Receive legally compliant PDF complaints ready for submission</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;