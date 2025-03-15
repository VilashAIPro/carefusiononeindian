
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold text-care-600 transition-all duration-300 hover:text-care-700"
            >
              <span className="text-care-600">Care</span>
              <span className="text-gray-800">Fusion</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-care-600 transition-colors duration-300">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-care-600 transition-colors duration-300">About</Link>
            <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors duration-300">Services</Link>
            <Link to="/contact" className="text-gray-600 hover:text-care-600 transition-colors duration-300">Contact</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2">
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="glass-button flex items-center space-x-2">
                <UserPlus size={16} />
                <span>Register</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-care-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-care-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="block py-2 text-gray-600 hover:text-care-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-600 hover:text-care-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="glass-button w-full justify-center">
                  <UserPlus size={16} className="mr-2" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
