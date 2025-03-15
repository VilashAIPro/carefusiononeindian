
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Upload, X, Image, Search, MessageSquare, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
  diseaseInfo?: {
    name: string;
    description: string;
    symptoms: string[];
    treatments: string[];
  };
};

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: 'Hello, Dr. Sharma! I am MediAssist AI. How can I help you with your medical queries today? You can ask me about medications, diseases, or upload an image for analysis.',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageToUpload(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelImageUpload = () => {
    setImageToUpload(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !imageToUpload)) return;
    
    // Prepare user message content
    let userMessageContent = input.trim();
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userMessageContent,
      sender: 'user',
      timestamp: new Date(),
      imageUrl: imagePreview || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // After adding the user message, clear the image preview if any
    const hadImage = !!imageToUpload;
    if (imageToUpload) {
      setImageToUpload(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    
    try {
      // In a real app, this would be an API call to your AI service
      // Simulate AI response after a delay
      setTimeout(() => {
        let aiResponseText = '';
        let diseaseInfo = undefined;
        
        // Check if it's an image analysis
        if (hadImage) {
          // Simulate image analysis response
          aiResponseText = 'I\'ve analyzed the image you provided. This appears to be a dermatological condition, possibly dermatitis. The inflamed, reddish patches are typical indicators. I\'ve prepared detailed information about this condition.';
          
          diseaseInfo = {
            name: 'Dermatitis',
            description: 'Dermatitis is inflammation of the skin, typically characterized by itchiness, redness and a rash. It may be caused by contact with specific chemicals, or it may be caused by skin dryness.',
            symptoms: [
              'Itching',
              'Redness',
              'Swelling',
              'Dry, cracked skin',
              'Crusting and oozing'
            ],
            treatments: [
              'Topical corticosteroids to reduce inflammation',
              'Moisturizers to combat dryness',
              'Antihistamines to relieve itching',
              'Avoiding known triggers and irritants',
              'Phototherapy (light therapy) for severe cases'
            ]
          };
        } else {
          // Check for disease or medication queries
          const input_lower = input.toLowerCase();
          
          if (input_lower.includes('diabetes')) {
            aiResponseText = 'Diabetes is a chronic condition characterized by high blood sugar levels. There are three main types: Type 1, Type 2, and Gestational Diabetes. Here\'s more detailed information about diabetes:';
            
            diseaseInfo = {
              name: 'Diabetes Mellitus',
              description: 'Diabetes is a metabolic disorder that causes high blood sugar levels due to either inadequate insulin production (Type 1) or the body\'s cells not responding properly to insulin (Type 2).',
              symptoms: [
                'Frequent urination',
                'Increased thirst',
                'Unexplained weight loss',
                'Extreme hunger',
                'Blurred vision',
                'Fatigue',
                'Slow-healing sores'
              ],
              treatments: [
                'Insulin therapy (especially for Type 1)',
                'Oral medications to improve insulin sensitivity',
                'Regular monitoring of blood glucose levels',
                'Dietary changes and carbohydrate counting',
                'Regular physical activity',
                'Weight management (for Type 2)',
                'Regular check-ups to monitor for complications'
              ]
            };
          } else if (input_lower.includes('hypertension') || input_lower.includes('high blood pressure')) {
            aiResponseText = 'Hypertension, or high blood pressure, is a common condition where the force of blood against artery walls is consistently too high. Here\'s detailed information about hypertension:';
            
            diseaseInfo = {
              name: 'Hypertension',
              description: 'Hypertension is a chronic condition characterized by elevated blood pressure in the arteries. It is often called the "silent killer" because it typically has no symptoms but significantly increases the risk of heart disease, stroke, and kidney disease.',
              symptoms: [
                'Usually asymptomatic (no obvious symptoms)',
                'Headaches (in severe cases)',
                'Shortness of breath',
                'Nosebleeds',
                'Visual changes',
                'Dizziness'
              ],
              treatments: [
                'Lifestyle modifications (reduced sodium intake, regular exercise, limited alcohol)',
                'Weight management',
                'Smoking cessation',
                'Stress reduction',
                'Medications (diuretics, ACE inhibitors, ARBs, calcium channel blockers, beta-blockers)',
                'Regular blood pressure monitoring',
                'Treatment of underlying causes'
              ]
            };
          } else if (input_lower.includes('metformin')) {
            aiResponseText = 'Metformin is a commonly prescribed medication for Type 2 diabetes. It works by improving insulin sensitivity and reducing glucose production in the liver. Here are key details about Metformin:';
            
            diseaseInfo = {
              name: 'Metformin (Medication)',
              description: 'Metformin (brand names: Glucophage, Fortamet, Glumetza, Riomet) is a first-line medication for treating type 2 diabetes, particularly in overweight and obese patients.',
              symptoms: [], // Not applicable for medications
              treatments: [
                'Typical dosage: 500-2550mg per day, divided into 2-3 doses',
                'Take with meals to reduce gastrointestinal side effects',
                'Monitor kidney function regularly',
                'Common side effects: gastrointestinal issues, metallic taste',
                'Potential for vitamin B12 deficiency with long-term use',
                'Contraindicated in severe kidney disease',
                'May help with weight management and PCOS'
              ]
            };
          } else if (input_lower.includes('lisinopril')) {
            aiResponseText = 'Lisinopril is an ACE inhibitor commonly used to treat high blood pressure (hypertension) and heart failure. Here\'s important information about Lisinopril:';
            
            diseaseInfo = {
              name: 'Lisinopril (Medication)',
              description: 'Lisinopril (brand names: Prinivil, Zestril) is an angiotensin-converting enzyme (ACE) inhibitor that relaxes blood vessels, making it easier for the heart to pump blood.',
              symptoms: [], // Not applicable for medications
              treatments: [
                'Typical dosage: 10-40mg once daily',
                'Can be taken with or without food',
                'Monitor kidney function and potassium levels',
                'Common side effects: dry cough, dizziness, headache',
                'Contraindicated in pregnancy',
                'May cause angioedema in rare cases',
                'Should not be combined with potassium supplements or potassium-sparing diuretics without careful monitoring'
              ]
            };
          } else {
            // Generic response for other queries
            aiResponseText = 'Thank you for your query. I can provide information about various diseases and medications to assist in your clinical practice. For specific diagnostic assistance, please provide more details or upload relevant images for analysis.';
          }
        }
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: aiResponseText,
          sender: 'ai',
          timestamp: new Date(),
          diseaseInfo: diseaseInfo
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick response buttons for common queries
  const quickResponses = [
    { text: "Diabetes", query: "Tell me about Diabetes Mellitus" },
    { text: "Hypertension", query: "Information about hypertension" },
    { text: "Metformin", query: "Tell me about Metformin medication" },
    { text: "Lisinopril", query: "Information about Lisinopril" },
  ];

  const sendQuickResponse = (query: string) => {
    setInput(query);
    // Use a small timeout to show the text in the input before sending
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-250px)] md:h-[600px] w-full bg-white shadow-md overflow-hidden border border-gray-200 rounded-xl">
      <div className="p-3 md:p-4 border-b flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <Bot className="w-5 h-5" />
        <h3 className="font-semibold text-sm md:text-base">MediAssist AI</h3>
      </div>
      
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div className="space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] p-2.5 md:p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto rounded-tr-none'
                    : 'bg-gray-100 rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {message.sender === 'ai' ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                  <span className="text-xs opacity-80">
                    {message.sender === 'user' ? 'You' : 'MediAssist AI'}
                  </span>
                </div>
                
                {/* Message content */}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {/* If user message has an image */}
                {message.imageUrl && (
                  <div className="mt-2 max-w-xs mx-auto">
                    <img 
                      src={message.imageUrl} 
                      alt="Uploaded content" 
                      className="rounded border border-white/30 max-h-40 object-contain"
                    />
                  </div>
                )}
                
                {/* If AI message has disease information */}
                {message.diseaseInfo && (
                  <div className="mt-3 p-3 bg-white rounded-md border-l-4 border-blue-500 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-blue-700">{message.diseaseInfo.name}</h4>
                    </div>
                    
                    <p className="text-xs text-gray-700 mb-2">{message.diseaseInfo.description}</p>
                    
                    {message.diseaseInfo.symptoms && message.diseaseInfo.symptoms.length > 0 && (
                      <div className="mb-2">
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Symptoms:</h5>
                        <div className="flex flex-wrap gap-1">
                          {message.diseaseInfo.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.diseaseInfo.treatments && message.diseaseInfo.treatments.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Treatments/Recommendations:</h5>
                        <ul className="text-xs text-gray-700 list-disc pl-4 space-y-0.5">
                          {message.diseaseInfo.treatments.map((treatment, index) => (
                            <li key={index}>{treatment}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="max-w-[85%] p-2.5 md:p-3 rounded-lg bg-gray-100 rounded-tl-none">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <div className="dot-typing"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Image preview area */}
      {imagePreview && (
        <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Upload preview" 
              className="h-16 w-16 object-cover rounded border border-gray-300" 
            />
            <button 
              onClick={cancelImageUpload}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      {/* Quick response buttons */}
      {!isMobile && (
        <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 border-t border-gray-200">
          {quickResponses.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendQuickResponse(item.query)}
              className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 text-xs"
            >
              {item.text}
            </Button>
          ))}
        </div>
      )}
      
      <div className="p-3 md:p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={triggerFileInput}
            className="h-10 md:h-11 w-10 md:w-11 rounded-full"
            title="Upload an image"
          >
            <Image className="h-4 w-4 md:h-5 md:w-5" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about diseases, medications, or upload an image..."
            disabled={isLoading}
            className="flex-1 bg-white border-gray-300 rounded-full text-sm md:text-base h-10 md:h-11 pl-4"
          />
          
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || (!input.trim() && !imageToUpload)}
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 md:h-11 w-10 md:w-11 flex items-center justify-center shadow-sm transition-colors duration-200"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
        
        {/* Mobile quick response buttons */}
        {isMobile && (
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin">
            {quickResponses.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendQuickResponse(item.query)}
                className="flex-shrink-0 bg-white hover:bg-gray-50 text-xs rounded-full"
              >
                {item.text}
              </Button>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          Ask specific questions about diseases, medications, or upload medical images for analysis. This AI provides medical reference information only.
        </p>
      </div>
    </Card>
  );
};

export default AIChatbot;
