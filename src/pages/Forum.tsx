import { useState } from "react";
import { ThumbsUp, MessageSquare, Plus, Search, X, TrendingUp, Home, Compass, MessageCircle, Users, User, Bookmark, Settings, MoreHorizontal, Share2, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockForumPosts } from "@/data/mockData";

const Forum = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockForumPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("For You");

  const tabs = ["For You", "Trending", "Local Tips", "Sports", "Events"];

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
    const matchesTab = activeTab === "For You" || post.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Twitter Style Navigation */}
      <div className="hidden md:flex w-64 border-r border-border flex-col sticky top-0 h-screen">
        <div className="flex-1 px-3 py-4">
          {/* Logo/Brand */}
          <div className="px-3 mb-6">
            <h1 className="text-2xl font-bold text-primary">Community</h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => navigate("/map")}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-muted transition-colors w-full text-left group"
            >
              <Home className="h-6 w-6" />
              <span className="text-lg font-medium">Home</span>
            </button>
            <button
              onClick={() => navigate("/discover")}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-muted transition-colors w-full text-left group"
            >
              <Compass className="h-6 w-6" />
              <span className="text-lg font-medium">Discover</span>
            </button>
            <button
              onClick={() => navigate("/chats")}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-muted transition-colors w-full text-left group"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-lg font-medium">Messages</span>
            </button>
            <button
              className="flex items-center gap-4 px-4 py-3 rounded-full bg-primary/10 text-primary w-full text-left group"
            >
              <Users className="h-6 w-6" />
              <span className="text-lg font-medium">Community</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-muted transition-colors w-full text-left group"
            >
              <User className="h-6 w-6" />
              <span className="text-lg font-medium">Profile</span>
            </button>
            <button
              onClick={() => navigate("/saved")}
              className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-muted transition-colors w-full text-left group"
            >
              <Bookmark className="h-6 w-6" />
              <span className="text-lg font-medium">Saved</span>
            </button>
          </nav>

          {/* Post Button */}
          <Button className="w-full mt-4 rounded-full h-12 text-lg font-bold">
            Post
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-border">
          <button className="flex items-center gap-3 p-3 rounded-full hover:bg-muted transition-colors w-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left min-w-0">
              <p className="font-bold text-sm truncate">Username</p>
              <p className="text-xs text-muted-foreground truncate">@username</p>
            </div>
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-2xl border-r border-border">
        {/* Top Tabs - Twitter Style */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-4 text-sm font-semibold hover:bg-muted/50 transition-colors relative ${
                  activeTab === tab ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* What's on your mind - Composer */}
          <div className="border-b border-border p-4 hover:bg-muted/30 transition-colors">
            <div className="flex gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="What's happening in your community?"
                  className="border-0 text-lg p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-muted-foreground"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-1">
                    {/* Placeholder for media buttons */}
                  </div>
                  <Button size="sm" className="rounded-full font-bold">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="border-b border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30 text-foreground font-semibold">
                    {post.authorName[0]}
                  </AvatarFallback>
                </Avatar>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm">{post.authorName}</span>
                    <span className="text-muted-foreground text-sm">@{post.authorName.toLowerCase().replace(" ", "")}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium ml-auto">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Body */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-base mb-1">{post.title}</h3>
                    <p className="text-sm text-foreground">{post.content}</p>
                  </div>

                  {/* Actions - Twitter Style */}
                  <div className="flex items-center justify-between max-w-md">
                    <button className="flex items-center gap-2 group hover:text-primary transition-colors">
                      <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-primary">
                        {post.comments}
                      </span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-success transition-colors">
                      <div className="p-2 rounded-full group-hover:bg-success/10 transition-colors">
                        <Repeat2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-success">
                        Share
                      </span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                      }}
                      className={`flex items-center gap-2 group transition-colors ${
                        post.isLiked ? "text-red-500" : "hover:text-red-500"
                      }`}
                    >
                      <div className={`p-2 rounded-full transition-colors ${
                        post.isLiked ? "bg-red-500/10" : "group-hover:bg-red-500/10"
                      }`}>
                        <ThumbsUp className={`h-4 w-4 ${post.isLiked ? "fill-red-500" : ""}`} />
                      </div>
                      <span className={`text-sm ${post.isLiked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"}`}>
                        {post.likes}
                      </span>
                    </button>

                    <button className="flex items-center gap-2 group hover:text-primary transition-colors">
                      <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Trends & Search */}
      <div className="hidden lg:flex w-80 px-4 py-4 space-y-4">
        {/* Search */}
        <div className="sticky top-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search Community"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 rounded-full bg-muted border-0 h-11"
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

          {/* Trending Topics */}
          <div className="bg-muted/50 rounded-2xl overflow-hidden">
            <div className="p-4">
              <h2 className="font-bold text-lg mb-3">What's happening</h2>
              <div className="space-y-4">
                {["Safety Tips", "Local Events", "Weekend Plans", "Community Garden"].map((trend, i) => (
                  <div key={trend} className="hover:bg-background/50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                    <p className="text-xs text-muted-foreground">Trending in Community</p>
                    <p className="font-bold text-sm">{trend}</p>
                    <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 500) + 100} posts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Categories */}
          <div className="bg-muted/50 rounded-2xl overflow-hidden">
            <div className="p-4">
              <h2 className="font-bold text-lg mb-3">Suggested for you</h2>
              <div className="space-y-3">
                {["Local Tips", "Sports", "Fitness"].map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{category[0]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{category}</p>
                        <p className="text-xs text-muted-foreground">Popular topic</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Forum;
