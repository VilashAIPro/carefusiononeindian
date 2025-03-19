
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import { supabase } from './integrations/supabase/client';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    // Check current auth status when the app loads
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        // Get user type from profiles
        const { data } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        setUserType(data?.user_type || null);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        // Get user type from profiles
        const { data } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        setUserType(data?.user_type || null);
      } else {
        setUserType(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  if (isLoading) {
    // Simple loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow text-lg">Loading...</div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route 
          path="/login" 
          element={isAuthenticated ? 
            (userType === 'doctor' ? <Navigate to="/doctor-dashboard" /> : <Navigate to="/patient-dashboard" />) : 
            <Login />
          } 
        />
        
        <Route 
          path="/register" 
          element={isAuthenticated ? 
            (userType === 'doctor' ? <Navigate to="/doctor-dashboard" /> : <Navigate to="/patient-dashboard" />) : 
            <Register />
          } 
        />
        
        <Route 
          path="/patient-dashboard" 
          element={isAuthenticated ? 
            (userType === 'patient' ? <PatientDashboard /> : <Navigate to="/doctor-dashboard" />) : 
            <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="/doctor-dashboard" 
          element={isAuthenticated ? 
            (userType === 'doctor' ? <DoctorDashboard /> : <Navigate to="/patient-dashboard" />) : 
            <Navigate to="/login" />
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
