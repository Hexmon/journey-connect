import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Users, Coffee, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPins } from "@/data/mockData";

const supportOptions = [
  {
    id: "chat",
    icon: MessageCircle,
    title: "Just chat online",
    description: "Connect with a verified listener",
    color: "primary",
  },
  {
    id: "hangout",
    icon: Coffee,
    title: "Small public hangout",
    description: "Join a quiet café or park meetup",
    color: "secondary",
  },
  {
    id: "group",
    icon: Users,
    title: "Group activity",
    description: "Join a supportive group event",
    color: "success",
  },
  {
    id: "helpline",
    icon: Phone,
    title: "Professional support",
    description: "Connect with helpline resources",
    color: "info",
  },
];

const LonelyMode = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const safeEvents = mockPins.filter(pin => 
    pin.type === "event" || pin.type === "meet"
  ).slice(0, 3);

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
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Support & Connection</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Reassuring Message */}
        <div className="bg-gradient-to-br from-primary-soft to-success-soft rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">You're not alone</h2>
          <p className="text-sm text-text-secondary">
            We all feel lonely sometimes. Here are some safe, supportive ways to connect.
          </p>
        </div>

        {/* Support Options */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">What feels comfortable right now?</h3>
          {supportOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? `border-${option.color} bg-${option.color}-soft`
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      option.color === "primary"
                        ? "bg-primary-soft"
                        : option.color === "secondary"
                        ? "bg-secondary-soft"
                        : option.color === "success"
                        ? "bg-success-soft"
                        : "bg-info-soft"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        option.color === "primary"
                          ? "text-primary"
                          : option.color === "secondary"
                          ? "text-secondary"
                          : option.color === "success"
                          ? "text-success"
                          : "text-info"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{option.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Suggested Safe Events */}
        {selectedOption === "hangout" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Safe events near you</h3>
            {safeEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-secondary bg-secondary-soft px-3 py-1 rounded-full">
                      Safe Space
                    </span>
                    <h4 className="font-semibold mt-2">{event.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    View Details
                  </Button>
                  <Button size="sm" className="rounded-full">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Professional Helplines */}
        {selectedOption === "helpline" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Support Resources</h3>
            <div className="p-4 rounded-xl bg-info-soft border border-info/20">
              <h4 className="font-semibold text-info mb-2">Crisis Helpline</h4>
              <p className="text-sm mb-3">24/7 confidential support</p>
              <Button className="w-full rounded-full">Call Now</Button>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-2">Mental Health Support</h4>
              <p className="text-sm mb-3">Free counseling services</p>
              <Button variant="outline" className="w-full rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Note */}
        <div className="bg-muted rounded-xl p-4">
          <p className="text-xs text-muted-foreground text-center">
            All connections are verified for safety. Your privacy is protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LonelyMode;
