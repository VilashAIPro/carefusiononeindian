
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  Stethoscope, 
  MessageCircle, 
  Shield, 
  Heart, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: <User className="h-6 w-6 text-care-600" />,
    title: "Patient Profiles",
    description: "Securely store and manage your medical information in one place"
  },
  {
    icon: <Calendar className="h-6 w-6 text-care-600" />,
    title: "Easy Appointments",
    description: "Book and manage appointments with your preferred doctors"
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-care-600" />,
    title: "Doctor Connect",
    description: "Find and connect with specialized healthcare professionals"
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-care-600" />,
    title: "AI Chatbot",
    description: "Get instant answers to your health-related questions"
  },
  {
    icon: <Shield className="h-6 w-6 text-care-600" />,
    title: "Secure Records",
    description: "End-to-end encrypted medical records and communications"
  },
  {
    icon: <Heart className="h-6 w-6 text-care-600" />,
    title: "Health Insights",
    description: "Personalized AI-powered health recommendations"
  }
];

const testimonials = [
  {
    quote: "CareFusion has transformed how I connect with my patients. The intuitive interface and AI assistant save me hours every week.",
    name: "Dr. Ananya Sharma",
    position: "Cardiologist, Apollo Hospital",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    quote: "The app has made managing my diabetes so much easier. I can book appointments instantly and get medication reminders.",
    name: "Rajesh Kumar",
    position: "Patient",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    quote: "I love how CareFusion keeps all my family's medical records organized. The emergency contact feature gives me peace of mind.",
    name: "Priya Patel",
    position: "Mother of Two",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className={`lg:w-1/2 max-w-lg ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.1s'}}>
                <span className="inline-block py-1 px-3 rounded-full bg-care-100 text-care-800 font-medium text-sm mb-4">
                  AI-Powered Healthcare
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900">
                  Smart Healthcare Management at Your Fingertips
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  CareFusion connects patients with doctors seamlessly, using AI to provide personalized 
                  healthcare insights, secure medical records, and simplified appointment booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button className="glass-button text-base py-6 px-8">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" className="text-base py-6 px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className={`lg:w-1/2 mt-12 lg:mt-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.3s'}}>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-care-100 rounded-full -z-10"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-care-50 rounded-full -z-10"></div>
                  <div className="glass-card overflow-hidden rounded-2xl shadow-2xl hover-scale">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Doctor using tablet with patient" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-care-100 text-care-800 font-medium text-sm mb-4">
                Powerful Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Everything You Need for Better Healthcare
              </h2>
              <p className="text-lg text-gray-600">
                CareFusion combines the latest AI technology with intuitive design to make healthcare 
                management simple, secure, and effective.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-8 rounded-xl hover-scale ${isVisible ? 'animate-fade-in' : ''}`}
                  style={{animationDelay: `${0.1 + index * 0.1}s`}}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-care-50 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-care-100 text-care-800 font-medium text-sm mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                How CareFusion Works
              </h2>
              <p className="text-lg text-gray-600">
                Getting started with CareFusion is easy. Follow these simple steps to begin 
                your journey to better healthcare management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className={`text-center ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.1s'}}>
                <div className="w-16 h-16 rounded-full bg-care-100 text-care-600 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Create Your Account</h3>
                <p className="text-gray-600">
                  Sign up as a patient or doctor using your email or phone number. Verify your identity
                  and set up your personalized profile.
                </p>
              </div>
              
              <div className={`text-center ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.3s'}}>
                <div className="w-16 h-16 rounded-full bg-care-100 text-care-600 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Connect with Healthcare</h3>
                <p className="text-gray-600">
                  Find doctors by specialty, location, or availability. Book appointments and establish
                  your care network.
                </p>
              </div>
              
              <div className={`text-center ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.5s'}}>
                <div className="w-16 h-16 rounded-full bg-care-100 text-care-600 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Manage Your Health</h3>
                <p className="text-gray-600">
                  Access your medical records, receive AI-powered insights, and communicate securely with
                  your healthcare providers.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/register">
                <Button className="glass-button text-base py-6 px-8">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-care-100 text-care-800 font-medium text-sm mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                What Our Users Say
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of patients and healthcare providers who have transformed their 
                healthcare experience with CareFusion.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden h-[300px] sm:h-[250px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                      index === currentTestimonial 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="glass-card p-8 rounded-xl text-center">
                      <div className="mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-white shadow-md"
                        />
                      </div>
                      <p className="text-lg text-gray-700 italic mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-care-600 w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-care-700 to-care-500 opacity-90"></div>
              <div className="relative p-12 sm:p-16 text-white text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Transform Your Healthcare Experience?
                </h2>
                <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                  Join CareFusion today and experience the future of healthcare management. Connect with top doctors,
                  manage your medical records, and receive personalized care.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/register">
                    <Button className="bg-white hover:bg-gray-100 text-care-600 py-6 px-8 text-base">
                      Sign Up Now
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 text-base">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
