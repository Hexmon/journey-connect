import { useState } from "react";
import { AlertCircle, Phone, MapPin, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const SOSButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  let holdTimer: NodeJS.Timeout;
  let progressInterval: NodeJS.Timeout;

  const startHold = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    progressInterval = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (isActivated) {
            deactivateSOS();
          }
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    holdTimer = setTimeout(() => {
      if (!isActivated) {
        setShowConfirm(true);
      }
      setIsHolding(false);
      setHoldProgress(0);
    }, 1000);
  };

  const cancelHold = () => {
    clearTimeout(holdTimer);
    clearInterval(progressInterval);
    setIsHolding(false);
    setHoldProgress(0);
  };

  const activateSOS = () => {
    setIsActivated(true);
    setShowConfirm(false);
    toast.error("SOS Alert Sent", {
      description: "Your trusted contacts and nearby helpers have been notified.",
    });
  };

  const deactivateSOS = () => {
    setIsActivated(false);
    toast.success("SOS Deactivated", {
      description: "You've marked yourself as safe.",
    });
  };

  if (isActivated) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-danger text-white z-50 p-4 animate-pulse">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6" />
            <div>
              <p className="font-bold">SOS Active</p>
              <p className="text-sm opacity-90">Help is on the way</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            className="relative overflow-hidden"
          >
            {isHolding ? (
              <div
                className="absolute inset-0 bg-success transition-all"
                style={{ width: `${holdProgress}%` }}
              />
            ) : null}
            <span className="relative z-10">Hold to Mark Safe</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className="fixed left-0 top-[55%] h-12 w-12 rounded-r-full bg-danger text-white shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center z-20 relative overflow-hidden hover:translate-x-1 pl-2"
      >
        {isHolding && (
          <div
            className="absolute inset-0 bg-danger-soft transition-all"
            style={{ 
              height: `${holdProgress}%`,
              bottom: 0,
              top: 'auto'
            }}
          />
        )}
        <AlertCircle className="h-6 w-6 relative z-10" strokeWidth={2.5} />
        {isHolding && (
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
        )}
      </button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 text-danger">
              <AlertCircle className="h-6 w-6" />
              Activate SOS Signal?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-danger-soft border-2 border-danger/30 rounded-xl p-4">
              <p className="text-sm text-foreground">
                This will alert nearby helpers and your trusted contacts.
              </p>
              <p className="text-sm text-text-secondary mt-2">
                <strong>For police/ambulance emergencies, call 911 directly.</strong>
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-sm">What type of help do you need?</p>
              <div className="grid gap-2">
                {["I feel unsafe", "I'm lost/stranded", "Health concern (non-emergency)", "Other"].map(
                  (type) => (
                    <button
                      key={type}
                      className="p-3 rounded-xl border-2 border-border hover:border-danger/50 transition-all text-left text-sm"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-sm">Who to alert:</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-muted cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Trusted contacts (3 people)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl bg-muted cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Nearby verified helpers</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={activateSOS}
              className="flex-1 rounded-full bg-danger hover:bg-danger/90"
            >
              Activate SOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
