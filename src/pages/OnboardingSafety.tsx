import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Users, Shield, ArrowRight } from "lucide-react";

const visibilityOptions = [
  {
    id: "stealth",
    label: "Stealth (Invisible)",
    description: "Browse without being seen on the map",
    icon: EyeOff,
  },
  {
    id: "nearby",
    label: "Nearby only",
    description: "Show approximate area, not exact location",
    icon: Users,
    recommended: true,
  },
  {
    id: "visible",
    label: "Visible",
    description: "Show exact location (for hosting events)",
    icon: Eye,
  },
];

const OnboardingSafety = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState("nearby");
  const [allowMessages, setAllowMessages] = useState(false);

  const handleFinish = () => {
    navigate("/map");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-success-soft rounded-full">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">Your Safety First</span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy & Visibility
          </h1>
          <p className="text-text-secondary">
            Control who can see you and reach out to you
          </p>
        </div>

        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Who can see you on the map?</h3>
            {visibilityOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = visibility === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setVisibility(option.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {option.recommended && (
                          <span className="px-2 py-0.5 text-xs bg-success text-white rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Who can message you?</h3>
            <button
              onClick={() => setAllowMessages(!allowMessages)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                allowMessages
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium block">Allow direct messages</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    People can message you without being in same event
                  </p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    allowMessages ? "bg-primary" : "bg-border"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      allowMessages ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </div>
            </button>
            <p className="text-xs text-muted-foreground px-1">
              Recommended OFF for maximum safety. You can always chat within events you join.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={handleFinish}
            className="w-full h-12 text-base rounded-full"
            size="lg"
          >
            Finish Setup
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSafety;
