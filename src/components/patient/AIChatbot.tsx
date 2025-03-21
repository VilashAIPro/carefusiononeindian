
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Smile, PaperclipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: 'Hello! I am your CareFusion AI assistant. How can I help you with your health concerns today?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your AI service
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponses: Record<string, string> = {
          'headache': 'Headaches can be caused by various factors including stress, dehydration, or lack of sleep. Try drinking water and resting in a dark, quiet room. If symptoms persist for more than 24 hours, please consider scheduling an appointment.',
          'cold': 'For common cold symptoms, I recommend rest, staying hydrated, and over-the-counter cold medications. Warm liquids like tea with honey may help soothe a sore throat.',
          'fever': 'For fever, make sure to stay hydrated and consider taking acetaminophen or ibuprofen. If your temperature exceeds 103°F (39.4°C) or persists for more than three days, please seek medical attention immediately.',
          'appointment': 'You can book an appointment through the Appointments tab. Would you like me to help you navigate there?',
          'medicine': 'I can\'t provide specific medication recommendations as that requires a proper diagnosis from a healthcare professional. Please consult with your doctor.',
          'exercise': 'Regular exercise is great for overall health. For general fitness, aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities twice weekly.',
        };
        
        let responseText = 'I don\'t have specific information about that. Would you like to schedule an appointment with a doctor to discuss this further?';
        
        // Check if the user's message contains any keywords we have responses for
        Object.entries(aiResponses).forEach(([keyword, response]) => {
          if (input.toLowerCase().includes(keyword)) {
            responseText = response;
          }
        });
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
      
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

  // Quick response buttons for common questions
  const quickResponses = [
    { text: "Headache", query: "What should I do for a headache?" },
    { text: "Cold", query: "How to treat a cold?" },
    { text: "Appointment", query: "I need to book an appointment" },
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
      <div className="p-3 md:p-4 border-b flex items-center gap-2 bg-gradient-to-r from-care-700 to-care-600 text-white">
        <Bot className="w-5 h-5" />
        <h3 className="font-semibold text-sm md:text-base">CareFusion AI Assistant</h3>
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
                    ? 'bg-care-600 text-white ml-auto rounded-tr-none'
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
                    {message.sender === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
      
      {/* Quick response buttons - only visible on mobile */}
      {isMobile && (
        <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {quickResponses.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendQuickResponse(item.query)}
              className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 text-xs rounded-full"
            >
              {item.text}
            </Button>
          ))}
        </div>
      )}
      
      <div className="p-3 md:p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your health question here..."
            disabled={isLoading}
            className="flex-1 bg-white border-gray-300 rounded-full text-sm md:text-base h-10 md:h-11 pl-4"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="rounded-full bg-care-600 hover:bg-care-700 text-white h-10 md:h-11 w-10 md:w-11 flex items-center justify-center shadow-sm transition-colors duration-200"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
        {!isMobile && (
          <div className="mt-3 flex flex-wrap gap-2">
            {quickResponses.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendQuickResponse(item.query)}
                className="bg-white hover:bg-gray-50 text-xs"
              >
                {item.text}
              </Button>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          This AI assistant provides general health information only. Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </Card>
  );
};

export default AIChatbot;
