
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-care-600 hover:text-care-700 transition-colors">
              <ChevronLeft size={18} />
              <span className="ml-1">Back to Home</span>
            </Link>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-3 text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to your CareFusion account to continue your healthcare journey
              </p>
            </div>
            
            <AuthForm />
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                By signing in, you agree to our{' '}
                <a href="#" className="text-care-600 hover:text-care-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-care-600 hover:text-care-700">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
