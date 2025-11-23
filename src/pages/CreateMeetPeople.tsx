import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const interests = [
  "Coffee", "Walk", "Study", "Co-work", "Sports", "Food", 
  "Gaming", "Music", "Movies", "Fitness", "Travel", "Art"
];

const CreateMeetPeople = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [availableNow, setAvailableNow] = useState(true);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated!",
      description: "You're now visible to nearby people looking to connect.",
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
            <div className="p-2 rounded-lg bg-primary-soft">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Meet People</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Card */}
          <div className="bg-primary-soft border border-primary/20 rounded-xl p-4">
            <p className="text-sm text-primary">
              Set your presence to let nearby people know you're open to connect.
              Your exact location won't be shared.
            </p>
          </div>

          {/* Available Now */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="available">I'm available now</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Show as active on the map
              </p>
            </div>
            <Switch
              id="available"
              checked={availableNow}
              onCheckedChange={setAvailableNow}
            />
          </div>

          {/* About You */}
          <div className="space-y-2">
            <Label htmlFor="about">About You</Label>
            <Textarea
              id="about"
              placeholder="Tell people a bit about yourself... New in city? Looking for friends? Interests?"
              className="rounded-xl resize-none"
              rows={4}
            />
          </div>

          {/* Open to */}
          <div className="space-y-3">
            <Label>I'm open to</Label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedInterests.includes(interest)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary-soft"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Time Available */}
          <div className="space-y-2">
            <Label htmlFor="timeframe">When are you available?</Label>
            <Input
              id="timeframe"
              placeholder="E.g., Next 2 hours, This evening, Weekends..."
              className="h-12 rounded-xl"
            />
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <Label>Preferences</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-all">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Public places only</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-all">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Group hangouts preferred</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-all">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Same gender connections only</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 rounded-full text-base">
              Set Presence & Be Visible
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetPeople;
