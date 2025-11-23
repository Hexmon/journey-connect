import { useState } from "react";
import { ThumbsUp, MessageSquare, Plus, Search, Grid3x3, List, X, SlidersHorizontal, TrendingUp, Clock, Flame } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockForumPosts } from "@/data/mockData";

const Forum = () => {
  const [posts, setPosts] = useState(mockForumPosts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Trending", "Recent", "Local Tips", "Sports", "Safety", "Fitness", "Events", "Food"];

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || post.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Trending": return <TrendingUp className="h-3 w-3" />;
      case "Recent": return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 space-y-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Community</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary/10 text-primary" : ""}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid3x3 className="h-5 w-5" />}
              </Button>
              <Button size="icon" className="rounded-full h-10 w-10">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions, tips, stories..."
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
              {categories.map((category) => {
                const icon = getCategoryIcon(category);
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeFilter === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {icon}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4">
          {viewMode === "grid" ? (
            /* Instagram Grid View */
            <div className="grid grid-cols-3 gap-1">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-card border border-border relative group cursor-pointer overflow-hidden"
                >
                  {/* Post Preview Image/Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-2">
                    <div className="text-center">
                      <Avatar className="h-8 w-8 mx-auto mb-1">
                        <AvatarFallback className="bg-primary/30 text-primary text-xs">
                          {post.authorName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-[10px] font-bold line-clamp-2 text-foreground">
                        {post.title}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 fill-white" />
                        <span className="text-xs font-bold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 fill-white" />
                        <span className="text-xs font-bold">{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-1 right-1">
                    <span className="text-[8px] px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all cursor-pointer"
                >
                  {/* Post Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {post.authorName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground text-sm">
                          {post.authorName}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-3">
                    <h3 className="font-bold text-base mb-1">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-border">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        post.isLiked
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${post.isLiked ? "fill-primary" : ""}`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Forum;
