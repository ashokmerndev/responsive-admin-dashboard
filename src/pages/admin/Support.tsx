import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  Music, 
  File,
  X,
  Download,
  ArrowLeft,
  Check,
  CheckCheck,
  Smile,
  Mic,
  MoreVertical,
  Phone,
  Video,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'other';
  url: string;
  size: string;
}

interface MessageWithAttachment {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  attachments?: Attachment[];
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2">
    <div className="message-incoming px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
      </div>
    </div>
  </div>
);

// Message status icon
const MessageStatus = ({ status }: { status?: string }) => {
  if (!status) return null;
  
  switch (status) {
    case 'sending':
      return <Clock className="h-3 w-3 text-muted-foreground/70" />;
    case 'sent':
      return <Check className="h-3 w-3 text-muted-foreground/70" />;
    case 'delivered':
      return <CheckCheck className="h-3 w-3 text-muted-foreground/70" />;
    case 'read':
      return <CheckCheck className="h-3 w-3 text-info" />;
    default:
      return null;
  }
};

export default function Support() {
  const { chats } = useAdmin();
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [localMessages, setLocalMessages] = useState<MessageWithAttachment[]>([]);
  const [showChatList, setShowChatList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, isTyping]);

  const filteredChats = chats.filter((chat) =>
    chat.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getFileType = (file: File): 'image' | 'document' | 'audio' | 'other' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max file size is 10MB.`);
        return;
      }

      const attachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getFileType(file),
        url: URL.createObjectURL(file),
        size: formatFileSize(file.size),
      };
      newAttachments.push(attachment);
    });

    setAttachments((prev) => [...prev, ...newAttachments]);
    toast.success(`${newAttachments.length} file(s) attached`);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) return;

    const newMessage: MessageWithAttachment = {
      id: Date.now().toString(),
      sender: 'admin',
      text: message,
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      status: 'sending',
    };

    setLocalMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setAttachments([]);

    // Simulate message status updates
    setTimeout(() => {
      setLocalMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'sent' } : m))
      );
    }, 500);

    setTimeout(() => {
      setLocalMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' } : m))
      );
    }, 1000);

    setTimeout(() => {
      setLocalMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'read' } : m))
      );
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 2000);

    toast.success('Message sent');
  };

  const getAttachmentIcon = (type: Attachment['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const allMessages: MessageWithAttachment[] = [
    ...(selectedChat?.messages || []).map((m) => ({ ...m, attachments: undefined, status: 'read' as const })),
    ...localMessages.filter((m) => selectedChat?.id === chats[0]?.id),
  ];

  const handleSelectChat = (chat: typeof selectedChat) => {
    setSelectedChat(chat);
    setShowChatList(false);
    setLocalMessages([]);
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  // Get last seen time
  const getLastSeen = (chat: typeof selectedChat) => {
    if (chat?.status === 'open') return 'Online';
    return `Last seen ${formatTime(chat?.lastMessageTime || '')}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileSelect}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Customer Support</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage customer conversations</p>
      </div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-border/50 shadow-xl h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)]">
          <CardContent className="p-0 h-full">
            <div className="flex h-full">
              {/* Chat List */}
              <div className={cn(
                "w-full md:w-[340px] lg:w-[380px] border-r border-border flex flex-col bg-card",
                !showChatList && "hidden md:flex"
              )}>
                {/* Chat List Header */}
                <div className="p-3 sm:p-4 border-b border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-lg">Chats</h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                        <DropdownMenuItem>Archive all</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search or start new chat"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm bg-muted/50 border-0 focus-visible:ring-1"
                    />
                  </div>
                </div>

                {/* Chat List Items */}
                <ScrollArea className="flex-1 scrollbar-chat">
                  <AnimatePresence>
                    {filteredChats.map((chat, index) => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectChat(chat)}
                        className={cn(
                          'p-3 cursor-pointer hover:bg-muted/50 transition-all duration-200 border-b border-border/50',
                          selectedChat?.id === chat.id && 'bg-muted'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-background">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-medium">
                                {chat.customerName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            {chat.status === 'open' && (
                              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full ring-2 ring-background animate-pulse-online" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="font-semibold text-[15px] truncate">{chat.customerName}</p>
                              <span className={cn(
                                "text-xs shrink-0 ml-2",
                                chat.unreadCount > 0 ? "text-success font-medium" : "text-muted-foreground"
                              )}>
                                {formatTime(chat.lastMessageTime)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                                {chat.messages?.[chat.messages.length - 1]?.sender === 'admin' && (
                                  <CheckCheck className="h-3.5 w-3.5 text-info shrink-0" />
                                )}
                                {chat.lastMessage}
                              </p>
                              {chat.unreadCount > 0 && (
                                <Badge className="bg-success text-success-foreground h-5 min-w-5 px-1.5 flex items-center justify-center text-xs ml-2 shrink-0 rounded-full">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </div>

              {/* Chat Messages Area */}
              <div className={cn(
                "flex-1 flex flex-col",
                showChatList && "hidden md:flex"
              )}>
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-b border-border bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="md:hidden h-8 w-8 shrink-0"
                            onClick={handleBackToList}
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </Button>
                          <div className="relative">
                            <Avatar className="h-10 w-10 ring-2 ring-background">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-medium">
                                {selectedChat.customerName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            {selectedChat.status === 'open' && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-background" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[15px] truncate">{selectedChat.customerName}</p>
                            <p className={cn(
                              "text-xs",
                              selectedChat.status === 'open' ? "text-success" : "text-muted-foreground"
                            )}>
                              {isTyping ? 'typing...' : getLastSeen(selectedChat)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                  <Video className="h-5 w-5 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Video call</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                  <Phone className="h-5 w-5 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Voice call</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9">
                                <MoreVertical className="h-5 w-5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View contact</DropdownMenuItem>
                              <DropdownMenuItem>Search in chat</DropdownMenuItem>
                              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Close conversation</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Messages with WhatsApp-like background */}
                    <ScrollArea className="flex-1 chat-pattern scrollbar-chat">
                      <div className="p-3 sm:p-4 space-y-1">
                        {/* Date divider */}
                        <div className="flex justify-center my-3">
                          <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-lg text-xs text-muted-foreground shadow-sm">
                            {formatDate(allMessages[0]?.timestamp || new Date().toISOString())}
                          </span>
                        </div>

                        {allMessages.map((msg, index) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className={cn(
                              'flex',
                              msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                            )}
                          >
                            <div
                              className={cn(
                                'max-w-[85%] sm:max-w-[65%] px-3 py-2 shadow-sm relative',
                                msg.sender === 'admin'
                                  ? 'message-outgoing'
                                  : 'message-incoming'
                              )}
                            >
                              {/* Message tail */}
                              <div
                                className={cn(
                                  'absolute top-0 w-3 h-3 overflow-hidden',
                                  msg.sender === 'admin' ? '-right-1.5' : '-left-1.5'
                                )}
                              >
                                <div
                                  className={cn(
                                    'w-4 h-4 transform rotate-45',
                                    msg.sender === 'admin'
                                      ? 'bg-[hsl(var(--chat-outgoing))] translate-x-[-50%]'
                                      : 'bg-[hsl(var(--chat-incoming))] translate-x-[50%]'
                                  )}
                                />
                              </div>

                              {msg.text && <p className="text-[15px] leading-relaxed">{msg.text}</p>}
                              
                              {/* Attachments Display */}
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {msg.attachments.map((attachment) => (
                                    <div key={attachment.id}>
                                      {attachment.type === 'image' ? (
                                        <div className="relative group rounded-lg overflow-hidden">
                                          <img
                                            src={attachment.url}
                                            alt={attachment.name}
                                            className="max-w-full rounded-lg max-h-52 object-cover"
                                          />
                                          <a
                                            href={attachment.url}
                                            download={attachment.name}
                                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            <Download className="h-4 w-4 text-white" />
                                          </a>
                                        </div>
                                      ) : attachment.type === 'audio' ? (
                                        <div className="bg-background/30 rounded-lg p-2">
                                          <div className="flex items-center gap-2 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                              <Music className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                              <span className="text-sm truncate block">{attachment.name}</span>
                                              <span className="text-xs text-muted-foreground">{attachment.size}</span>
                                            </div>
                                          </div>
                                          <audio controls className="w-full h-8">
                                            <source src={attachment.url} />
                                          </audio>
                                        </div>
                                      ) : (
                                        <a
                                          href={attachment.url}
                                          download={attachment.name}
                                          className="flex items-center gap-3 p-3 bg-background/30 hover:bg-background/50 rounded-lg transition-colors"
                                        >
                                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                            {getAttachmentIcon(attachment.type)}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                                            <p className="text-xs text-muted-foreground">{attachment.size}</p>
                                          </div>
                                          <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Timestamp and status */}
                              <div className={cn(
                                'flex items-center gap-1 mt-1',
                                msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                              )}>
                                <span className="text-[11px] text-[hsl(var(--chat-timestamp))]">
                                  {formatTime(msg.timestamp)}
                                </span>
                                {msg.sender === 'admin' && (
                                  <MessageStatus status={msg.status} />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing indicator */}
                        <AnimatePresence>
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <TypingIndicator />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Attachment Preview */}
                    <AnimatePresence>
                      {attachments.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-border bg-muted/30 overflow-hidden"
                        >
                          <div className="px-3 sm:px-4 py-2">
                            <div className="flex flex-wrap gap-2">
                              {attachments.map((attachment) => (
                                <motion.div
                                  key={attachment.id}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="relative group flex items-center gap-2 bg-card rounded-lg p-2 pr-8 shadow-sm"
                                >
                                  {attachment.type === 'image' ? (
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                      {getAttachmentIcon(attachment.type)}
                                    </div>
                                  )}
                                  <div className="max-w-[100px]">
                                    <p className="text-xs font-medium truncate">{attachment.name}</p>
                                    <p className="text-xs text-muted-foreground">{attachment.size}</p>
                                  </div>
                                  <button
                                    onClick={() => removeAttachment(attachment.id)}
                                    className="absolute top-1 right-1 p-1 hover:bg-destructive/20 rounded-full transition-colors"
                                  >
                                    <X className="h-3.5 w-3.5 text-destructive" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message Input - WhatsApp Style */}
                    <div className="p-2 sm:p-3 border-t border-border bg-card">
                      <div className="flex items-end gap-2">
                        {/* Emoji button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 rounded-full">
                                <Smile className="h-5 w-5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Emoji</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Attachment dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 rounded-full">
                              <Paperclip className="h-5 w-5 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                if (fileInputRef.current) {
                                  fileInputRef.current.accept = 'image/*';
                                  fileInputRef.current.click();
                                }
                              }}
                            >
                              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                <ImageIcon className="h-4 w-4 text-purple-500" />
                              </div>
                              Photos & Videos
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                if (fileInputRef.current) {
                                  fileInputRef.current.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx';
                                  fileInputRef.current.click();
                                }
                              }}
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                <FileText className="h-4 w-4 text-blue-500" />
                              </div>
                              Document
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                if (fileInputRef.current) {
                                  fileInputRef.current.accept = 'audio/*';
                                  fileInputRef.current.click();
                                }
                              }}
                            >
                              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                                <Music className="h-4 w-4 text-orange-500" />
                              </div>
                              Audio
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Message input */}
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            className="pr-10 py-5 rounded-3xl bg-muted/50 border-0 focus-visible:ring-1"
                          />
                        </div>

                        {/* Send or Mic button */}
                        {message.trim() || attachments.length > 0 ? (
                          <Button 
                            onClick={handleSendMessage} 
                            size="icon" 
                            className="shrink-0 h-10 w-10 rounded-full"
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 rounded-full">
                                  <Mic className="h-5 w-5 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Voice message</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center chat-pattern">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <MessageSquare className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Select a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}