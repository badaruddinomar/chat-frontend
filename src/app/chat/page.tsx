"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MessageCircle,
  Send,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { ChatSidebar } from "./_components/ChatSidebar";

const chatContacts = [
  {
    id: 1,
    name: "AI Assistant",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hello! How can I help you today?",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the help with the project!",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Team Chat",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Meeting at 3 PM today",
    time: "3h ago",
    unread: 5,
    online: false,
  },
  {
    id: 4,
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you tomorrow!",
    time: "1d ago",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Design Team",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "New mockups are ready for review",
    time: "2d ago",
    unread: 1,
    online: true,
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const selectedContact = chatContacts.find(
    (contact) => contact.id === selectedChat
  );

  const handleChatSelect = () => {
    setSidebarOpen(false); // Close sidebar on mobile when chat is selected
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-80 lg:w-96">
        <ChatSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          chatContacts={chatContacts}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <ChatSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            onChatSelect={handleChatSelect}
            chatContacts={chatContacts}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!selectedChat ? (
          // Default "Start Messaging" State
          <div className="flex-1 flex flex-col">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center p-4 border-b">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h1 className="ml-3 text-lg font-semibold">Messages</h1>
            </div>

            {/* Welcome Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center space-y-6 max-w-md">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">
                    Start a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Select a contact from the sidebar to begin messaging, or
                    start a new conversation.
                  </p>
                </div>
                <Button className="mt-6" onClick={() => setSidebarOpen(true)}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Browse Contacts
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-3">
                {/* Mobile back button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                {/* Desktop sidebar toggle */}
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex lg:hidden"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                </Sheet>

                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={selectedContact?.avatar || "/placeholder.svg"}
                    alt={selectedContact?.name}
                  />
                  <AvatarFallback>
                    {selectedContact?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">
                    {selectedContact?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact?.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 hidden sm:flex"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
