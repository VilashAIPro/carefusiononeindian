
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileManagement from '@/components/patient/ProfileManagement';
import AppointmentBooking from '@/components/patient/AppointmentBooking';
import MedicalRecords from '@/components/patient/MedicalRecords';
import EmergencyContact from '@/components/patient/EmergencyContact';
import HealthSuggestions from '@/components/patient/HealthSuggestions';
import AIChatbot from '@/components/patient/AIChatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Calendar, 
  FileText, 
  Phone, 
  HeartPulse,
  MessageSquare
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
            Manage your health information and access healthcare services
          </p>
        </div>
        
        <Tabs 
          defaultValue="profile" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} mb-6 md:mb-8 gap-1 p-1 rounded-xl bg-muted/80`}>
            <TabsTrigger value="profile" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <User className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <Calendar className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <FileText className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Records</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <Phone className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <HeartPulse className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Health AI</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <MessageSquare className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>AI Chat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <ProfileManagement />
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4 animate-fade-in">
            <AppointmentBooking />
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4 animate-fade-in">
            <MedicalRecords />
          </TabsContent>
          
          <TabsContent value="emergency" className="space-y-4 animate-fade-in">
            <EmergencyContact />
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4 animate-fade-in">
            <HealthSuggestions />
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-4 animate-fade-in">
            <AIChatbot />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientDashboard;
