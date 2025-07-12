import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Fertify AI, your intelligent farming assistant. I can help you with fertilizer recommendations, soil analysis, crop optimization, and agricultural best practices. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('calculator') || lowercaseMessage.includes('npk') || lowercaseMessage.includes('fertilizer')) {
      return "I'd be happy to help with fertilizer calculations! For accurate NPK recommendations, I'll need some information:\n\n• Field size (acres)\n• Crop type\n• Current soil pH\n• Target yield\n• Soil type (clay, loam, sandy)\n\nBased on this data, I can provide personalized fertilizer recommendations with optimal NPK ratios and application rates.";
    }
    
    if (lowercaseMessage.includes('soil') || lowercaseMessage.includes('ph')) {
      return "Soil management is crucial for optimal crop growth! Here are key factors to consider:\n\n• **Soil pH**: Most crops prefer 6.0-7.0 pH\n• **Nutrient levels**: Regular soil testing every 2-3 years\n• **Organic matter**: Aim for 3-5% organic content\n• **Drainage**: Ensure proper water management\n\nWould you like specific recommendations for your soil type or crop?";
    }
    
    if (lowercaseMessage.includes('crop') || lowercaseMessage.includes('yield')) {
      return "Crop optimization involves several factors:\n\n• **Variety selection**: Choose varieties suited to your climate\n• **Planting dates**: Optimal timing for your region\n• **Spacing**: Proper plant density for maximum yield\n• **Fertilization**: Balanced nutrition throughout growth stages\n• **Pest management**: Integrated pest management strategies\n\nWhat specific crop are you working with? I can provide tailored advice.";
    }
    
    if (lowercaseMessage.includes('weather') || lowercaseMessage.includes('irrigation')) {
      return "Weather and water management are critical for farming success:\n\n• **Rainfall monitoring**: Track precipitation for irrigation planning\n• **Temperature**: Monitor frost dates and heat stress\n• **Humidity**: Affects disease pressure\n• **Wind**: Consider for spray applications\n\nI recommend using weather data to optimize irrigation schedules and fertilizer application timing.";
    }
    
    return "That's a great question! As your farming AI assistant, I can help with fertilizer calculations, soil analysis, crop recommendations, pest management, and agricultural best practices. Could you provide more specific details about your farming challenge so I can give you targeted advice?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Fertify AI</h2>
            <p className="text-sm text-muted-foreground">Agricultural Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`flex flex-col max-w-[80%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <Card className={message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </CardContent>
                </Card>
                <span className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Fertify AI is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about fertilizers, soil, crops..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="sm"
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;