import { useState } from "react";
import { MapPin, Users, Calendar, Car, HandHeart, Megaphone, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";
import BottomNav from "@/components/BottomNav";
import FilterBar from "@/components/FilterBar";
import PinDetail from "@/components/PinDetail";
import CreatePinSheet from "@/components/CreatePinSheet";

export type PinType = "meet" | "event" | "ride" | "help" | "sos" | "news";

export interface Pin {
  id: string;
  type: PinType;
  title: string;
  description: string;
  distance: string;
  time: string;
  attendees: number;
  host: string;
  location: { lat: number; lng: number };
}

const mockPins: Pin[] = [
  {
    id: "1",
    type: "event",
    title: "Coffee & Co-work",
    description: "Casual meetup for remote workers. Bring your laptop!",
    distance: "800m away",
    time: "Today 2PM",
    attendees: 5,
    host: "Sarah K.",
    location: { lat: 0, lng: 0 },
  },
  {
    id: "2",
    type: "meet",
    title: "Looking for Cricket Players",
    description: "Need 2 more for Sunday match",
    distance: "1.2km away",
    time: "Sun 5PM",
    attendees: 8,
    host: "Rohan M.",
    location: { lat: 0.01, lng: 0.01 },
  },
  {
    id: "3",
    type: "ride",
    title: "Ride to Airport",
    description: "Leaving tomorrow 6AM, 2 seats available",
    distance: "2km away",
    time: "Tomorrow 6AM",
    attendees: 2,
    host: "Mike P.",
    location: { lat: -0.01, lng: 0.01 },
  },
];

const Map = () => {
  const [selectedFilters, setSelectedFilters] = useState<PinType[]>(["meet", "event", "ride", "help", "news"]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [createPinOpen, setCreatePinOpen] = useState(false);
  const [radius, setRadius] = useState(3);

  const filteredPins = mockPins.filter((pin) => selectedFilters.includes(pin.type));

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView pins={filteredPins} onPinClick={setSelectedPin} />
        
        {/* Filter Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <FilterBar
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
            radius={radius}
            onRadiusChange={setRadius}
          />
        </div>

        {/* FAB */}
        <button
          onClick={() => setCreatePinOpen(true)}
          className="absolute bottom-24 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-10 hover:scale-105 active:scale-95"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Pin Detail Sheet */}
      {selectedPin && (
        <PinDetail
          pin={selectedPin}
          open={!!selectedPin}
          onClose={() => setSelectedPin(null)}
        />
      )}

      {/* Create Pin Sheet */}
      <CreatePinSheet
        open={createPinOpen}
        onClose={() => setCreatePinOpen(false)}
      />
    </div>
  );
};

export default Map;
