import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, MessageCircle, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const SafetySettings = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState("nearby");
  const [messagePermission, setMessagePermission] = useState("events");
  const [shareLocation, setShareLocation] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your safety preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success-soft">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <h1 className="text-xl font-bold">Safety & Visibility</h1>
            </div>
          </div>
          <Button onClick={handleSave} size="sm" className="rounded-full">
            Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Map Visibility */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Who can see you on the map?</Label>
          </div>
          <RadioGroup value={visibility} onValueChange={setVisibility}>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              visibility === "stealth" ? "border-success bg-success-soft" : "border-border bg-card"
            }`}>
              <RadioGroupItem value="stealth" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Stealth (Invisible)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse anonymously. You won't appear on the map.
                </p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              visibility === "nearby" ? "border-success bg-success-soft" : "border-border bg-card"
            }`}>
              <RadioGroupItem value="nearby" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Nearby Only (Approximate)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Show your general area, not exact location. Recommended.
                </p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              visibility === "visible" ? "border-success bg-success-soft" : "border-border bg-card"
            }`}>
              <RadioGroupItem value="visible" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Visible (Exact Pin)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Recommended for hosts. Others see your precise location.
                </p>
              </div>
            </label>
          </RadioGroup>
        </div>

        {/* Message Permissions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Who can message you?</Label>
          </div>
          <RadioGroup value={messagePermission} onValueChange={setMessagePermission}>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              messagePermission === "events" ? "border-success bg-success-soft" : "border-border bg-card"
            }`}>
              <RadioGroupItem value="events" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Events & Groups Only</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Only people in the same event or group. Recommended.
                </p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              messagePermission === "anyone" ? "border-success bg-success-soft" : "border-border bg-card"
            }`}>
              <RadioGroupItem value="anyone" className="mt-1" />
              <div className="flex-1">
                <p className="font-medium">Anyone Nearby</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Anyone within your radius can send connection requests.
                </p>
              </div>
            </label>
          </RadioGroup>
        </div>

        {/* Location Sharing */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
          <div className="flex items-start gap-3 flex-1">
            <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <Label htmlFor="location">Share Live Location</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Update your position in real-time for accurate pins
              </p>
            </div>
          </div>
          <Switch
            id="location"
            checked={shareLocation}
            onCheckedChange={setShareLocation}
          />
        </div>

        {/* Trusted Contacts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Trusted Contacts</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            These people will be notified if you activate SOS
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">JS</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Jane Smith</p>
                <p className="text-xs text-muted-foreground">+1 234 567 8900</p>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-full">
            Add Trusted Contact
          </Button>
        </div>

        {/* Safety Tips */}
        <div className="bg-info-soft border border-info/20 rounded-xl p-4">
          <h3 className="font-semibold text-info mb-2">Safety Tips</h3>
          <ul className="space-y-1 text-sm text-info">
            <li>• Always meet in public places first</li>
            <li>• Tell someone where you're going</li>
            <li>• Trust your instincts</li>
            <li>• Use in-app chat before sharing personal info</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetySettings;
