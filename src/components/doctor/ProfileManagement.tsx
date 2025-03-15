
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, User, Building, GraduationCap, Stethoscope, Clock, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfileManagement = () => {
  // Sample initial doctor data
  const [doctor, setDoctor] = useState({
    name: 'Dr. Anita Sharma',
    email: 'anita.sharma@carefusion.com',
    phone: '+91 9876543210',
    specialization: 'Cardiology',
    experience: '15 years',
    qualification: 'MD, DM (Cardiology)',
    hospital: 'CareFusion Medical Center',
    consultationFee: '₹1500',
    consultationTime: '30 minutes',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    bio: 'Experienced cardiologist with expertise in interventional cardiology and cardiac electrophysiology. Special interest in preventive cardiology and heart failure management.'
  });

  // State for form editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctor);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setDoctor(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your doctor profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(doctor);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl md:text-2xl">Doctor Profile</CardTitle>
              <CardDescription className="text-blue-100">Manage your professional information</CardDescription>
            </div>
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 px-4 md:px-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{doctor.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Specialization</p>
                      <p className="font-medium">{doctor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{doctor.experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium">{doctor.qualification}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <Building className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Hospital/Clinic</p>
                      <p className="font-medium">{doctor.hospital}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="font-medium">{doctor.consultationFee}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Consultation Time</p>
                      <p className="font-medium">{doctor.consultationTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Available Days</p>
                      <p className="font-medium">{doctor.availableDays.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Professional Bio</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{doctor.bio}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <Input
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic</label>
                    <Input
                      id="hospital"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                    <Input
                      id="consultationFee"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="consultationTime" className="block text-sm font-medium text-gray-700 mb-1">Consultation Time</label>
                    <Input
                      id="consultationTime"
                      name="consultationTime"
                      value={formData.consultationTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={formData.availableDays.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setFormData(prev => {
                              if (prev.availableDays.includes(day)) {
                                return { ...prev, availableDays: prev.availableDays.filter(d => d !== day) };
                              } else {
                                return { ...prev, availableDays: [...prev.availableDays, day] };
                              }
                            });
                          }}
                          className="text-xs"
                        >
                          {formData.availableDays.includes(day) && <Check className="h-3 w-3 mr-1" />}
                          {day.substring(0, 3)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-gray-50 rounded-b-lg">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="ml-auto button-hover-effect"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex justify-end gap-2 ml-auto">
              <Button 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="button-hover-effect"
              >
                Save Changes
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileManagement;
