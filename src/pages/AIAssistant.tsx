
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bot, Send, Mic, FileText, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { chatService } from '@/services/api';
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  loading?: boolean;
}

const SUGGESTED_PROMPTS = [
  "Show me Sarah Johnson's latest vitals",
  "Schedule a follow-up appointment",
  "Create a prescription for...",
];

const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: `I'm here to help you manage patient care, access medical records, and streamline your workflow. How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string = inputMessage) => {
    if (!content.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };

    const tempBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true,
    };

    setMessages(prev => [...prev, newUserMessage, tempBotMessage]);
    setInputMessage('');

    try {
      setIsLoading(true);
      const response = await chatService.sendMessage(content);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempBotMessage.id
            ? {
              ...msg,
              content: response.reply || "I'm sorry, I couldn't process that request.",
              loading: false,
            }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message to AI assistant:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempBotMessage.id
            ? {
              ...msg,
              content: "I'm sorry, there was an error processing your request. Please try again.",
              loading: false,
            }
            : msg
        )
      );
      toast.error("Failed to get response from the assistant");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* <div className="flex items-center justify-between mb-4"> */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
        <div>
          <h1 className="text-2xl font-bold">Doctor Assistant</h1>
          <p className="text-gray-500">Your AI-powered medical assistant</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="22" x2="12" y2="15.5"></line>
              <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
              <line x1="12" y1="2" x2="12" y2="8.5"></line>
            </svg>
            <span className="ml-2">View History</span>
          </Button>
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span className="ml-2">Settings</span>
          </Button>
          <Button size="sm" onClick={() => document.documentElement.requestFullscreen()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span className="ml-2">Full Screen</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 border-r pr-4 space-y-6">
          <div>
            <h3 className="font-medium mb-2 text-gray-700">QUICK ACTIONS</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create Clinical Note
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Patient Vitals
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bot className="h-4 w-4 mr-2" />
                Lab Results
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  className="h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Schedule
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  className="h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 21h8"></path>
                  <path d="M12 21v-4"></path>
                  <path d="M11 3h2"></path>
                  <path d="M7.467 3.737A6 6 0 0 0 12 16a6 6 0 0 0 4.533-10.263"></path>
                  <path d="M15 7v.414"></path>
                  <path d="M9 7v.414"></path>
                </svg>
                Prescriptions
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-700">SUGGESTED PROMPTS</h3>
            <div className="space-y-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSendMessage(prompt)}
                >
                  "{prompt}"
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col pl-4">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[80%] rounded-lg p-4 
                  ${message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-primary-50 text-gray-800'}
                `}>
                  {message.loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing your request...</span>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage("Patient history")}
              >
                Patient history
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage("Create note")}
              >
                Create note
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage("Schedule follow-up")}
              >
                Schedule follow-up
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <textarea
                  className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={1}
                  placeholder="Type your message or command..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
              </div>
              <Button
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
              <Button
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                variant="outline"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
