import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8" />
              <span className="text-2xl font-bold">ConsumerAssist</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Empowering Indian consumers to file complaints with confidence. Get professional legal documents 
              and AI-powered guidance for your consumer protection needs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Serving consumers across India</span>
              </div>
              <div className="flex items-center text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@consumerassist.in</span>
              </div>
              <div className="flex items-center text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 mr-2" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/assessment-form" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  File Complaint
                </Link>
              </li>
              <li>
                <Link to="/complaint-form" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Complaint Form
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Consumer Protection Act 2019</li>
              <li>Consumer Forum Guidelines</li>
              <li>Know Your Rights</li>
              <li>Legal Procedures</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
            © 2024 ConsumerAssist. All rights reserved. | Made with ❤️ for Indian consumers
          </div>
          <div className="flex space-x-6 text-sm">
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