import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, Users, Hash, Bell, Pin, UserPlus, Smile, Plus, Gift, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockChats, mockMessages } from "@/data/mockData";

const ChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");

  const chat = mockChats.find((c) => c.id === chatId);
  const messages = mockMessages[chatId || ""] || [];

  if (!chat) {
    return <div>Chat not found</div>;
  }

  const handleSend = () => {
    if (newMessage.trim()) {
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Channel List (hidden on mobile, shown via back button) */}
      <div className="hidden md:flex w-60 bg-card border-r border-border flex-col">
        <div className="h-12 px-4 flex items-center justify-between border-b border-border shadow-sm hover:bg-muted/50 cursor-pointer transition-colors">
          <h1 className="font-bold text-sm">Community Hub</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
            Text Channels
          </div>
          {mockChats.filter(c => c.type !== "direct").map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/chat/${c.id}`)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${
                c.id === chatId ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span className="text-sm font-medium truncate">{c.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 px-4 flex items-center gap-4 border-b border-border shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate("/chats")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Hash className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-sm">{chat.title}</span>
          
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl p-4">
            {/* Welcome Message */}
            <div className="mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Hash className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Welcome to #{chat.title}!</h2>
              <p className="text-sm text-muted-foreground">
                This is the start of the #{chat.title} channel.
              </p>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message, idx) => {
                const showAvatar = idx === 0 || messages[idx - 1].senderId !== message.senderId;
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 hover:bg-muted/50 px-2 py-0.5 -mx-2 group ${!showAvatar ? "mt-0" : ""}`}
                  >
                    {showAvatar ? (
                      <Avatar className="h-10 w-10 mt-0.5">
                        <AvatarFallback className={`${message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          {message.senderName[0]}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">
                          {message.timestamp.split(" ").pop()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      {showAvatar && (
                        <div className="flex items-baseline gap-2">
                          <span className={`font-semibold text-sm ${message.isCurrentUser ? "text-primary" : ""}`}>
                            {message.senderName}
                          </span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                      )}
                      <p className="text-sm mt-0.5 break-words">{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 pb-20 md:pb-4">
          <div className="bg-muted/50 rounded-lg">
            <div className="px-4 py-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-5 w-5" />
              </Button>
              
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message #${chat.title}`}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto flex-1"
              />
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 hidden md:flex">
                  <Gift className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
