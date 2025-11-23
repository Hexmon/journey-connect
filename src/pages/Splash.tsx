import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft flex flex-col items-center justify-center p-6">
      <div className="animate-in fade-in zoom-in duration-700">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <MapPin className="h-24 w-24 text-primary relative" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="mt-8 text-4xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        Journey
      </h1>
      
      <p className="mt-4 text-lg text-text-secondary text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        Instantly plug into people, events and help around you
      </p>
    </div>
  );
};

export default Splash;
