import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HandHeart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const helpTypes = [
  { value: "info", label: "Information / Directions" },
  { value: "borrow", label: "Borrow Something" },
  { value: "recommendation", label: "Local Recommendation" },
  { value: "other", label: "Other" },
];

const CreateHelp = () => {
  const navigate = useNavigate();
  const [helpType, setHelpType] = useState("info");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Help request posted!",
      description: "Nearby community members will see your request.",
    });
    navigate("/map");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-success-soft">
              <HandHeart className="h-5 w-5 text-success" />
            </div>
            <h1 className="text-xl font-bold">Community Help</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Help Type */}
          <div className="space-y-3">
            <Label>What kind of help do you need?</Label>
            <RadioGroup value={helpType} onValueChange={setHelpType}>
              <div className="grid grid-cols-2 gap-3">
                {helpTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      helpType === type.value
                        ? "border-success bg-success-soft"
                        : "border-border bg-card"
                    }`}
                  >
                    <RadioGroupItem value={type.value} className="sr-only" />
                    <p className="text-sm font-medium">{type.label}</p>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief description of what you need"
              className="h-12 rounded-xl"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Details</Label>
            <Textarea
              id="description"
              placeholder="Explain what help you need and any important details..."
              className="rounded-xl resize-none"
              rows={4}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location (approximate)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Tap to set on map"
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-3">
            <Label>How urgent is this?</Label>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 p-3 rounded-xl border-2 border-border bg-card hover:border-primary/30 transition-all"
              >
                <p className="text-sm font-medium">Not urgent</p>
                <p className="text-xs text-muted-foreground">Few days</p>
              </button>
              <button
                type="button"
                className="flex-1 p-3 rounded-xl border-2 border-border bg-card hover:border-primary/30 transition-all"
              >
                <p className="text-sm font-medium">Today</p>
                <p className="text-xs text-muted-foreground">Within 24h</p>
              </button>
              <button
                type="button"
                className="flex-1 p-3 rounded-xl border-2 border-border bg-card hover:border-primary/30 transition-all"
              >
                <p className="text-sm font-medium">ASAP</p>
                <p className="text-xs text-muted-foreground">Right now</p>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 rounded-full text-base">
              Post Help Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHelp;
