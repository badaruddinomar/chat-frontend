"use client";
import React, { useState, useEffect } from "react";
import { IMessage } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
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
  Trash,
} from "lucide-react";
import { ChatSidebar } from "./ChatSidebar";
import { useChat } from "@/hooks/useChat";

import {
  useReadMessagesMutation,
  useDeleteMessageMutation,
} from "@/redux/apiClient/messageApi";

const AdminChatInterface = () => {
  const {
    messages,
    sendMessage,
    selectedUser,
    setSelectedUser,
    onlineUserIds,
  } = useChat();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const [deleteMessage] = useDeleteMessageMutation();

  const [readMessages] = useReadMessagesMutation();

  const isLoading = false;
  const handleChatSelect = () => {
    setSidebarOpen(false); // Close sidebar on mobile when chat is selected
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        message: messageInput,
        receiverId: selectedUser?.user?.userId,
      };
      await sendMessage(formData);
      setMessageInput("");
    } catch (err: unknown) {
      console.log(err);
    }
  };
  useEffect(() => {
    const handleMessageRead = async () => {
      await readMessages({ senderId: selectedUser?.user?.userId });
    };
    handleMessageRead();
  }, [readMessages, selectedUser?.user?.userId]);

  const deleteMessageHandler = async (messageId: string) => {
    try {
      await deleteMessage(messageId).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {" "}
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-80 lg:w-96">
        <ChatSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <ChatSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onChatSelect={handleChatSelect}
          />
        </SheetContent>
      </Sheet>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
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
                <Button className="mt-6">
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
                  onClick={() => setSelectedUser(null)}
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
                    src={"/Logo.svg"}
                    alt={selectedUser?.user.name}
                  />
                  <AvatarFallback>
                    {selectedUser?.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">
                    {selectedUser?.user?.name}
                  </h3>
                  {selectedUser &&
                  onlineUserIds?.includes(selectedUser?.user?.userId)
                    ? "Online"
                    : "Last seen recently"}
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
                {messages?.map((message: IMessage, ind) => (
                  <div
                    key={ind}
                    className={`flex  space-x-1 ${
                      message?.receiverId === selectedUser?.user?.userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-2 ${
                        message?.receiverId === selectedUser?.user?.userId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm break-words">
                        <span>{message?.message}</span>
                        <Trash
                          size={14}
                          onClick={() =>
                            deleteMessageHandler(message.messageId)
                          }
                          className="cursor-pointer hover:opacity-70 transition-all duration-300"
                        />
                      </p>
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
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
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
                  disabled={!messageInput.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminChatInterface;
