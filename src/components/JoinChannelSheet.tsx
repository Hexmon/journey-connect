import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, TrendingUp, Hash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JoinChannelSheetProps {
  open: boolean;
  onClose: () => void;
}

const publicChannels = [
  { id: 1, name: "local-events", members: 234, category: "Events", trending: true, description: "Discover events happening nearby" },
  { id: 2, name: "ride-sharing", members: 189, category: "Transport", trending: true, description: "Share rides and save money" },
  { id: 3, name: "food-lovers", members: 456, category: "Food", trending: false, description: "Best food spots in town" },
  { id: 4, name: "fitness-buddies", members: 312, category: "Health", trending: false, description: "Find workout partners" },
  { id: 5, name: "tech-talk", members: 567, category: "Technology", trending: true, description: "Discuss latest tech trends" },
  { id: 6, name: "study-groups", members: 198, category: "Education", trending: false, description: "Collaborative learning space" },
];

const JoinChannelSheet = ({ open, onClose }: JoinChannelSheetProps) => {
  const [search, setSearch] = useState("");
  
  const filteredChannels = publicChannels.filter(channel =>
    channel.name.toLowerCase().includes(search.toLowerCase()) ||
    channel.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoin = (channelName: string) => {
    toast.success(`Joined #${channelName}!`);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[85vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Discover Public Channels</SheetTitle>
        </SheetHeader>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        {/* Trending Badge */}
        <div className="flex items-center gap-2 mt-4 text-sm">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-medium">Trending near you</span>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-card rounded-2xl border border-border p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 bg-primary/10">
                  <AvatarFallback className="bg-primary/10">
                    <Hash className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">#{channel.name}</h3>
                    {channel.trending && (
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{channel.description}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{channel.members} members</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {channel.category}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={() => handleJoin(channel.name)}
                  size="sm"
                  className="rounded-full"
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default JoinChannelSheet;
