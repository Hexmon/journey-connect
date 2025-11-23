import { useState } from "react";
import { Users, Calendar, Car, HandHeart, Megaphone, SlidersHorizontal, X, UserCircle } from "lucide-react";
import { PinType } from "@/pages/Map";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

interface FilterBarProps {
  selectedFilters: PinType[];
  onFiltersChange: (filters: PinType[]) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

const filters = [
  { id: "friends" as PinType, label: "Friends", icon: UserCircle, color: "accent" },
  { id: "meet" as PinType, label: "Meet People", icon: Users, color: "primary" },
  { id: "event" as PinType, label: "Events", icon: Calendar, color: "secondary" },
  { id: "ride" as PinType, label: "Rides", icon: Car, color: "info" },
  { id: "help" as PinType, label: "Help", icon: HandHeart, color: "success" },
  { id: "news" as PinType, label: "News", icon: Megaphone, color: "news" },
];

const FilterBar = ({ selectedFilters, onFiltersChange, radius, onRadiusChange }: FilterBarProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleFilter = (id: PinType) => {
    if (selectedFilters.includes(id)) {
      onFiltersChange(selectedFilters.filter((f) => f !== id));
    } else {
      onFiltersChange([...selectedFilters, id]);
    }
  };

  const clearFilters = () => {
    onFiltersChange([]);
  };

  return (
    <>
      {/* Horizontal scroll filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 bg-card border-border rounded-full h-10 px-4"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>Filters & Radius</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Search Radius: {radius}km
                </label>
                <Slider
                  value={[radius]}
                  onValueChange={(value) => onRadiusChange(value[0])}
                  min={1}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Categories</label>
                  {selectedFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-auto p-0 text-xs"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    const isSelected = selectedFilters.includes(filter.id);
                    
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? filter.color === "accent"
                              ? "border-accent bg-accent/10"
                              : filter.color === "primary"
                              ? "border-primary bg-primary-soft"
                              : filter.color === "secondary"
                              ? "border-secondary bg-secondary-soft"
                              : filter.color === "info"
                              ? "border-info bg-info-soft"
                              : filter.color === "success"
                              ? "border-success bg-success-soft"
                              : "border-news bg-news-soft"
                            : "border-border bg-card"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{filter.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {filters
          .filter((f) => selectedFilters.includes(f.id))
          .map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter.color === "accent"
                    ? "bg-accent text-accent-foreground"
                    : filter.color === "primary"
                    ? "bg-primary text-primary-foreground"
                    : filter.color === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : filter.color === "info"
                    ? "bg-info text-white"
                    : filter.color === "success"
                    ? "bg-success text-white"
                    : "bg-news text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {filter.label}
                <X className="h-3.5 w-3.5 ml-1" />
              </button>
            );
          })}
      </div>
    </>
  );
};

export default FilterBar;
