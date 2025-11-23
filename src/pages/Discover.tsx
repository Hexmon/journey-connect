import { useState } from "react";
import { Calendar, MapPin, Users, Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">Discover</h1>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-1">
          {mockPins.map((post) => {
            const isLiked = likedPosts.has(post.id);
            const isSaved = savedPosts.has(post.id);
            const likesCount = post.attendees + (isLiked ? 1 : 0);

            return (
              <div key={post.id} className="bg-card border-b border-border">
                {/* Post Header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {post.host[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{post.host}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{post.distance}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                {/* Post Image/Content */}
                <div 
                  className="relative aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 cursor-pointer"
                  onClick={() => handleViewDetails(post)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full">
                          {post.type === "event" ? "📅 Event" : post.type === "meet" ? "👥 Meet People" : "🚗 Ride Share"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 max-w-md mx-auto">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="transition-transform active:scale-125"
                      >
                        <Heart 
                          className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                        />
                      </button>
                      <button onClick={() => handleViewDetails(post)}>
                        <MessageCircle className="h-6 w-6" />
                      </button>
                      <button onClick={() => handleShare(post)}>
                        <Share2 className="h-6 w-6" />
                      </button>
                    </div>
                    <button onClick={() => handleSave(post.id)}>
                      <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Post Stats */}
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{likesCount} likes</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{post.host}</span>
                      <span className="text-muted-foreground line-clamp-1">{post.description}</span>
                    </div>
                    <button 
                      onClick={() => handleViewDetails(post)}
                      className="text-sm text-muted-foreground"
                    >
                      View all comments
                    </button>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{post.attendees} attending</span>
                      </div>
                    </div>
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
