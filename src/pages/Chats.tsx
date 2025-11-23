import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hash, Lock, User, Users, Plus, Search, ChevronDown, Settings, Volume2, UserPlus, Bell, Pin, MapPin, Compass, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BottomNav from "@/components/BottomNav";
import CreateChannelSheet from "@/components/CreateChannelSheet";
import JoinChannelSheet from "@/components/JoinChannelSheet";
import { mockChats } from "@/data/mockData";

const Chats = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [forumsOpen, setForumsOpen] = useState(true);
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [dmsOpen, setDmsOpen] = useState(true);

  // Organize chats by type
  const publicForums = mockChats.filter(c => c.type === "event");
  const privateGroups = mockChats.filter(c => c.type === "group");
  const directMessages = mockChats.filter(c => c.type === "direct");

  const getChannelIcon = (type: string) => {
    if (type === "direct") return <User className="h-4 w-4" />;
    if (type === "group") return <Lock className="h-4 w-4" />;
    return <Hash className="h-4 w-4" />;
  };

  const renderChannelList = (channels: any[], emptyText: string) => {
    const filtered = channels.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
      return (
        <p className="text-xs text-muted-foreground px-2 py-1 italic">
          {search ? "No results" : emptyText}
        </p>
      );
    }

    return filtered.map((channel) => (
      <button
        key={channel.id}
        onClick={() => navigate(`/chat/${channel.id}`)}
        className="w-full flex items-center gap-2 px-2 py-1.5 mx-1 hover:bg-muted/80 rounded transition-colors text-left group"
      >
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {getChannelIcon(channel.type)}
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-sm font-medium truncate text-muted-foreground group-hover:text-foreground">
            {channel.title}
          </span>
          {channel.unreadCount > 0 && (
            <div className="ml-auto flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-bold text-foreground">{channel.unreadCount}</span>
            </div>
          )}
        </div>
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Discord Style */}
      <div className="w-60 bg-card border-r border-border flex flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-border shadow-sm hover:bg-muted/50 cursor-pointer transition-colors">
          <h1 className="font-bold text-sm">Community Hub</h1>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Navigation Tabs - Desktop Only */}
        <div className="hidden md:flex flex-col gap-1 p-2 border-b border-border">
          <button
            onClick={() => navigate("/map")}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/80 transition-colors group"
          >
            <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Map</span>
          </button>
          <button
            onClick={() => navigate("/discover")}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/80 transition-colors group"
          >
            <Compass className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Discover</span>
          </button>
          <button
            onClick={() => navigate("/chats")}
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 transition-colors group"
          >
            <MessageCircle className="h-4 w-4 text-primary transition-colors" />
            <span className="text-sm font-medium text-primary">Chats</span>
          </button>
          <button
            onClick={() => navigate("/forum")}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/80 transition-colors group"
          >
            <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Community</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-2">
          <button className="w-full bg-background hover:bg-muted/80 rounded px-2 py-1.5 text-xs text-muted-foreground text-left transition-colors">
            Search
          </button>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          {/* Public Forums */}
          <Collapsible open={forumsOpen} onOpenChange={setForumsOpen}>
            <CollapsibleTrigger className="w-full flex items-center gap-0.5 px-2 py-1 hover:bg-transparent group">
              <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${forumsOpen ? "" : "-rotate-90"}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                Text Channels
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateOpen(true);
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 mt-1">
              {renderChannelList(publicForums, "No channels")}
            </CollapsibleContent>
          </Collapsible>

          {/* Voice Channels */}
          <Collapsible open={false} className="mt-4">
            <CollapsibleTrigger className="w-full flex items-center gap-0.5 px-2 py-1 hover:bg-transparent group">
              <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform -rotate-90" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                Voice Channels
              </span>
            </CollapsibleTrigger>
          </Collapsible>

          {/* Private Groups */}
          <Collapsible open={groupsOpen} onOpenChange={setGroupsOpen} className="mt-4">
            <CollapsibleTrigger className="w-full flex items-center gap-0.5 px-2 py-1 hover:bg-transparent group">
              <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${groupsOpen ? "" : "-rotate-90"}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                Private
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 mt-1">
              {renderChannelList(privateGroups, "No groups")}
            </CollapsibleContent>
          </Collapsible>

          {/* Direct Messages */}
          <Collapsible open={dmsOpen} onOpenChange={setDmsOpen} className="mt-4">
            <CollapsibleTrigger className="w-full flex items-center gap-0.5 px-2 py-1 hover:bg-transparent group">
              <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${dmsOpen ? "" : "-rotate-90"}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                Direct Messages
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 mt-1">
              {renderChannelList(directMessages, "No DMs")}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* User Bar at Bottom */}
        <div className="h-14 px-2 flex items-center gap-2 bg-muted/30 border-t border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Username</p>
            <p className="text-[10px] text-muted-foreground">#1234</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 px-4 flex items-center gap-4 border-b border-border shadow-sm">
          <Hash className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-sm">general</span>
          
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
            <div className="w-36 ml-2">
              <Input
                placeholder="Search"
                className="h-7 text-xs bg-background"
              />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl">
            {/* Welcome Message */}
            <div className="mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Hash className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Welcome to #general!</h2>
              <p className="text-sm text-muted-foreground">
                This is the start of the #general channel.
              </p>
            </div>

            {/* Sample Messages */}
            <div className="space-y-4">
              <div className="flex gap-3 hover:bg-muted/50 px-2 py-1 -mx-2 group">
                <Avatar className="h-10 w-10 mt-0.5">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    S
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">Sarah K.</span>
                    <span className="text-xs text-muted-foreground">Today at 2:30 PM</span>
                  </div>
                  <p className="text-sm mt-0.5">Hey everyone! 👋</p>
                </div>
              </div>

              <div className="flex gap-3 hover:bg-muted/50 px-2 py-1 -mx-2 group">
                <Avatar className="h-10 w-10 mt-0.5">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    M
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">Mike P.</span>
                    <span className="text-xs text-muted-foreground">Today at 2:31 PM</span>
                  </div>
                  <p className="text-sm mt-0.5">Welcome! Great to have everyone here 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="bg-muted/50 rounded-lg px-4 py-3">
            <Input
              placeholder="Message #general"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
            />
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>

      {/* Modals */}
      <CreateChannelSheet open={createOpen} onClose={() => setCreateOpen(false)} />
      <JoinChannelSheet open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
};

export default Chats;
