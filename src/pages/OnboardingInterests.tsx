import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const interests = [
  "Sports", "Food & Dining", "Nightlife", "Study", "Co-working",
  "Travel", "Volunteering", "Music", "Arts", "Gaming",
  "Fitness", "Books", "Tech", "Photography", "Outdoors"
];

const OnboardingInterests = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selected.length >= 3) {
      navigate("/onboarding/safety");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Interests
          </h1>
          <p className="text-text-secondary">
            Pick at least 3 to help us connect you with the right people
          </p>
        </div>

        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => {
              const isSelected = selected.includes(interest);
              
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border hover:border-primary/30"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <div className="text-center text-sm text-muted-foreground">
            {selected.length} selected {selected.length >= 3 ? "✓" : `(${3 - selected.length} more needed)`}
          </div>
          <Button
            onClick={handleContinue}
            disabled={selected.length < 3}
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

export default OnboardingInterests;
