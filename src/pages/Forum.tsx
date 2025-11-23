import { useState } from "react";
import { ThumbsUp, MessageSquare, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { mockForumPosts } from "@/data/mockData";

const Forum = () => {
  const [posts, setPosts] = useState(mockForumPosts);

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-text-secondary">Share and discuss with neighbors</p>
            </div>
            <Button size="icon" className="rounded-full h-12 w-12">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            {["All", "Local Tips", "Sports", "Safety", "Fitness", "Events"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all"
              >
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">
                      {post.authorName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">
                        {post.authorName}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-primary-soft text-primary rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                  <p className="text-text-secondary text-sm">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-border">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
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
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments} comments</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Forum;
