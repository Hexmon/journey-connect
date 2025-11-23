import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Share2, Facebook, Twitter, MessageCircle, Link as LinkIcon, Mail } from "lucide-react";
import { FaWhatsapp, FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PostShareSheetProps {
  open: boolean;
  onClose: () => void;
  postTitle: string;
  postUrl?: string;
}

const PostShareSheet = ({ open, onClose, postTitle, postUrl = window.location.href }: PostShareSheetProps) => {
  const handleShare = (platform: string) => {
    toast.success(`Shared to ${platform}!`);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
    onClose();
  };

  const shareOptions = [
    { name: "WhatsApp", icon: FaWhatsapp, color: "text-green-500", action: () => handleShare("WhatsApp") },
    { name: "Facebook", icon: Facebook, color: "text-blue-600", action: () => handleShare("Facebook") },
    { name: "Messenger", icon: FaFacebookMessenger, color: "text-blue-500", action: () => handleShare("Messenger") },
    { name: "Twitter", icon: Twitter, color: "text-sky-500", action: () => handleShare("Twitter") },
    { name: "Telegram", icon: FaTelegram, color: "text-blue-400", action: () => handleShare("Telegram") },
    { name: "Email", icon: Mail, color: "text-gray-600", action: () => handleShare("Email") },
    { name: "Copy Link", icon: LinkIcon, color: "text-gray-600", action: handleCopyLink },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-center">Share</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm font-medium line-clamp-2">{postTitle}</p>
          </div>

          <div className="space-y-2">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className={`${option.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PostShareSheet;
