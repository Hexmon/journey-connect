import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Car, HandHeart, Briefcase, ArrowRight } from "lucide-react";

const intents = [
  { id: "meet", label: "Meet people nearby", icon: Users, color: "primary" },
  { id: "events", label: "Find events & hangouts", icon: Calendar, color: "secondary" },
  { id: "rides", label: "Share rides", icon: Car, color: "info" },
  { id: "help", label: "Ask local community for help", icon: HandHeart, color: "success" },
  { id: "opportunities", label: "Discover local opportunities", icon: Briefcase, color: "news" },
];

const OnboardingIntent = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIntent = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      navigate("/onboarding/interests");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            What brings you here?
          </h1>
          <p className="text-text-secondary">
            Select all that apply. This helps us show relevant content.
          </p>
        </div>

        <div className="space-y-3 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          {intents.map((intent) => {
            const Icon = intent.icon;
            const isSelected = selected.includes(intent.id);
            
            return (
              <button
                key={intent.id}
                onClick={() => toggleIntent(intent.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                  isSelected
                    ? intent.color === "primary"
                      ? "border-primary bg-primary-soft"
                      : intent.color === "secondary"
                      ? "border-secondary bg-secondary-soft"
                      : intent.color === "info"
                      ? "border-info bg-info-soft"
                      : intent.color === "success"
                      ? "border-success bg-success-soft"
                      : "border-news bg-news-soft"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    isSelected
                      ? intent.color === "primary"
                        ? "bg-primary text-primary-foreground"
                        : intent.color === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : intent.color === "info"
                        ? "bg-info text-white"
                        : intent.color === "success"
                        ? "bg-success text-white"
                        : "bg-news text-white"
                      : "bg-muted"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-base font-medium text-left flex-1">
                  {intent.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-6">
          <Button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="w-full h-12 text-base rounded-full"
            size="lg"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingIntent;
