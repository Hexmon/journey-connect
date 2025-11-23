import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, ArrowRight } from "lucide-react";

const OnboardingUsername = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Simulated unavailable usernames
  const unavailableUsernames = ["john", "jane", "admin", "user", "test", "alex", "sarah", "mike"];

  const checkUsername = (value: string) => {
    if (value.length < 3) {
      setIsAvailable(null);
      setSuggestions([]);
      return;
    }

    setChecking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const available = !unavailableUsernames.includes(value.toLowerCase());
      setIsAvailable(available);
      
      if (!available) {
        // Generate suggestions
        const newSuggestions = [
          `${value}_${Math.floor(Math.random() * 100)}`,
          `${value}${Math.floor(Math.random() * 1000)}`,
          `${value}_official`,
          `the_${value}`,
        ];
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
      
      setChecking(false);
    }, 500);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    setUsername(value);
    setIsAvailable(null);
    setSuggestions([]);
  };

  const handleCheck = () => {
    if (username.length >= 3) {
      checkUsername(username);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setUsername(suggestion);
    setIsAvailable(true);
    setSuggestions([]);
  };

  const handleContinue = () => {
    if (isAvailable) {
      navigate("/map");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full justify-center">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose your username
          </h1>
          <p className="text-muted-foreground">
            This is how others will see you in the community
          </p>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                className="h-12 pr-12 text-base"
                maxLength={20}
              />
              {isAvailable !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isAvailable ? (
                    <Check className="h-5 w-5 text-success" />
                  ) : (
                    <X className="h-5 w-5 text-destructive" />
                  )}
                </div>
              )}
            </div>
            
            {username.length > 0 && username.length < 3 && (
              <p className="text-sm text-muted-foreground">
                Username must be at least 3 characters
              </p>
            )}
            
            {isAvailable === false && (
              <p className="text-sm text-destructive">
                This username is already taken
              </p>
            )}
            
            {isAvailable === true && (
              <p className="text-sm text-success">
                Great! This username is available
              </p>
            )}
          </div>

          {username.length >= 3 && isAvailable === null && (
            <Button
              onClick={handleCheck}
              disabled={checking}
              variant="outline"
              className="w-full h-12"
            >
              {checking ? "Checking..." : "Check Availability"}
            </Button>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Suggested usernames:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all text-sm font-medium text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 mt-auto">
          <Button
            onClick={handleContinue}
            disabled={!isAvailable}
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

export default OnboardingUsername;
