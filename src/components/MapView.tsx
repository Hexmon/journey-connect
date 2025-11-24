import { Pin } from "@/pages/Map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MapViewProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

const MapView = ({ pins, onPinClick }: MapViewProps) => {
  const getPinEmoji = (type: Pin["type"]) => {
    switch (type) {
      case "meet":
        return "🤝";
      case "event":
        return "🎉";
      case "ride":
        return "🚗";
      case "help":
        return "💚";
      case "sos":
        return "🆘";
      case "news":
        return "📰";
      case "friends":
        return "👥";
      default:
        return "📍";
    }
  };

  const getPinColor = (type: Pin["type"]) => {
    switch (type) {
      case "friends":
        return "bg-accent";
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
    <div className="w-full h-full bg-[#f5f5f0] relative overflow-hidden">
      {/* Realistic street grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {/* Major highways */}
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#d4d4d4" strokeWidth="4" />
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#d4d4d4" strokeWidth="4" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#d4d4d4" strokeWidth="4" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#d4d4d4" strokeWidth="4" />
        
        {/* Secondary roads */}
        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#e5e5e5" strokeWidth="2" />
        
        {/* Small streets */}
        <line x1="0" y1="22%" x2="100%" y2="22%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="38%" x2="100%" y2="38%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="57%" x2="100%" y2="57%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="73%" x2="100%" y2="73%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="22%" y1="0" x2="22%" y2="100%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="42%" y1="0" x2="42%" y2="100%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="58%" y1="0" x2="58%" y2="100%" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="78%" y1="0" x2="78%" y2="100%" stroke="#f0f0f0" strokeWidth="1" />
      </svg>

      {/* Park/Green areas */}
      <div className="absolute top-[8%] left-[12%] w-56 h-56 bg-green-200/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]" />
      <div className="absolute top-[55%] right-[18%] w-64 h-64 bg-green-200/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]" />
      <div className="absolute bottom-[3%] left-[35%] w-48 h-48 bg-green-200/30 rounded-[50%_50%_50%_50%/60%_40%_60%_40%]" />

      {/* Water bodies */}
      <div className="absolute top-[35%] right-[8%] w-40 h-32 bg-blue-200/35 rounded-[30%_70%_70%_30%/30%_30%_70%_70%]" />
      <div className="absolute bottom-[20%] left-[8%] w-52 h-40 bg-blue-200/35 rounded-[60%_40%_30%_70%/50%_50%_50%_50%]" />

      {/* Building blocks */}
      <div className="absolute top-[18%] left-[48%] w-20 h-16 bg-gray-300/20 rounded-sm" />
      <div className="absolute top-[25%] left-[75%] w-16 h-20 bg-gray-300/20 rounded-sm" />
      <div className="absolute top-[60%] left-[65%] w-24 h-18 bg-gray-300/20 rounded-sm" />
      <div className="absolute top-[38%] left-[25%] w-14 h-16 bg-gray-300/20 rounded-sm" />
      <div className="absolute bottom-[25%] right-[40%] w-18 h-22 bg-gray-300/20 rounded-sm" />

      {/* Map pins */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {pins.map((pin, index) => {
          const emoji = getPinEmoji(pin.type);
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
                
                {/* Pin body - Show avatars for friends, emoji badges for activities */}
                <div className="relative">
                  {pin.type === "friends" ? (
                    // Friends show real avatars
                    <>
                      <Avatar className="h-14 w-14 border-4 border-accent shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <AvatarImage src={pin.avatarImage} alt={pin.userName} />
                        <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                          {pin.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {/* Active indicator for friends */}
                      {pin.time.includes("now") && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success border-2 border-white rounded-full" />
                      )}
                    </>
                  ) : (
                    // Activities show avatar with emoji badge
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <AvatarImage src={pin.avatarImage} alt={pin.host} />
                        <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                          {pin.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {/* Emoji badge for activity type */}
                      <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${colorClass} border-2 border-white shadow-md flex items-center justify-center text-sm ${pin.type === "sos" ? "animate-pulse" : ""}`}>
                        {emoji}
                      </div>
                      {/* Pulse effect for SOS */}
                      {pin.type === "sos" && (
                        <div className="absolute inset-0 rounded-full bg-danger animate-ping opacity-75" />
                      )}
                    </div>
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
