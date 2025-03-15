
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

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your health information and access healthcare services
          </p>
        </div>
        
        <Tabs 
          defaultValue="profile" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Records</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4" />
              <span className="hidden md:inline">Health AI</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">AI Chat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileManagement />
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <AppointmentBooking />
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4">
            <MedicalRecords />
          </TabsContent>
          
          <TabsContent value="emergency" className="space-y-4">
            <EmergencyContact />
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <HealthSuggestions />
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-4">
            <AIChatbot />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientDashboard;
