import { Calendar, MapPin, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const mockItems = [
  {
    id: "1",
    type: "event",
    title: "Coffee & Co-work",
    description: "Casual meetup for remote workers",
    time: "Today 2PM",
    distance: "800m away",
    attendees: 5,
  },
  {
    id: "2",
    type: "meet",
    title: "Looking for Cricket Players",
    description: "Need 2 more for Sunday match",
    time: "Sun 5PM",
    distance: "1.2km away",
    attendees: 8,
  },
];

const Discover = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">Discover</h1>
          <p className="text-text-secondary mb-6">What's happening around you</p>

          <div className="space-y-3">
            {mockItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-medium text-primary bg-primary-soft px-3 py-1 rounded-full">
                      {item.type === "event" ? "Event" : "Meet People"}
                    </span>
                    <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                  </div>
                </div>
                
                <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{item.attendees} going</span>
                  </div>
                </div>
                
                <Button className="w-full rounded-full">View Details</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Discover;
