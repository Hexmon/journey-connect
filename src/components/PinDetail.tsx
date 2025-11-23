import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pin } from "@/pages/Map";
import { X, MapPin, Clock, Users, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface PinDetailProps {
  pin: Pin;
  open: boolean;
  onClose: () => void;
}

const PinDetail = ({ pin, open, onClose }: PinDetailProps) => {
  const navigate = useNavigate();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const getTypeLabel = (type: Pin["type"]) => {
    switch (type) {
      case "meet":
        return "Meet People";
      case "event":
        return "Event & Hangout";
      case "ride":
        return "Ride Share";
      case "help":
        return "Community Help";
      case "sos":
        return "SOS Signal";
      case "news":
        return "News & Opening";
      default:
        return type;
    }
  };

  const getTypeColor = (type: Pin["type"]) => {
    switch (type) {
      case "meet":
        return "bg-primary-soft text-primary";
      case "event":
        return "bg-secondary-soft text-secondary";
      case "ride":
        return "bg-info-soft text-info";
      case "help":
        return "bg-success-soft text-success";
      case "sos":
        return "bg-danger-soft text-danger";
      case "news":
        return "bg-news-soft text-news";
      default:
        return "bg-primary-soft text-primary";
    }
  };

  const handleJoin = () => {
    setShowJoinDialog(true);
  };

  const confirmJoin = () => {
    toast({
      title: "You're going!",
      description: "We'll remind you 30 minutes before.",
    });
    setShowJoinDialog(false);
    onClose();
    navigate("/chats");
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved ? "Item removed from your saved list" : "You can find this in Saved Items",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied!",
      description: "Share this event with your friends",
    });
  };

  const handleChat = () => {
    onClose();
    navigate("/chats");
  };

  return (
    <>
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getTypeColor(
                  pin.type
                )}`}
              >
                {getTypeLabel(pin.type)}
              </span>
              <h2 className="text-2xl font-bold text-foreground">{pin.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: "calc(80vh - 200px)" }}>
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-xl p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs font-medium">{pin.time}</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs font-medium">{pin.distance}</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs font-medium">{pin.attendees} going</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">About</h3>
            <p className="text-text-secondary">{pin.description}</p>
          </div>

          {/* Host */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Host</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {pin.host.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{pin.host}</p>
                <p className="text-sm text-muted-foreground">Host</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                View Profile
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full flex-shrink-0"
              onClick={handleSave}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full flex-shrink-0"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full flex-1"
              onClick={handleChat}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
          <Button 
            className="w-full h-12 text-base rounded-full" 
            size="lg"
            onClick={handleJoin}
          >
            Join Event
          </Button>
        </div>
      </SheetContent>

      {/* Join Confirmation Dialog */}
      <AlertDialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Join this event?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll be added to the event chat and receive a reminder 30 minutes before it starts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmJoin}>
              Yes, I'm going
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
    </>
  );
};

export default PinDetail;
