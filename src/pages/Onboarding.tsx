import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { MapPin, User } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-[#f5f5f0]">
      {/* Realistic Map Background */}
      <div className="absolute inset-0">
        {/* Main road network */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {/* Major highways */}
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#d4d4d4" strokeWidth="4" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#d4d4d4" strokeWidth="4" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#d4d4d4" strokeWidth="4" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#d4d4d4" strokeWidth="4" />
          
          {/* Secondary roads */}
          <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#e5e5e5" strokeWidth="2" />
          <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#e5e5e5" strokeWidth="2" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#e5e5e5" strokeWidth="2" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#e5e5e5" strokeWidth="2" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#e5e5e5" strokeWidth="2" />
        </svg>

        {/* Park/Green areas */}
        <div className="absolute top-[10%] left-[15%] w-48 h-48 bg-green-200/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]" />
        <div className="absolute top-[55%] right-[20%] w-56 h-56 bg-green-200/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]" />
        <div className="absolute bottom-[5%] left-[35%] w-40 h-40 bg-green-200/20 rounded-[50%_50%_50%_50%/60%_40%_60%_40%]" />

        {/* Water bodies */}
        <div className="absolute top-[35%] right-[10%] w-32 h-24 bg-blue-200/25 rounded-[30%_70%_70%_30%/30%_30%_70%_70%]" />
        <div className="absolute bottom-[25%] left-[10%] w-44 h-36 bg-blue-200/25 rounded-[60%_40%_30%_70%/50%_50%_50%_50%]" />

        {/* Building blocks */}
        <div className="absolute top-[20%] left-[50%] w-16 h-12 bg-gray-300/15 rounded-sm" />
        <div className="absolute top-[65%] left-[70%] w-20 h-16 bg-gray-300/15 rounded-sm" />
        <div className="absolute top-[40%] left-[30%] w-12 h-14 bg-gray-300/15 rounded-sm" />

        {/* Sample location markers */}
        <div className="absolute top-[25%] left-[20%] flex flex-col items-center animate-in fade-in duration-1000 delay-300">
          <div className="w-12 h-12 rounded-full bg-primary border-4 border-white shadow-lg overflow-hidden">
            <User className="w-full h-full p-2 text-white" />
          </div>
          <div className="mt-1 text-xs font-bold text-foreground bg-white/90 px-2 py-1 rounded-full shadow">
            NEARBY
          </div>
        </div>

        <div className="absolute top-[45%] right-[25%] flex flex-col items-center animate-in fade-in duration-1000 delay-500">
          <div className="w-12 h-12 rounded-full bg-secondary border-4 border-white shadow-lg overflow-hidden">
            <User className="w-full h-full p-2 text-white" />
          </div>
          <div className="mt-1 text-xs font-bold text-foreground bg-white/90 px-2 py-1 rounded-full shadow">
            2 KM
          </div>
        </div>

        <div className="absolute bottom-[40%] left-[60%] flex flex-col items-center animate-in fade-in duration-1000 delay-700">
          <div className="w-10 h-10 rounded-full bg-accent border-4 border-white shadow-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Current location indicator */}
        <div className="absolute bottom-[45%] left-[45%] animate-in fade-in duration-1000">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400 animate-ping" />
          </div>
        </div>
      </div>

      {/* Blur overlay for top portion */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 backdrop-blur-[2px]" />

      {/* Auth Card - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 animate-in slide-in-from-bottom-4 duration-700">
        <div className="bg-card/98 backdrop-blur-2xl border-t border-border rounded-t-3xl px-6 pt-8 pb-8 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome to Journey
              </h1>
              <p className="text-muted-foreground">
                Connect with people around you
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-14 text-base rounded-2xl border-2 hover:bg-accent/50 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
                size="lg"
              >
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                Continue with Google
              </Button>

              <Button
                onClick={handleAppleSignIn}
                variant="outline"
                className="w-full h-14 text-base rounded-2xl border-2 hover:bg-accent/50 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
                size="lg"
              >
                <FaApple className="mr-3 h-5 w-5" />
                Continue with Apple
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-6 leading-relaxed">
              By continuing, you agree to Journey's{" "}
              <span className="text-primary">Terms</span> and{" "}
              <span className="text-primary">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
