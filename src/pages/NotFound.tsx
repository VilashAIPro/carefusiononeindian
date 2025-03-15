
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto glass-card rounded-xl p-12 animate-fade-in">
            <div className="w-24 h-24 bg-care-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl font-bold text-care-600">404</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Page Not Found</h1>
            
            <p className="text-gray-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="glass-button w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
