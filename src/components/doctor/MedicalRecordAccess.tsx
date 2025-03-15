
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Download, FileUp, Eye, Calendar, User, HeartPulse } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Sample patient records data
const patientRecords = [
  {
    id: 'PT-001',
    name: 'Raj Kumar',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    condition: 'Hypertension',
    lastVisit: new Date(2023, 4, 15),
    records: [
      { id: 'REC-001', type: 'Blood Test', date: new Date(2023, 4, 15), doctor: 'Dr. Anita Sharma' },
      { id: 'REC-002', type: 'ECG', date: new Date(2023, 4, 15), doctor: 'Dr. Anita Sharma' },
      { id: 'REC-003', type: 'Medication History', date: new Date(2023, 3, 10), doctor: 'Dr. Anita Sharma' }
    ]
  },
  {
    id: 'PT-003',
    name: 'Amit Patel',
    age: 58,
    gender: 'Male',
    bloodGroup: 'O+',
    condition: 'Post Cardiac Surgery',
    lastVisit: new Date(2023, 4, 20),
    records: [
      { id: 'REC-007', type: 'Post-Surgery Follow-up', date: new Date(2023, 4, 20), doctor: 'Dr. Anita Sharma' },
      { id: 'REC-008', type: 'Echocardiogram', date: new Date(2023, 4, 20), doctor: 'Dr. Anita Sharma' },
      { id: 'REC-009', type: 'Cardiac MRI', date: new Date(2023, 3, 5), doctor: 'Dr. Raj Malhotra' }
    ]
  }
];

const MedicalRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Filter patients based on search
  const filteredPatients = patientRecords.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedPatientData = patientRecords.find(patient => patient.id === selectedPatient);
  
  const handleViewRecord = (recordId: string) => {
    toast({
      title: "Record Accessed",
      description: `Viewing record ${recordId}.`,
    });
  };
  
  const handleDownloadRecord = (recordId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading record ${recordId}.`,
    });
  };
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Medical Record Access
              </CardTitle>
              <CardDescription className="text-blue-100">
                View and manage patient medical records
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patient by name, ID or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {!selectedPatient ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 flex gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {patient.gender}, {patient.age} yrs
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {patient.bloodGroup}
                        </Badge>
                      </div>
                      <p className="text-sm mt-2 flex items-center">
                        <HeartPulse className="h-4 w-4 mr-1 text-red-500" />
                        {patient.condition}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Last Visit: {format(patient.lastVisit, 'dd MMM yyyy')}
                      </p>
                      <Button 
                        className="mt-3 w-full" 
                        onClick={() => setSelectedPatient(patient.id)}
                      >
                        View Records ({patient.records.length})
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredPatients.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">No patients match your search criteria</p>
                </div>
              )}
            </div>
          ) : (
            selectedPatientData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPatient(null)}
                  >
                    Back to Patient List
                  </Button>
                  <div className="relative">
                    <Button variant="outline">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Record
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleUpload}
                        accept=".pdf,.jpg,.png,.doc,.docx"
                      />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                      <h2 className="font-semibold text-xl">{selectedPatientData.name}</h2>
                      <p className="text-sm text-gray-600">{selectedPatientData.id}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {selectedPatientData.gender}, {selectedPatientData.age} yrs
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {selectedPatientData.bloodGroup}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                          {selectedPatientData.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">Medical Records</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPatientData.records.map((record) => (
                      <Card key={record.id} className="overflow-hidden border">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{record.type}</h4>
                              <p className="text-sm text-gray-500">{record.id}</p>
                              <div className="flex flex-col text-sm mt-2">
                                <span className="text-gray-600 flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  {format(record.date, 'dd MMM yyyy')}
                                </span>
                                <span className="text-gray-600 flex items-center mt-1">
                                  <User className="h-3.5 w-3.5 mr-1" />
                                  {record.doctor}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewRecord(record.id)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleDownloadRecord(record.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-3">AI-Driven Health Insights</h3>
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mt-1">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Health Trends Analysis</h4>
                          <p className="text-sm text-gray-700 mt-2">
                            Patient shows consistent improvement in blood pressure readings over the past 3 months. 
                            Current medication appears effective. Consider maintaining current treatment plan with 
                            regular monitoring. Next follow-up recommended in 4 weeks.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-green-100 text-green-800">Improving BP</Badge>
                            <Badge className="bg-blue-100 text-blue-800">Effective Medication</Badge>
                            <Badge className="bg-purple-100 text-purple-800">4-Week Follow-up</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalRecordAccess;
