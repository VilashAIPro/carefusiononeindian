
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ProfileManagement = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  
  // Mock profile data (would come from API/database in a real app)
  const [profile, setProfile] = useState({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Mumbai, Maharashtra',
    allergies: 'Peanuts, Penicillin',
    medications: 'Metformin 500mg',
    medicalHistory: 'Type 2 Diabetes, Hypertension'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the data to an API
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Manage your personal information and contact details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  value={profile.firstName} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  value={profile.lastName} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={profile.email} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={profile.phone} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  name="address"
                  value={profile.address} 
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button type="submit" className="mt-4">Save Personal Information</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>
            Update your medical history, allergies, and current medications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea 
                id="allergies" 
                name="allergies"
                value={profile.allergies} 
                onChange={handleInputChange}
                placeholder="List any allergies you have..."
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea 
                id="medications" 
                name="medications"
                value={profile.medications} 
                onChange={handleInputChange}
                placeholder="List any medications you're currently taking..."
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea 
                id="medicalHistory" 
                name="medicalHistory"
                value={profile.medicalHistory} 
                onChange={handleInputChange}
                placeholder="Describe your medical history..."
                rows={4}
              />
            </div>
            
            <Button type="submit" className="mt-4">Save Medical Information</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;
