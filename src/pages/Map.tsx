import { useState } from "react";
import { MapPin, Users, Calendar, Car, HandHeart, Megaphone, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";
import BottomNav from "@/components/BottomNav";
import FilterBar from "@/components/FilterBar";
import PinDetail from "@/components/PinDetail";
import CreatePinSheet from "@/components/CreatePinSheet";
import SOSButton from "@/components/SOSButton";

export type PinType = "meet" | "event" | "ride" | "help" | "sos" | "news" | "friends";

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
  avatar?: string;
  userName?: string;
}

import { mockPins } from "@/data/mockData";

const Map = () => {
  const [selectedFilters, setSelectedFilters] = useState<PinType[]>(["meet", "event", "ride", "help", "news", "friends"]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [createPinOpen, setCreatePinOpen] = useState(false);
  const [radius, setRadius] = useState(3);
  const [showNav, setShowNav] = useState(true);
  const [lastTap, setLastTap] = useState(0);

  const filteredPins = mockPins.filter((pin) => selectedFilters.includes(pin.type));

  const handleMapTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;
    setLastTap(now);
    
    if (timeSinceLastTap < 300) {
      // Double tap detected
      setShowNav(!showNav);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Map Container */}
      <div className="flex-1 relative" onClick={handleMapTap}>
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

        {/* FAB and SOS - Attached to left side */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            onClick={() => setCreatePinOpen(true)}
            className="h-12 w-12 rounded-r-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:translate-x-1 active:scale-95 pl-2"
          >
            <Plus className="h-5 w-5" />
          </button>
          
          <SOSButton />
        </div>
      </div>

      {/* Bottom Navigation - Conditionally shown */}
      <div className={`transition-all duration-300 ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'}`}>
        <BottomNav />
      </div>

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
