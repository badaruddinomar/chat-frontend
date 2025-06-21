import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, Search } from "lucide-react";

interface IChatContacts {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export function ChatSidebar({
  searchQuery,
  setSearchQuery,
  selectedChat,
  setSelectedChat,
  onChatSelect,
  chatContacts,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedChat: number | null;
  setSelectedChat: (id: number) => void;
  onChatSelect?: () => void;
  chatContacts: IChatContacts[];
}) {
  const filteredContacts = chatContacts.filter((contact: IChatContacts) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background border-r">
      {/* Sidebar Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
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
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedChat(contact.id);
                onChatSelect?.();
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                selectedChat === contact.id ? "bg-accent" : ""
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={contact.avatar || "/placeholder.svg"}
                    alt={contact.name}
                  />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {contact.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              </div>
              {contact.unread > 0 && (
                <Badge variant="default" className="ml-2">
                  {contact.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
