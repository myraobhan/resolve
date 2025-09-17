import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-xl sm:text-2xl font-bold">ConsumerAssist</span>
            </Link>
            <p className="text-primary-foreground/80 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Empowering Indian consumers to file complaints with confidence. Get professional legal documents 
              and AI-powered guidance for your consumer protection needs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs sm:text-sm text-primary-foreground/80">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span>Serving consumers across India</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-primary-foreground/80">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span>support@consumerassist.in</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-primary-foreground/80">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm sm:text-base">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/complaint-form" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm sm:text-base">
                  File Complaint
                </Link>
              </li>
              <li>
                <Link to="/complaint-form" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm sm:text-base">
                  Complaint Form
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm sm:text-base">
              <li>Consumer Protection Act 2019</li>
              <li>Consumer Forum Guidelines</li>
              <li>Know Your Rights</li>
              <li>Legal Procedures</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-xs sm:text-sm text-primary-foreground/80 mb-4 sm:mb-0 text-center sm:text-left">
            © 2024 ConsumerAssist. All rights reserved. | Made with ❤️ for Indian consumers
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
            <span className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors">
              Disclaimer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;