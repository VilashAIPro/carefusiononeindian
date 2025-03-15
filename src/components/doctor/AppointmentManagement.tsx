
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Calendar as CalendarIcon, User, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample appointment data
const appointments = [
  {
    id: 'APT-001',
    patientName: 'Raj Kumar',
    patientId: 'PT-001',
    date: '15 Jun 2023',
    time: '10:00 AM',
    duration: '30 minutes',
    type: 'Follow-up',
    status: 'pending'
  },
  {
    id: 'APT-002',
    patientName: 'Priya Singh',
    patientId: 'PT-002',
    date: '15 Jun 2023',
    time: '11:00 AM',
    duration: '30 minutes',
    type: 'New Consultation',
    status: 'confirmed'
  },
  {
    id: 'APT-003',
    patientName: 'Amit Patel',
    patientId: 'PT-003',
    date: '16 Jun 2023',
    time: '09:30 AM',
    duration: '45 minutes',
    type: 'Emergency',
    status: 'confirmed'
  },
  {
    id: 'APT-004',
    patientName: 'Meera Reddy',
    patientId: 'PT-004',
    date: '16 Jun 2023',
    time: '02:00 PM',
    duration: '30 minutes',
    type: 'Follow-up',
    status: 'pending'
  }
];

const AppointmentManagement = () => {
  const { toast } = useToast();

  const handleConfirmAppointment = (id: string) => {
    toast({
      title: "Appointment Confirmed",
      description: `Appointment ${id} has been confirmed.`,
    });
  };

  const handleRejectAppointment = (id: string) => {
    toast({
      title: "Appointment Rejected",
      description: `Appointment ${id} has been rejected.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Management
            </CardTitle>
            <CardDescription className="text-blue-100">
              View and manage your upcoming appointments
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 px-4 md:px-6">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="border rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-white">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div className="flex items-start md:items-center flex-1 gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {appointment.patientName}
                          <span className="text-sm text-gray-500">({appointment.patientId})</span>
                        </h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1" /> {appointment.date}</span>
                        <span className="hidden md:inline">|</span>
                        <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {appointment.time} ({appointment.duration})</span>
                        <span className="hidden md:inline">|</span>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3 md:mt-0">
                    {appointment.status === 'pending' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectAppointment(appointment.id)}
                          className="text-red-500 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleConfirmAppointment(appointment.id)}
                          className="text-white bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          View Patient
                        </Button>
                        <Button size="sm">
                          Start Consultation
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 rounded-b-lg">
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>Showing {appointments.length} upcoming appointments</p>
          <Button variant="outline" className="mt-2 md:mt-0">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentManagement;
