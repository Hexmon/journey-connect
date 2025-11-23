import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Will be connected to Google auth
    navigate("/onboarding/intent");
  };

  const handleAppleSignIn = () => {
    // Will be connected to Apple auth
    navigate("/onboarding/intent");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Map-style background */}
      <div className="absolute inset-0 bg-background">
        {/* Street patterns */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-foreground"
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-foreground"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Park areas */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-primary/5 blur-2xl" />
        <div className="absolute top-[60%] left-[70%] w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
        
        {/* Water body effect */}
        <div className="absolute bottom-[10%] left-[20%] w-48 h-32 rounded-3xl bg-primary/3 blur-xl" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card/95 backdrop-blur-lg border border-border rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                Welcome to Journey
              </h1>
              <p className="text-muted-foreground text-lg">
                Connect with your community
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-14 text-base rounded-2xl border-2 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300"
                size="lg"
              >
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                Continue with Google
              </Button>

              <Button
                onClick={handleAppleSignIn}
                variant="outline"
                className="w-full h-14 text-base rounded-2xl border-2 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300"
                size="lg"
              >
                <FaApple className="mr-3 h-5 w-5" />
                Continue with Apple
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-8 leading-relaxed">
              By continuing, you agree to Journey's<br />
              <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
