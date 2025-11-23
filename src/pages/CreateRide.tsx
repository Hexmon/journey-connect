import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const CreateRide = () => {
  const navigate = useNavigate();
  const [rideType, setRideType] = useState<"offer" | "need">("offer");
  const [seats, setSeats] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ride posted!",
      description: "Your ride share is now visible on the map.",
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
            <div className="p-2 rounded-lg bg-info-soft">
              <Car className="h-5 w-5 text-info" />
            </div>
            <h1 className="text-xl font-bold">Ride Share</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ride Type */}
          <div className="space-y-3">
            <Label>I want to</Label>
            <RadioGroup value={rideType} onValueChange={(v) => setRideType(v as "offer" | "need")}>
              <div className="flex gap-3">
                <label
                  className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    rideType === "offer"
                      ? "border-info bg-info-soft"
                      : "border-border bg-card"
                  }`}
                >
                  <RadioGroupItem value="offer" className="sr-only" />
                  <div className="text-center">
                    <p className="font-semibold">Offer a ride</p>
                    <p className="text-xs text-muted-foreground mt-1">I have a car</p>
                  </div>
                </label>
                <label
                  className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    rideType === "need"
                      ? "border-info bg-info-soft"
                      : "border-border bg-card"
                  }`}
                >
                  <RadioGroupItem value="need" className="sr-only" />
                  <div className="text-center">
                    <p className="font-semibold">Need a ride</p>
                    <p className="text-xs text-muted-foreground mt-1">Looking for lift</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* From Location */}
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="from"
                placeholder="Starting location"
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          {/* To Location */}
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="to"
                placeholder="Destination"
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                className="h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Seats (only if offering) */}
          {rideType === "offer" && (
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats</Label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="7"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
          )}

          {/* Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferences">Preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="E.g., Non-smoking, same gender only, music preferences..."
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any other details riders/drivers should know..."
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 rounded-full text-base">
              Post Ride Share
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRide;
