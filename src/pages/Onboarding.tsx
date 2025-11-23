import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, ArrowRight } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (name && email) {
      navigate("/onboarding/intent");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full justify-center">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Journey
          </h1>
          <p className="text-text-secondary">
            Let's get you started with a few quick details
          </p>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleContinue}
              disabled={!name || !email}
              className="w-full h-12 text-base rounded-full"
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-full">
              <Phone className="mr-2 h-4 w-4" />
              Phone
            </Button>
            <Button variant="outline" className="h-12 rounded-full">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-8">
        By continuing, you agree to Journey's Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default Onboarding;
