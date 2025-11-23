import { useState } from "react";
import { Calendar, MapPin, Users, Heart, MessageCircle, Share2, Bookmark, AlertCircle, Clock, Car, HandHeart, Megaphone, Search, SlidersHorizontal, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PostShareSheet from "@/components/PostShareSheet";
import PostDetailSheet from "@/components/PostDetailSheet";
import { mockPins } from "@/data/mockData";
import { toast } from "sonner";

const Discover = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: "all", label: "All", icon: Users },
    { id: "event", label: "Events", icon: Calendar },
    { id: "meet", label: "Meet", icon: Users },
    { id: "ride", label: "Rides", icon: Car },
    { id: "help", label: "Help", icon: HandHeart },
    { id: "sos", label: "SOS", icon: AlertCircle },
    { id: "news", label: "News", icon: Megaphone },
  ];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
        toast.success("Added to liked posts!");
      }
      return newSet;
    });
  };

  const handleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.success("Removed from saved items");
      } else {
        newSet.add(postId);
        toast.success("Saved to your collection!");
      }
      return newSet;
    });
  };

  const handleShare = (post: any) => {
    setSelectedPost(post);
    setShareOpen(true);
  };

  const handleViewDetails = (post: any) => {
    setSelectedPost(post);
    setDetailOpen(true);
  };

  const filteredPosts = mockPins.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || post.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getCardStyle = (type: string) => {
    switch (type) {
      case "event":
        return {
          gradient: "from-secondary/20 via-secondary/10 to-background",
          icon: Calendar,
          iconColor: "text-secondary",
          badge: "Event",
          badgeColor: "bg-secondary text-secondary-foreground",
        };
      case "meet":
        return {
          gradient: "from-primary/20 via-primary/10 to-background",
          icon: Users,
          iconColor: "text-primary",
          badge: "Meet People",
          badgeColor: "bg-primary text-primary-foreground",
        };
      case "ride":
        return {
          gradient: "from-info/20 via-info/10 to-background",
          icon: Car,
          iconColor: "text-info",
          badge: "Ride Share",
          badgeColor: "bg-info text-white",
        };
      case "help":
        return {
          gradient: "from-success/20 via-success/10 to-background",
          icon: HandHeart,
          iconColor: "text-success",
          badge: "Help Needed",
          badgeColor: "bg-success text-white",
        };
      case "sos":
        return {
          gradient: "from-danger/20 via-danger/10 to-background",
          icon: AlertCircle,
          iconColor: "text-danger",
          badge: "SOS - Urgent",
          badgeColor: "bg-danger text-white animate-pulse",
        };
      case "news":
        return {
          gradient: "from-news/20 via-news/10 to-background",
          icon: Megaphone,
          iconColor: "text-news",
          badge: "Community News",
          badgeColor: "bg-news text-white",
        };
      default:
        return {
          gradient: "from-primary/20 via-primary/10 to-background",
          icon: Users,
          iconColor: "text-primary",
          badge: "Update",
          badgeColor: "bg-primary text-primary-foreground",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Discover</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-primary/10 text-primary" : ""}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, meetups, rides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-full bg-muted/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => {
                const FilterIcon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activeFilter === filter.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <FilterIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts.has(post.id);
            const isSaved = savedPosts.has(post.id);
            const style = getCardStyle(post.type);
            const Icon = style.icon;
            const isUrgent = post.type === "sos" || post.type === "help";

            return (
              <div 
                key={post.id} 
                className={`bg-card rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  isUrgent ? 'border-danger/50 shadow-lg shadow-danger/10' : 'border-border'
                }`}
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-12 w-12 ring-2 ${isUrgent ? 'ring-danger/30' : 'ring-primary/10'}`}>
                      <AvatarFallback className={`${style.iconColor} bg-muted text-base font-bold`}>
                        {post.host[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{post.host}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{post.distance}</span>
                        {isUrgent && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-danger font-medium">
                              <Clock className="h-3 w-3" />
                              <span>{post.time}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${style.badgeColor} text-xs`}>
                    {style.badge}
                  </Badge>
                </div>

                {/* Post Content Card with Image */}
                <div 
                  onClick={() => handleViewDetails(post)}
                  className="mx-4 mb-4 rounded-2xl overflow-hidden cursor-pointer relative group"
                >
                  {/* Image/Video Placeholder */}
                  <div className={`aspect-video bg-gradient-to-br ${style.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={`h-16 w-16 ${style.iconColor} opacity-30`} strokeWidth={1.5} />
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h2 className="text-lg font-bold mb-1 line-clamp-2">{post.title}</h2>
                      <p className="text-xs opacity-90 line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    {/* View Details Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="rounded-full" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Info Tags */}
                  <div className="p-3 bg-card/95 backdrop-blur-sm flex flex-wrap gap-2">
                    {!isUrgent && (
                      <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{post.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full text-xs">
                      <Users className="h-3 w-3" />
                      <span>{post.attendees} {post.type === "help" || post.type === "sos" ? "responses" : "interested"}</span>
                    </div>
                    {isUrgent && (
                      <div className="flex items-center gap-1.5 bg-danger/20 px-2.5 py-1 rounded-full text-xs text-danger font-semibold animate-pulse">
                        <AlertCircle className="h-3 w-3" />
                        <span>URGENT</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 transition-all active:scale-110 group"
                      >
                        <Heart 
                          className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'} transition-colors`}
                        />
                        <span className="text-sm font-medium">{post.attendees + (isLiked ? 1 : 0)}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleViewDetails(post)}
                        className="flex items-center gap-2 transition-all hover:text-primary group"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Comment</span>
                      </button>
                      
                      <button 
                        onClick={() => handleShare(post)}
                        className="flex items-center gap-2 transition-all hover:text-primary group"
                      >
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleSave(post.id)}
                      className="transition-all active:scale-110"
                    >
                      <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current text-primary' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <BottomNav />

      {/* Share Sheet */}
      {selectedPost && (
        <PostShareSheet
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          postTitle={selectedPost.title}
        />
      )}

      {/* Detail Sheet */}
      {selectedPost && (
        <PostDetailSheet
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default Discover;
