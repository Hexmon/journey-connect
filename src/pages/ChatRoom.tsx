import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      // In real app, send message here
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/chats")}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground truncate">{chat.title}</h2>
          {chat.type !== "direct" && (
            <p className="text-xs text-muted-foreground">
              {chat.participants.length} participants
            </p>
          )}
        </div>

        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          {chat.type !== "direct" ? (
            <Users className="h-5 w-5" />
          ) : (
            <MoreVertical className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] ${
                message.isCurrentUser
                  ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                  : "bg-card border border-border rounded-2xl rounded-bl-md"
              } p-3`}
            >
              {!message.isCurrentUser && chat.type !== "direct" && (
                <p className="text-xs font-semibold mb-1 text-primary">
                  {message.senderName}
                </p>
              )}
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isCurrentUser
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4 safe-area-bottom">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full h-10 w-10 flex-shrink-0"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
