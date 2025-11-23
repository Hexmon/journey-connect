import { Settings, Shield, Bookmark, History, Bell, HelpCircle, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Shield, label: "Safety & Visibility", color: "success" },
  { icon: Bookmark, label: "Saved Items", color: "primary" },
  { icon: History, label: "My Activity", color: "primary" },
  { icon: Bell, label: "Notifications", color: "primary" },
  { icon: Settings, label: "Settings", color: "primary" },
  { icon: HelpCircle, label: "Help & Support", color: "primary" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-primary-soft to-secondary-soft rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-text-secondary">New in city • 5 interests</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-full bg-card">
              Edit Profile
            </Button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all duration-200"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      item.color === "success" ? "bg-success-soft" : "bg-primary-soft"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        item.color === "success" ? "text-success" : "text-primary"
                      }`}
                    />
                  </div>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                </button>
              );
            })}

            <button className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-destructive/30 transition-all duration-200">
              <div className="p-2 rounded-lg bg-danger-soft">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <span className="flex-1 text-left font-medium text-destructive">Log Out</span>
            </button>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
