import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    newEvents: true,
    nearbyActivity: true,
    chatMessages: true,
    eventReminders: true,
    rideUpdates: true,
    helpRequests: false,
    sosAlerts: true,
    weeklyDigest: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary-soft">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold">Notifications</h1>
            </div>
          </div>
          <Button onClick={handleSave} size="sm" className="rounded-full">
            Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Activity Notifications */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Activity</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="newEvents">New Events Nearby</Label>
              <p className="text-xs text-muted-foreground mt-1">
                When someone posts an event in your area
              </p>
            </div>
            <Switch
              id="newEvents"
              checked={settings.newEvents}
              onCheckedChange={() => handleToggle("newEvents")}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="nearbyActivity">Nearby Activity</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Interesting happenings in your radius
              </p>
            </div>
            <Switch
              id="nearbyActivity"
              checked={settings.nearbyActivity}
              onCheckedChange={() => handleToggle("nearbyActivity")}
            />
          </div>
        </div>

        {/* Communication */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Communication</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="chatMessages">Chat Messages</Label>
              <p className="text-xs text-muted-foreground mt-1">
                New messages in event or direct chats
              </p>
            </div>
            <Switch
              id="chatMessages"
              checked={settings.chatMessages}
              onCheckedChange={() => handleToggle("chatMessages")}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="eventReminders">Event Reminders</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Reminders 30 minutes before events
              </p>
            </div>
            <Switch
              id="eventReminders"
              checked={settings.eventReminders}
              onCheckedChange={() => handleToggle("eventReminders")}
            />
          </div>
        </div>

        {/* Rides & Help */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Rides & Help</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="rideUpdates">Ride Updates</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Ride confirmations and changes
              </p>
            </div>
            <Switch
              id="rideUpdates"
              checked={settings.rideUpdates}
              onCheckedChange={() => handleToggle("rideUpdates")}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="helpRequests">Community Help Requests</Label>
              <p className="text-xs text-muted-foreground mt-1">
                When someone nearby needs help
              </p>
            </div>
            <Switch
              id="helpRequests"
              checked={settings.helpRequests}
              onCheckedChange={() => handleToggle("helpRequests")}
            />
          </div>
        </div>

        {/* Safety */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Safety</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-danger-soft border border-danger/20">
            <div className="flex-1">
              <Label htmlFor="sosAlerts" className="text-danger">SOS Alerts</Label>
              <p className="text-xs text-danger mt-1">
                When a trusted contact activates SOS
              </p>
            </div>
            <Switch
              id="sosAlerts"
              checked={settings.sosAlerts}
              onCheckedChange={() => handleToggle("sosAlerts")}
            />
          </div>
        </div>

        {/* Digest */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Digest</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex-1">
              <Label htmlFor="weeklyDigest">Weekly Digest</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Summary of events and activity every week
              </p>
            </div>
            <Switch
              id="weeklyDigest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleToggle("weeklyDigest")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
