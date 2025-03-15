
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FilePen, Search, Plus, User, Calendar, Trash2, Share2, Download, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Sample prescription data
const samplePrescriptions = [
  {
    id: 'RX-001',
    patientId: 'PT-001',
    patientName: 'Raj Kumar',
    date: new Date(2023, 4, 15),
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '3 months' },
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '3 months' }
    ],
    instructions: 'Take with meals. Monitor blood pressure weekly. Report any side effects immediately.',
    diagnosis: 'Hypertension'
  },
  {
    id: 'RX-002',
    patientId: 'PT-003',
    patientName: 'Amit Patel',
    date: new Date(2023, 4, 20),
    medications: [
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', duration: '6 months' },
      { name: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', duration: '3 months' },
      { name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', duration: '1 month' }
    ],
    instructions: 'Take as directed. Avoid grapefruit juice with Atorvastatin. Regular follow-up every 2 weeks for the first month.',
    diagnosis: 'Post Cardiac Surgery Recovery'
  }
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(samplePrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  
  // Simple new prescription form state
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    instructions: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }]
  });
  
  // Filter prescriptions based on search
  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedPrescriptionData = prescriptions.find(prescription => prescription.id === selectedPrescription);
  
  const handleAddMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [...newPrescription.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };
  
  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications.splice(index, 1);
    setNewPrescription({
      ...newPrescription,
      medications: updatedMedications
    });
  };
  
  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setNewPrescription({
      ...newPrescription,
      medications: updatedMedications
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCreatePrescription = () => {
    // In a real app, we would validate and submit to a backend
    toast({
      title: "Prescription Created",
      description: "New prescription has been created successfully.",
    });
    setIsCreating(false);
  };
  
  const handleShare = (id: string) => {
    toast({
      title: "Prescription Shared",
      description: `Prescription ${id} has been shared with the patient.`,
    });
  };
  
  const handleDownload = (id: string) => {
    toast({
      title: "Download Started",
      description: `Downloading prescription ${id}.`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <FilePen className="h-5 w-5" />
              Prescriptions
            </CardTitle>
            <CardDescription className="text-blue-100">
              Manage and create patient prescriptions
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-white text-blue-700 hover:bg-blue-50"
            disabled={isCreating}
          >
            <Plus className="h-4 w-4 mr-1" />
            New Prescription
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        {isCreating ? (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Create New Prescription</h3>
              <Button 
                variant="outline" 
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={newPrescription.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <Input
                  id="patientId"
                  name="patientId"
                  value={newPrescription.patientId}
                  onChange={handleInputChange}
                  placeholder="Enter patient ID"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <Input
                id="diagnosis"
                name="diagnosis"
                value={newPrescription.diagnosis}
                onChange={handleInputChange}
                placeholder="Enter diagnosis"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Medications</label>
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={handleAddMedication}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medication
                </Button>
              </div>
              
              {newPrescription.medications.map((medication, index) => (
                <div key={index} className="p-3 border rounded-md mb-3 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Medication {index + 1}</h4>
                    {newPrescription.medications.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMedication(index)}
                        className="text-red-500 hover:text-red-700 h-8 px-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Medication Name</label>
                      <Input
                        value={medication.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                        placeholder="Medication name"
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Dosage</label>
                      <Input
                        value={medication.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        placeholder="e.g., 5mg"
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Frequency</label>
                      <Input
                        value={medication.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        placeholder="e.g., Once daily"
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Duration</label>
                      <Input
                        value={medication.duration}
                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        placeholder="e.g., 1 month"
                        className="h-9"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <Textarea
                id="instructions"
                name="instructions"
                value={newPrescription.instructions}
                onChange={handleInputChange}
                placeholder="Enter detailed instructions for the patient"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePrescription}>
                Create Prescription
              </Button>
            </div>
          </div>
        ) : selectedPrescription ? (
          selectedPrescriptionData && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPrescription(null)}
                >
                  Back to Prescriptions
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleShare(selectedPrescriptionData.id)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button onClick={() => handleDownload(selectedPrescriptionData.id)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4 pb-2">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                      <h3 className="font-medium text-lg">{selectedPrescriptionData.patientName}</h3>
                      <p className="text-sm text-gray-500">{selectedPrescriptionData.patientId}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-3">
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(selectedPrescriptionData.date, 'dd MMM yyyy')}
                      </p>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {selectedPrescriptionData.diagnosis}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Medications</h3>
                <div className="space-y-3">
                  {selectedPrescriptionData.medications.map((medication, index) => (
                    <Card key={index} className="overflow-hidden border">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-md">{medication.name}</h4>
                            <p className="text-sm text-gray-500">Dosage: {medication.dosage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Frequency: {medication.frequency}</p>
                            <p className="text-sm text-gray-600">Duration: {medication.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Instructions</h3>
                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-gray-700">{selectedPrescriptionData.instructions}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        ) : (
          <>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prescriptions by patient name, ID or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {filteredPrescriptions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No prescriptions match your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrescriptions.map((prescription) => (
                  <Card key={prescription.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => setSelectedPrescription(prescription.id)}
                    >
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <FilePen className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                              <h3 className="font-medium">{prescription.id}</h3>
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200 md:ml-2 my-1 md:my-0 inline-flex">
                                {prescription.diagnosis}
                              </Badge>
                            </div>
                            <p className="text-sm flex items-center mt-1">
                              <User className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              {prescription.patientName} ({prescription.patientId})
                            </p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {format(prescription.date, 'dd MMM yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3 md:mt-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(prescription.id);
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(prescription.id);
                            }}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {prescription.medications.map((medication, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                            <span className="font-medium">{medication.name}</span> {medication.dosage}, {medication.frequency}, {medication.duration}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {!isCreating && !selectedPrescription && (
        <CardFooter className="border-t bg-gray-50 rounded-b-lg">
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions</p>
            <p className="mt-2 md:mt-0">Last updated: Today at 10:30 AM</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Prescriptions;
