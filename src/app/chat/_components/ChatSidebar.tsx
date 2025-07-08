"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";
import { Search } from "lucide-react";
import { IUser } from "@/types";

export function ChatSidebar({
  searchQuery,
  setSearchQuery,
  onChatSelect,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onChatSelect?: () => void;
}) {
  const { setSelectedUser, users, selectedUser } = useChat();
  const { onlineUserIds } = useChat();
  const filteredContacts = users?.filter((user: IUser) =>
    user.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full flex-col h-full bg-background border-r">
      {/* Sidebar Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Contacts List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredContacts?.map((user: IUser) => (
            <div
              key={user?.customerId}
              onClick={() => {
                setSelectedUser(user);
                onChatSelect?.();
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                selectedUser?.user?.userId === user?.user?.userId
                  ? "bg-accent"
                  : ""
              }`}
            >
              <div className="relative bg-black rounded-full">
                <Avatar>
                  <AvatarImage src={"/Logo.svg"} alt={user?.user?.name} />
                  <AvatarFallback>{user?.user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {user?.user?.userId in onlineUserIds && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{user?.user?.name}</p>
                  {/* <span className="text-xs text-muted-foreground">
                    {user?.time}
                  </span> */}
                </div>
                {/* <p className="text-sm text-muted-foreground truncate">
                  {user?.lastMessage}
                </p> */}
              </div>
              {/* {user?.unread > 0 && (
                <Badge variant="default" className="ml-2">
                  {user?.unread}
                </Badge>
              )} */}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
