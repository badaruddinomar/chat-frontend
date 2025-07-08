"use client";
import { useChat } from "@/hooks/useChat";
import React, { useEffect, useState } from "react";
import { IMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile, Paperclip, Trash } from "lucide-react";
import {
  useDeleteMessageMutation,
  useReadMessagesMutation,
} from "@/redux/apiClient/messageApi";
import { useAppSelector } from "@/redux/hooks";

const CustomerChatInterface = () => {
  const { sendMessage, messages } = useChat();
  const [readMessages] = useReadMessagesMutation();
  const [messageInput, setMessageInput] = useState<string>("");
  const { user } = useAppSelector((state) => state.userReducer);
  const [deleteMessage] = useDeleteMessageMutation();

  const isLoading = false;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        message: messageInput,
      };
      await sendMessage(formData);
      setMessageInput("");
    } catch (err: unknown) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   const markMessageAsRead = async () => {
  //     await readMessages({});
  //   };
  //   markMessageAsRead();
  // }, [readMessages]);

  const deleteMessageHandler = async (messageId: string) => {
    try {
      await deleteMessage(messageId).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col h-full w-full">
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
              className={`flex ${
                message?.receiverId === null ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-2 ${
                  message?.receiverId === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm break-words">
                  <span>{message?.message}</span>
                  {message?.senderId === user?.user.userId && (
                    <Trash
                      size={14}
                      onClick={() => deleteMessageHandler(message.messageId)}
                      className="cursor-pointer hover:opacity-70 transition-all duration-300"
                    />
                  )}
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
  );
};

export default CustomerChatInterface;
