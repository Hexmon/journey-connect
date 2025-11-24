import { MapPin, Compass, MessageCircle, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "map", label: "Map", icon: MapPin, path: "/map" },
    { id: "discover", label: "Discover", icon: Compass, path: "/discover" },
    { id: "chats", label: "Chats", icon: MessageCircle, path: "/chats" },
    { id: "forum", label: "Community", icon: Users, path: "/forum" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-background/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] h-20 flex items-center justify-around px-2 transition-all duration-300 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-spring min-w-[64px] tap-scale"
          >
            <div
              className={`p-2 rounded-xl transition-spring ${
                isActive ? "bg-gradient-instagram" : "bg-transparent"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                }`}
                strokeWidth={2}
              />
            </div>
            <span
              className={`text-xs font-medium transition-smooth ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
