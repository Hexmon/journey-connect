import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PostDetailSheetProps {
  open: boolean;
  onClose: () => void;
  post: any;
}

const PostDetailSheet = ({ open, onClose, post }: PostDetailSheetProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah Chen", avatar: "", text: "This looks amazing! Count me in! 🎉", time: "2h ago" },
    { id: 2, user: "Mike Johnson", avatar: "", text: "Can't wait for this event!", time: "5h ago" },
    { id: 3, user: "Emma Wilson", avatar: "", text: "Is there parking available nearby?", time: "1d ago" },
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        { id: comments.length + 1, user: "You", avatar: "", text: comment, time: "Just now" },
        ...comments,
      ]);
      setComment("");
      toast.success("Comment posted!");
    }
  };

  if (!post) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[90vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Event Details</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6 space-y-6">
          {/* Host Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {post.host[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.host}</p>
              <p className="text-sm text-muted-foreground">Event organizer</p>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{post.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{post.distance}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-5 w-5 text-primary" />
              <span>{post.attendees} people attending</span>
            </div>
          </div>

          {/* Attendees Preview */}
          <div>
            <h3 className="font-semibold mb-3">Attendees ({post.attendees})</h3>
            <div className="flex -space-x-3">
              {[...Array(Math.min(5, post.attendees))].map((_, i) => (
                <Avatar key={i} className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    U{i + 1}
                  </AvatarFallback>
                </Avatar>
              ))}
              {post.attendees > 5 && (
                <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                  +{post.attendees - 5}
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="font-semibold mb-4">Comments ({comments.length})</h3>
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted text-foreground text-xs">
                      {c.user[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <p className="font-medium text-sm">{c.user}</p>
                      <p className="text-sm">{c.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-4">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="border-t border-border pt-4 mt-4 flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            className="flex-1"
          />
          <Button onClick={handleAddComment} size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PostDetailSheet;
