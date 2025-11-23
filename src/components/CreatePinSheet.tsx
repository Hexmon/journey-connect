import { useState } from "react";
import { X, Users, Calendar, Car, HandHeart, Briefcase, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PinType } from "@/pages/Map";

interface CreatePinSheetProps {
  open: boolean;
  onClose: () => void;
}

const pinTypes = [
  { id: "event" as PinType, label: "Event / Hangout", icon: Calendar, color: "secondary", description: "Organize a social gathering" },
  { id: "meet" as PinType, label: "Meet People", icon: Users, color: "primary", description: "Be open to connect nearby" },
  { id: "ride" as PinType, label: "Ride Share", icon: Car, color: "info", description: "Offer or find a ride" },
  { id: "help" as PinType, label: "Community Help", icon: HandHeart, color: "success", description: "Ask for or offer help" },
  { id: "news" as PinType, label: "Local Opportunity", icon: Briefcase, color: "news", description: "Share job or opportunity" },
  { id: "news" as PinType, label: "News / Update", icon: Megaphone, color: "news", description: "Share local news" },
];

const CreatePinSheet = ({ open, onClose }: CreatePinSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl">Create a Pin</SheetTitle>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground text-left mt-2">
            Choose what you'd like to share with your community
          </p>
        </SheetHeader>

        <div className="p-6 space-y-3 overflow-y-auto" style={{ maxHeight: "calc(85vh - 100px)" }}>
          {pinTypes.map((type) => {
            const Icon = type.icon;
            
            return (
              <button
                key={`${type.id}-${type.label}`}
                onClick={() => {
                  // Navigate to create form for this type
                  onClose();
                }}
                className="w-full p-4 rounded-2xl border-2 border-border bg-card hover:border-primary/30 transition-all duration-200 flex items-center gap-4 text-left"
              >
                <div
                  className={`p-3 rounded-xl ${
                    type.color === "primary"
                      ? "bg-primary-soft"
                      : type.color === "secondary"
                      ? "bg-secondary-soft"
                      : type.color === "info"
                      ? "bg-info-soft"
                      : type.color === "success"
                      ? "bg-success-soft"
                      : "bg-news-soft"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      type.color === "primary"
                        ? "text-primary"
                        : type.color === "secondary"
                        ? "text-secondary"
                        : type.color === "info"
                        ? "text-info"
                        : type.color === "success"
                        ? "text-success"
                        : "text-news"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{type.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {type.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePinSheet;
