import { Pin } from "@/pages/Map";
import { MapPin, Users, Calendar, Car, HandHeart, Megaphone, AlertCircle } from "lucide-react";

interface MapViewProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

const MapView = ({ pins, onPinClick }: MapViewProps) => {
  const getPinIcon = (type: Pin["type"]) => {
    switch (type) {
      case "meet":
        return Users;
      case "event":
        return Calendar;
      case "ride":
        return Car;
      case "help":
        return HandHeart;
      case "sos":
        return AlertCircle;
      case "news":
        return Megaphone;
      default:
        return MapPin;
    }
  };

  const getPinColor = (type: Pin["type"]) => {
    switch (type) {
      case "meet":
        return "bg-primary";
      case "event":
        return "bg-secondary";
      case "ride":
        return "bg-info";
      case "help":
        return "bg-success";
      case "sos":
        return "bg-danger animate-pulse";
      case "news":
        return "bg-news";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-primary-soft/20 via-background to-info-soft/10 relative overflow-hidden">
      {/* Map-like background with streets */}
      <div className="absolute inset-0 opacity-[0.15]">
        {/* Vertical streets */}
        <div className="absolute top-0 bottom-0 left-[20%] w-[2px] bg-border" />
        <div className="absolute top-0 bottom-0 left-[40%] w-[3px] bg-border" />
        <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-border" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-border" />
        
        {/* Horizontal streets */}
        <div className="absolute left-0 right-0 top-[25%] h-[2px] bg-border" />
        <div className="absolute left-0 right-0 top-[45%] h-[3px] bg-border" />
        <div className="absolute left-0 right-0 top-[65%] h-[2px] bg-border" />
        <div className="absolute left-0 right-0 top-[85%] h-[2px] bg-border" />
      </div>
      
      {/* Park areas */}
      <div className="absolute top-[10%] left-[10%] w-24 h-24 rounded-full bg-success/5 blur-2xl" />
      <div className="absolute bottom-[15%] right-[15%] w-32 h-32 rounded-full bg-success/5 blur-2xl" />
      
      {/* Water body */}
      <div className="absolute top-[40%] right-[5%] w-28 h-20 rounded-3xl bg-info/10 blur-xl" />

      {/* Map pins */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {pins.map((pin, index) => {
          const Icon = getPinIcon(pin.type);
          const colorClass = getPinColor(pin.type);
          
          // Position pins in a scattered pattern
          const positions = [
            { top: "30%", left: "40%" },
            { top: "50%", left: "60%" },
            { top: "40%", left: "25%" },
            { top: "60%", left: "45%" },
            { top: "35%", left: "70%" },
          ];
          
          const position = positions[index % positions.length];
          
          return (
            <button
              key={pin.id}
              onClick={() => onPinClick(pin)}
              className="absolute transform -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in duration-300"
              style={{
                top: position.top,
                left: position.left,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative group">
                {/* Pin shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-foreground/20 rounded-full blur-sm" />
                
                {/* Pin body */}
                <div className={`${colorClass} text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200 relative`}>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  
                  {/* Pulse effect for SOS */}
                  {pin.type === "sos" && (
                    <div className="absolute inset-0 rounded-full bg-danger animate-ping opacity-75" />
                  )}
                </div>
                
                {/* Hover label */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-card border border-border rounded-lg px-3 py-1.5 shadow-md whitespace-nowrap">
                    <p className="text-sm font-medium">{pin.title}</p>
                    <p className="text-xs text-muted-foreground">{pin.distance}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Location indicator (user's position) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" style={{ width: '100px', height: '100px', margin: '-35px' }} />
          <div className="relative w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
