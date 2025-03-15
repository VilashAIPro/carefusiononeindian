
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Search, MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Patel',
    specialty: 'Cardiologist',
    location: 'Apollo Hospital, Delhi',
    distance: '2.3 km',
    available: true,
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 2,
    name: 'Dr. Amit Gupta',
    specialty: 'Dermatologist',
    location: 'Max Healthcare, Mumbai',
    distance: '1.8 km',
    available: true,
    rating: 4.6,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    timeSlots: ['11:00 AM', '01:30 PM', '03:00 PM', '05:30 PM']
  },
  {
    id: 3,
    name: 'Dr. Sneha Reddy',
    specialty: 'Pediatrician',
    location: 'AIIMS, Hyderabad',
    distance: '3.5 km',
    available: false,
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    timeSlots: ['10:00 AM', '12:30 PM', '03:30 PM', '06:00 PM']
  }
];

const specialties = [
  'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 
  'Orthopedic', 'Gynecologist', 'Psychiatrist', 'Ophthalmologist'
];

const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'
];

const AppointmentBooking = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter doctors based on search
    toast({
      title: "Search Completed",
      description: `Found doctors matching "${searchQuery}"`,
    });
  };
  
  const handleBookAppointment = () => {
    if (!date || !selectedDoctorId || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date, doctor, and time slot.",
        variant: "destructive"
      });
      return;
    }
    
    const doctor = doctors.find(d => d.id === selectedDoctorId);
    
    // In a real app, this would send the booking data to an API
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${doctor?.name} on ${format(date, 'PPP')} at ${selectedTimeSlot} has been confirmed.`,
    });
    
    // Reset selection
    setDate(undefined);
    setSelectedDoctorId(null);
    setSelectedTimeSlot('');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find a Doctor</CardTitle>
          <CardDescription>
            Search for doctors based on specialty, location, or name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search for doctors..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">Search Doctors</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Doctors</CardTitle>
          <CardDescription>
            Select a doctor to book an appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctors.map(doctor => (
              <Card 
                key={doctor.id} 
                className={cn(
                  "cursor-pointer hover:bg-gray-50 transition-colors",
                  selectedDoctorId === doctor.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedDoctorId(doctor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{doctor.name}</h3>
                          <p className="text-sm text-gray-500">{doctor.specialty}</p>
                        </div>
                        <Badge variant={doctor.available ? "default" : "outline"}>
                          {doctor.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="mr-1 h-3.5 w-3.5" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <span>{doctor.distance}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <span>★ {doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedDoctorId && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Appointment</CardTitle>
            <CardDescription>
              Select a date and time slot for your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto mx-auto"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Select Time Slot</Label>
                {date ? (
                  <RadioGroup value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <div className="grid grid-cols-2 gap-2">
                      {doctors.find(d => d.id === selectedDoctorId)?.timeSlots.map(slot => (
                        <div key={slot} className="flex items-center space-x-2">
                          <RadioGroupItem value={slot} id={slot} />
                          <Label htmlFor={slot} className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                            {slot}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="flex items-center justify-center h-[200px] border rounded-md bg-gray-50">
                    <p className="text-gray-500 flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      Please select a date first
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleBookAppointment} 
              disabled={!date || !selectedTimeSlot}
              className="w-full"
            >
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AppointmentBooking;
