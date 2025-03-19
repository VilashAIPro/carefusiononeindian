
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileManagement from '@/components/doctor/ProfileManagement';
import PatientList from '@/components/doctor/PatientList';
import AppointmentManagement from '@/components/doctor/AppointmentManagement';
import MedicalRecordAccess from '@/components/doctor/MedicalRecordAccess';
import Prescriptions from '@/components/doctor/Prescriptions';
import AIChatbot from '@/components/doctor/AIChatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Users, 
  Calendar, 
  FileText, 
  FilePen,
  MessageSquare
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 mt-4">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
            Manage your practice, patients, and medical services
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
            <TabsTrigger value="patients" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <Users className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Patients</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <Calendar className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <FileText className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Records</span>
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <FilePen className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>Prescriptions</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center justify-center gap-1.5 rounded-lg data-[state=active]:bg-white">
              <MessageSquare className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : "hidden md:inline"}>AI Chat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <ProfileManagement />
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-4 animate-fade-in">
            <PatientList />
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4 animate-fade-in">
            <AppointmentManagement />
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4 animate-fade-in">
            <MedicalRecordAccess />
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4 animate-fade-in">
            <Prescriptions />
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

export default DoctorDashboard;
