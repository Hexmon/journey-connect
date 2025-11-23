import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon, Moon, Globe, Smartphone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-soft">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Appearance */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Appearance</h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 flex-1">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently using light theme
                </p>
              </div>
            </div>
            <Switch id="darkMode" />
          </div>
        </div>

        {/* Language & Region */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Language & Region</h2>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <Label>Language</Label>
                <p className="text-xs text-muted-foreground mt-1">English</p>
              </div>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        </div>

        {/* Data & Storage */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Data & Storage</h2>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <Label>Cache & Data</Label>
                <p className="text-xs text-muted-foreground mt-1">128 MB used</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Clear</Button>
          </button>
        </div>

        {/* Account */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Account</h2>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <div className="text-left">
              <Label>Email</Label>
              <p className="text-xs text-muted-foreground mt-1">john.doe@example.com</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <div className="text-left">
              <Label>Password</Label>
              <p className="text-xs text-muted-foreground mt-1">••••••••</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Legal</h2>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <Label>Terms of Service</Label>
            <span className="text-muted-foreground">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <Label>Privacy Policy</Label>
            <span className="text-muted-foreground">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <Label>Community Guidelines</Label>
            <span className="text-muted-foreground">›</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3 pt-4">
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
          
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-danger-soft border border-danger/20 hover:border-danger/50 transition-all">
            <Trash2 className="h-5 w-5 text-destructive" />
            <div className="text-left flex-1">
              <Label className="text-destructive">Delete Account</Label>
              <p className="text-xs text-destructive mt-1">
                Permanently delete your account and all data
              </p>
            </div>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground py-4">
          Journey v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Settings;
