import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, MessageCircle } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Scale className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">ConsumerAssist</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/chatbot" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/chatbot" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            AI Assistant
          </Link>
          <Link 
            to="/complaint-form" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/complaint-form" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            File Complaint
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/chatbot">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <MessageCircle className="mr-2 h-4 w-4" />
              Get Help
            </Button>
          </Link>
          <Link to="/complaint-form">
            <Button size="sm" className="bg-gradient-primary">
              Start Complaint
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;