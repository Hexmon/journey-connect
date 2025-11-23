import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { mockChats } from "@/data/mockData";

const Chats = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "event" | "direct">("all");

  const filteredChats = mockChats.filter((chat) => {
    if (filter === "all") return true;
    if (filter === "event") return chat.type === "event" || chat.type === "group";
    if (filter === "direct") return chat.type === "direct";
    return true;
  });

  const getTypeIcon = (type: string) => {
    if (type === "direct") return <User className="h-4 w-4" />;
    return <Users className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">Chats</h1>
          <p className="text-text-secondary mb-6">Your conversations</p>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {[
              { id: "all", label: "All" },
              { id: "event", label: "Events & Groups" },
              { id: "direct", label: "Direct" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chat List */}
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="w-full bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(chat.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {chat.title}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {chat.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary truncate">
                      {chat.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {chat.type !== "direct" && (
                        <span className="text-xs text-muted-foreground">
                          {chat.participants.length} participants
                        </span>
                      )}
                      {chat.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chats;
