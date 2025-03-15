
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
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, Ambulance, Star, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for nearby hospitals
const hospitals = [
  {
    id: 1,
    name: 'Apollo Hospital',
    address: '154, Bannerghatta Road, Bengaluru',
    distance: '2.3 km',
    phone: '+91 80 2630 4050',
    emergency: true,
    rating: 4.7,
    image: 'https://i.imgur.com/xZ8hQkF.png',
    services: ['24/7 Emergency', 'Ambulance Service', 'ICU', 'Trauma Care'],
    waitTime: '~10 mins'
  },
  {
    id: 2,
    name: 'Max Super Speciality Hospital',
    address: '108, M.G. Road, Delhi',
    distance: '3.8 km',
    phone: '+91 11 2651 5050',
    emergency: true,
    rating: 4.5,
    image: 'https://i.imgur.com/2LPnMV2.png',
    services: ['24/7 Emergency', 'Ambulance Service', 'Cardiac Care'],
    waitTime: '~15 mins'
  },
  {
    id: 3,
    name: 'Fortis Hospital',
    address: '730, Eastern Express Highway, Mumbai',
    distance: '5.1 km',
    phone: '+91 22 6280 3535',
    emergency: true,
    rating: 4.6,
    image: 'https://i.imgur.com/FjD9GvH.png',
    services: ['24/7 Emergency', 'Trauma Center', 'Blood Bank'],
    waitTime: '~8 mins'
  }
];

// Mock data for emergency contacts
const emergencyContacts = [
  { name: 'National Emergency', number: '112' },
  { name: 'Ambulance', number: '108' },
  { name: 'Police', number: '100' },
  { name: 'Fire', number: '101' },
  { name: 'Women Helpline', number: '1091' }
];

const EmergencyContact = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCall = (name: string, number: string) => {
    // In a real app, this would initiate a call
    toast({
      title: "Calling...",
      description: `Calling ${name} at ${number}`,
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter hospitals based on search
    toast({
      title: "Search Completed",
      description: `Found hospitals matching "${searchQuery}"`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Alert className="bg-red-50 border-red-200">
        <Ambulance className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-600">Emergency Services</AlertTitle>
        <AlertDescription>
          If you're experiencing a medical emergency, please call 108 or your local emergency number immediately.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            Important emergency contact numbers you may need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="bg-gray-50 border-none">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-2xl font-bold text-red-600">{contact.number}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 bg-white"
                    onClick={() => handleCall(contact.name, contact.number)}
                  >
                    <Phone className="h-4 w-4 text-red-600" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Nearby Hospitals</CardTitle>
          <CardDescription>
            Find hospitals and emergency care centers near you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search for hospitals nearby..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full md:w-auto">Search Hospitals</Button>
          </form>
          
          <div className="space-y-4">
            {hospitals.map(hospital => (
              <Card key={hospital.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 rounded-md">
                      <AvatarImage src={hospital.image} alt={hospital.name} />
                      <AvatarFallback className="rounded-md bg-gray-100">{hospital.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center">
                            {hospital.name}
                            {hospital.emergency && (
                              <Badge variant="destructive" className="ml-2">
                                ER
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            <MapPin className="mr-1 h-3.5 w-3.5" />
                            {hospital.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-amber-500 justify-end">
                            <Star className="h-3.5 w-3.5 mr-1 fill-amber-500" />
                            <span>{hospital.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{hospital.distance}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {hospital.services.map((service, i) => (
                          <Badge key={i} variant="outline" className="bg-gray-50">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          <span>Wait time: {hospital.waitTime}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast({
                              title: "Hospital Info",
                              description: `Viewing details for ${hospital.name}`,
                            })}
                          >
                            <Info className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleCall(hospital.name, hospital.phone)}
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </Button>
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
    </div>
  );
};

export default EmergencyContact;
