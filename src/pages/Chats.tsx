import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hash, Lock, User, Users, Plus, Search, ChevronDown, Settings } from "lucide-react";
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
        <p className="text-sm text-muted-foreground px-4 py-2 italic">
          {search ? "No results found" : emptyText}
        </p>
      );
    }

    return filtered.map((channel) => (
      <button
        key={channel.id}
        onClick={() => navigate(`/chat/${channel.id}`)}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition-colors text-left group"
      >
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {getChannelIcon(channel.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{channel.title}</span>
            {channel.unreadCount > 0 && (
              <Badge className="h-5 px-1.5 text-xs">
                {channel.unreadCount}
              </Badge>
            )}
          </div>
          {channel.type !== "direct" && (
            <p className="text-xs text-muted-foreground">
              {channel.participants.length} members
            </p>
          )}
        </div>
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full bg-muted/50"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => setCreateOpen(true)}
              variant="outline"
              size="sm"
              className="rounded-full flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
            <Button
              onClick={() => setJoinOpen(true)}
              variant="outline"
              size="sm"
              className="rounded-full flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Channels/Chats List */}
      <div className="flex-1 overflow-y-auto pb-24 px-2">
        {/* Public Forums */}
        <Collapsible open={forumsOpen} onOpenChange={setForumsOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center gap-2">
              <ChevronDown className={`h-4 w-4 transition-transform ${forumsOpen ? "" : "-rotate-90"}`} />
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Public Forums
              </span>
              <Badge variant="secondary" className="text-xs">
                {publicForums.length}
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {renderChannelList(publicForums, "No public forums yet")}
          </CollapsibleContent>
        </Collapsible>

        {/* Private Groups */}
        <Collapsible open={groupsOpen} onOpenChange={setGroupsOpen} className="mt-4">
          <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center gap-2">
              <ChevronDown className={`h-4 w-4 transition-transform ${groupsOpen ? "" : "-rotate-90"}`} />
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Private Groups
              </span>
              <Badge variant="secondary" className="text-xs">
                {privateGroups.length}
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {renderChannelList(privateGroups, "No private groups yet")}
          </CollapsibleContent>
        </Collapsible>

        {/* Direct Messages */}
        <Collapsible open={dmsOpen} onOpenChange={setDmsOpen} className="mt-4">
          <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center gap-2">
              <ChevronDown className={`h-4 w-4 transition-transform ${dmsOpen ? "" : "-rotate-90"}`} />
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Direct Messages
              </span>
              <Badge variant="secondary" className="text-xs">
                {directMessages.length}
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {renderChannelList(directMessages, "No direct messages yet")}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <BottomNav />

      {/* Modals */}
      <CreateChannelSheet open={createOpen} onClose={() => setCreateOpen(false)} />
      <JoinChannelSheet open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
};

export default Chats;
