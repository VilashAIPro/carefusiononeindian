
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  User, 
  FileText, 
  Calendar, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample patient data
const patientsData = [
  {
    id: 'PT-001',
    name: 'Raj Kumar',
    age: 45,
    gender: 'Male',
    phone: '+91 9876543210',
    email: 'raj.kumar@example.com',
    condition: 'Hypertension',
    lastVisit: '15 May 2023',
    nextAppointment: '20 Jun 2023',
    status: 'active'
  },
  {
    id: 'PT-002',
    name: 'Priya Singh',
    age: 32,
    gender: 'Female',
    phone: '+91 9876543211',
    email: 'priya.singh@example.com',
    condition: 'Diabetes Type 2',
    lastVisit: '05 April 2023',
    nextAppointment: '15 Jul 2023',
    status: 'active'
  },
  {
    id: 'PT-003',
    name: 'Amit Patel',
    age: 58,
    gender: 'Male',
    phone: '+91 9876543212',
    email: 'amit.patel@example.com',
    condition: 'Post Cardiac Surgery',
    lastVisit: '20 May 2023',
    nextAppointment: '10 Jun 2023',
    status: 'critical'
  },
  {
    id: 'PT-004',
    name: 'Meera Reddy',
    age: 29,
    gender: 'Female',
    phone: '+91 9876543213',
    email: 'meera.reddy@example.com',
    condition: 'Pregnancy (26 weeks)',
    lastVisit: '10 May 2023',
    nextAppointment: '07 Jun 2023',
    status: 'active'
  },
  {
    id: 'PT-005',
    name: 'Sanjay Gupta',
    age: 52,
    gender: 'Male',
    phone: '+91 9876543214',
    email: 'sanjay.gupta@example.com',
    condition: 'Arthritis',
    lastVisit: '25 April 2023',
    nextAppointment: 'Not Scheduled',
    status: 'inactive'
  }
];

const PatientList = () => {
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Filter patients based on search term and status
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? patient.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  const togglePatientDetails = (patientId: string) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <Users className="h-5 w-5" />
              Patient List
            </CardTitle>
            <CardDescription className="text-blue-100">
              View and manage your patients
            </CardDescription>
          </div>
          <Badge className="bg-white text-blue-700 px-2 py-1">
            {filteredPatients.length} Patients
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 md:px-6 pt-6">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, ID or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'active' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'active' ? null : 'active')}
              className="h-10"
            >
              Active
            </Button>
            <Button 
              variant={filterStatus === 'critical' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'critical' ? null : 'critical')}
              className="h-10"
            >
              Critical
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilterStatus(null)}
              className="h-10"
            >
              <Filter className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients match your search criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id}
                className="border rounded-lg overflow-hidden transition-all duration-200"
              >
                <div 
                  className={`flex flex-col md:flex-row justify-between md:items-center p-4 cursor-pointer ${
                    expandedPatient === patient.id ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onClick={() => togglePatientDetails(patient.id)}
                >
                  <div className="flex items-start md:items-center flex-1 gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {patient.name} 
                          <span className="text-sm text-gray-500">({patient.id})</span>
                        </h3>
                        <Badge className={`${getStatusColor(patient.status)} my-1 md:my-0 inline-flex`}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span>{patient.age} years, {patient.gender}</span>
                        <span className="hidden md:inline">|</span>
                        <span>{patient.condition}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 md:mt-0">
                    <div className={`hidden md:flex gap-2 ${expandedPatient === patient.id ? 'opacity-0' : 'opacity-100'}`}>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                    {expandedPatient === patient.id ? 
                      <ChevronUp className="h-5 w-5 text-gray-500 ml-2" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />
                    }
                  </div>
                </div>
                
                {expandedPatient === patient.id && (
                  <div className="p-4 bg-gray-50 border-t animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <p className="text-sm"><span className="text-gray-500">Phone:</span> {patient.phone}</p>
                          <p className="text-sm"><span className="text-gray-500">Email:</span> {patient.email}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Appointment Details</h4>
                        <div className="space-y-2">
                          <p className="text-sm"><span className="text-gray-500">Last Visit:</span> {patient.lastVisit}</p>
                          <p className="text-sm"><span className="text-gray-500">Next Appointment:</span> {patient.nextAppointment}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Medical Records
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 rounded-b-lg">
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>Showing {filteredPatients.length} of {patients.length} patients</p>
          <p className="mt-2 md:mt-0">Last updated: Today at 10:30 AM</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientList;
