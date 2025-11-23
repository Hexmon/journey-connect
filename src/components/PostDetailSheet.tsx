import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Users, Heart, MessageCircle, Send, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PostDetailSheetProps {
  open: boolean;
  onClose: () => void;
  post: any;
}

const PostDetailSheet = ({ open, onClose, post }: PostDetailSheetProps) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah Chen", avatar: "", text: "This looks amazing! Count me in! 🎉", time: "2h ago" },
    { id: 2, user: "Mike Johnson", avatar: "", text: "Can't wait for this event!", time: "5h ago" },
    { id: 3, user: "Emma Wilson", avatar: "", text: "Is there parking available nearby?", time: "1d ago" },
  ]);

  const interestedUsers = [
    { id: 1, name: "Sarah Chen", avatar: "", status: "Going", distance: "0.5 km away" },
    { id: 2, name: "Mike Johnson", avatar: "", status: "Interested", distance: "1.2 km away" },
    { id: 3, name: "Emma Wilson", avatar: "", status: "Going", distance: "0.8 km away" },
    { id: 4, name: "Alex Kumar", avatar: "", status: "Maybe", distance: "2.1 km away" },
    { id: 5, name: "Lisa Park", avatar: "", status: "Going", distance: "1.5 km away" },
  ];

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

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
      toast.success("Message sent!");
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleCreateGroup = () => {
    if (selectedUsers.size > 0) {
      toast.success(`Group chat created with ${selectedUsers.size} members!`);
      setSelectedUsers(new Set());
    } else {
      toast.error("Select at least one user");
    }
  };

  const handleDirectMessage = (userName: string) => {
    toast.success(`Starting chat with ${userName}`);
  };

  if (!post) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[90vh] flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>Event Details</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="details" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b px-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="interested">Interested ({interestedUsers.length})</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 mt-4 space-y-6">
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

            {/* Comment Input */}
            <div className="sticky bottom-0 border-t border-border pt-4 pb-4 bg-background flex gap-2">
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
          </TabsContent>

          <TabsContent value="interested" className="flex-1 overflow-y-auto px-6 mt-4">
            <div className="space-y-2 mb-4">
              {selectedUsers.size > 0 && (
                <div className="sticky top-0 bg-background pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{selectedUsers.size} selected</p>
                    <Button onClick={handleCreateGroup} size="sm" className="rounded-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Group Chat
                    </Button>
                  </div>
                </div>
              )}
              
              {interestedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                  />
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-primary font-medium">{user.status}</span>
                      <span>•</span>
                      <span>{user.distance}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDirectMessage(user.name)}
                    className="rounded-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="flex-1 flex flex-col px-6 mt-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              <div className="text-center text-sm text-muted-foreground py-4">
                Start a conversation about this event
              </div>
              
              {/* Sample messages */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted">SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl px-4 py-2">
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-sm">Hey everyone! Looking forward to this! 🎉</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-4">2h ago</p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-border pt-4 pb-4 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default PostDetailSheet;
