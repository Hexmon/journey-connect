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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border h-20 flex items-center justify-around px-2 safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[64px]"
          >
            <div
              className={`p-2 rounded-xl transition-colors duration-200 ${
                isActive ? "bg-primary" : "bg-transparent"
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
              className={`text-xs font-medium ${
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
