
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <Card className="flex flex-col h-[600px] w-full bg-white shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 border-b flex items-center gap-2 bg-primary text-primary-foreground">
        <Bot className="w-5 h-5" />
        <h3 className="font-semibold">CareFusion AI Assistant</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'ai' ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-75 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <div className="dot-typing"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your health question here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This AI assistant provides general health information only. Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </Card>
  );
};

export default AIChatbot;
