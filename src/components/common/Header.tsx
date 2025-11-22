import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="text-lg sm:text-xl font-bold text-primary">ConsumerAssist</span>
        </Link>
        
       

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/chatbot">
            <Button variant="outline" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </Link>
          <Link to="/complaint-form">
            <Button size="sm" className="bg-gradient-primary">
            Generate Complaint
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/chatbot" 
                className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === "/chatbot" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={closeMobileMenu}
              >
                AI Assistant
              </Link>
              <Link 
                to="/complaint-form" 
                className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === "/complaint-form" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={closeMobileMenu}
              >
                Generate Complaint
              </Link>
            </nav>
            
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <Link to="/chatbot" onClick={closeMobileMenu}>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
              </Link>
              <Link to="/complaint-form" onClick={closeMobileMenu}>
                <Button size="sm" className="w-full bg-gradient-primary">
                  Start Complaint
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;