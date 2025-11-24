import { useState, useEffect, useRef } from "react";
import { MapPin, Users, Calendar, Car, HandHeart, Megaphone, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  avatarImage?: string;
}

import { mockPins } from "@/data/mockData";

const Map = () => {
  const [selectedFilters, setSelectedFilters] = useState<PinType[]>(["meet", "event", "ride", "help", "news", "friends"]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [createPinOpen, setCreatePinOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [radius, setRadius] = useState(3);
  const [showNav, setShowNav] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout>();

  const filteredPins = mockPins.filter((pin) => selectedFilters.includes(pin.type));

  // Auto-hide nav on map interaction
  useEffect(() => {
    if (isInteracting) {
      setShowNav(false);
      
      // Clear existing timeout
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      
      // Show nav again after 3 seconds of no interaction
      hideTimeout.current = setTimeout(() => {
        setShowNav(true);
        setIsInteracting(false);
      }, 3000);
    }
    
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [isInteracting]);

  const handleMapInteraction = () => {
    setIsInteracting(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Map Container */}
      <div 
        className="flex-1 relative" 
        onMouseMove={handleMapInteraction}
        onTouchMove={handleMapInteraction}
        onWheel={handleMapInteraction}
      >
        <MapView pins={filteredPins} onPinClick={setSelectedPin} />

        {/* Left Side Buttons - Filter, Add New, and SOS */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            onClick={() => setFilterOpen(true)}
            className="h-12 w-12 rounded-r-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:translate-x-1 active:scale-95 pl-2"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          
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

      {/* Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Filters & Range</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterBar
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
              radius={radius}
              onRadiusChange={setRadius}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Map;
