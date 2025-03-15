
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-bold">
                <span className="text-care-600">Care</span>
                <span className="text-gray-800">Fusion</span>
              </div>
            </Link>
            <p className="text-gray-600 max-w-xs">
              Revolutionizing healthcare through AI-powered technology, providing seamless doctor-patient interactions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-care-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-care-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-care-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-care-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-care-600 transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-care-600 transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-care-600 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">AI Health Assistant</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">Medical Records</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">Telehealth</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">Appointment Scheduling</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-care-600 transition-colors">Emergency Services</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-care-600" />
                <span>123 Healthcare Avenue, Medical District, New Delhi, 110001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone size={20} className="flex-shrink-0 text-care-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail size={20} className="flex-shrink-0 text-care-600" />
                <span>info@carefusion.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} CareFusion. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
