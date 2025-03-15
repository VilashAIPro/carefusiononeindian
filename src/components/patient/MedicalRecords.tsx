
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Pill, 
  FileUp, 
  Lock 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Mock data for prescriptions and reports
const prescriptions = [
  {
    id: 'pre-001',
    doctorName: 'Dr. Priya Patel',
    date: new Date(2023, 9, 15),
    diagnosis: 'Type 2 Diabetes',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '3 months' },
      { name: 'Gliclazide', dosage: '80mg', frequency: 'Once daily', duration: '3 months' }
    ]
  },
  {
    id: 'pre-002',
    doctorName: 'Dr. Amit Gupta',
    date: new Date(2023, 8, 22),
    diagnosis: 'Hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '6 months' }
    ]
  },
  {
    id: 'pre-003',
    doctorName: 'Dr. Sneha Reddy',
    date: new Date(2023, 7, 8),
    diagnosis: 'Seasonal Allergies',
    medications: [
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '2 weeks' },
      { name: 'Fluticasone', dosage: '50mcg', frequency: 'Twice daily', duration: '2 weeks' }
    ]
  }
];

const reports = [
  {
    id: 'rep-001',
    name: 'Blood Test Report',
    type: 'Laboratory',
    date: new Date(2023, 9, 10),
    facility: 'Apollo Diagnostics',
    downloadUrl: '#'
  },
  {
    id: 'rep-002',
    name: 'Chest X-Ray',
    type: 'Radiology',
    date: new Date(2023, 8, 15),
    facility: 'Max Healthcare',
    downloadUrl: '#'
  },
  {
    id: 'rep-003',
    name: 'ECG Report',
    type: 'Cardiology',
    date: new Date(2023, 7, 5),
    facility: 'AIIMS',
    downloadUrl: '#'
  },
  {
    id: 'rep-004',
    name: 'Lipid Profile',
    type: 'Laboratory',
    date: new Date(2023, 6, 18),
    facility: 'Thyrocare',
    downloadUrl: '#'
  }
];

const MedicalRecords = () => {
  const { toast } = useToast();
  
  const handleDownload = (id: string, name: string) => {
    // In a real app, this would initiate a file download
    toast({
      title: "Download Started",
      description: `Downloading ${name}...`,
    });
  };
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would upload the file to a server
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} has been uploaded successfully.`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>
                Access and manage your medical records securely
              </CardDescription>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Button variant="outline" className="mr-2">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Document
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    accept=".pdf,.jpg,.png,.doc,.docx"
                  />
                </Button>
              </div>
              <Button variant="outline" size="icon">
                <Lock className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="prescriptions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prescriptions" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="prescriptions" className="mt-4">
              {prescriptions.map(prescription => (
                <Card key={prescription.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{prescription.diagnosis}</CardTitle>
                      <Badge>{format(prescription.date, 'dd MMM yyyy')}</Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <User className="mr-1 h-3.5 w-3.5" />
                      {prescription.doctorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Pill className="mr-2 h-4 w-4" />
                      Medications
                    </h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{med.name} ({med.dosage})</span>
                            <Badge variant="outline">{med.duration}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{med.frequency}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-0">
                    <Button variant="outline" size="sm" className="mr-2">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="reports" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map(report => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md">{report.name}</CardTitle>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <CardDescription className="flex flex-col space-y-1">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          {format(report.date, 'dd MMM yyyy')}
                        </span>
                        <span className="flex items-center">
                          <User className="mr-1 h-3.5 w-3.5" />
                          {report.facility}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end pt-0">
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(report.id, report.name)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalRecords;
