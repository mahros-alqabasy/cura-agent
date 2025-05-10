import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Search, Send } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  fullMessage?: string;
  fromAvatar?: string;
}

const Messages = () => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  
  // Example messages - in a real app, these would come from an API
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'Dr. John Miller',
      subject: 'Follow-up on your recent appointment',
      preview: "I wanted to check how you're feeling after our last appointment...",
      fullMessage: "I wanted to check how you're feeling after our last appointment. Have the new medications been helping with your symptoms? Please let me know if you have any concerns or questions about your treatment plan. Best regards, Dr. Miller",
      date: 'May 7, 2025',
      read: false,
      fromAvatar: '',
    },
    {
      id: '2',
      from: 'Dr. Sara Mohamed',
      subject: 'Your recent test results',
      preview: "I've reviewed your recent neurological assessment and would like to discuss...",
      fullMessage: "I've reviewed your recent neurological assessment and would like to discuss the findings with you. Overall, the results are within normal ranges, but there are a couple of items I'd like to follow up on. Could you schedule a video consultation with me next week? My available slots are Monday and Wednesday afternoons. Regards, Dr. Sara Mohamed",
      date: 'May 12, 2025',
      read: true,
      fromAvatar: '',
    },
    {
      id: '3',
      from: 'Dr. Michael Chang',
      subject: 'Appointment rescheduled',
      preview: "Your appointment for May 20 has been rescheduled to May 22 at 2:00 PM...",
      fullMessage: "Your appointment for May 20 has been rescheduled to May 22 at 2:00 PM due to an emergency in my schedule. Please let the reception know if this new time works for you. If not, we can find an alternative date. Sorry for any inconvenience this may cause. Best regards, Dr. Chang",
      date: 'May 15, 2025',
      read: false,
      fromAvatar: '',
    }
  ]);

  // Mark a message as read when selected
  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      // Mark as read in the messages list
      setMessages(
        messages.map((m) => 
          m.id === message.id ? { ...m, read: true } : m
        )
      );
    }
  };

  // Handle sending a reply
  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Please enter a message before sending');
      return;
    }
    
    // In a real app, you would send this to an API
    toast.success('Reply sent successfully');
    setReplyText('');
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    message => 
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Messages List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Inbox</span>
              <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                {messages.filter(m => !m.read).length} unread
              </span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search messages..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto flex flex-col gap-2 py-0">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-3 rounded-md cursor-pointer ${
                    selectedMessage?.id === message.id 
                      ? 'bg-primary/10' 
                      : message.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.fromAvatar} />
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {message.from.split(' ').map(part => part[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={`text-sm font-medium truncate ${!message.read ? 'font-bold' : ''}`}>
                          {message.from}
                        </p>
                        <p className="text-xs text-gray-500 whitespace-nowrap">{message.date}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{message.subject}</p>
                      <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                    </div>
                    {!message.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">No messages found</div>
            )}
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="md:col-span-2">
          {selectedMessage ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedMessage.fromAvatar} />
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {selectedMessage.from.split(' ').map(part => part[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>From: {selectedMessage.from}</span>
                      <span>•</span>
                      <span>{selectedMessage.date}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-gray-700">
                    <p>{selectedMessage.fullMessage}</p>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="text-sm font-medium mb-2">Reply</h4>
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Type your reply here..." 
                        className="min-h-[120px]"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendReply}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
              <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
              <p>Select a message to view</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
