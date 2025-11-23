import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPins } from "@/data/mockData";

const SavedItems = () => {
  const navigate = useNavigate();
  const savedEvents = mockPins.slice(0, 3);
  const savedPeople = mockPins.slice(3, 5);

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
              <Bookmark className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Saved Items</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-background">
            <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
            <TabsTrigger value="people" className="flex-1">People</TabsTrigger>
            <TabsTrigger value="places" className="flex-1">Places</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="p-6 space-y-3">
            {savedEvents.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-medium text-secondary bg-secondary-soft px-3 py-1 rounded-full">
                      Event
                    </span>
                    <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                  </div>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Bookmark className="h-4 w-4 fill-primary text-primary" />
                  </button>
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
                    <span>{item.attendees}</span>
                  </div>
                </div>
                
                <Button className="w-full rounded-full">View Details</Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="people" className="p-6 space-y-3">
            {savedPeople.map((person) => (
              <div
                key={person.id}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-14 w-14 rounded-full bg-primary-soft flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {person.host.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{person.host}</h3>
                    <p className="text-sm text-muted-foreground">
                      Sports enthusiast • Coffee lover
                    </p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Bookmark className="h-4 w-4 fill-primary text-primary" />
                  </button>
                </div>
                
                <Button variant="outline" className="w-full rounded-full">
                  View Profile
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="places" className="p-6">
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No saved places yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bookmark your favorite spots to find them easily
              </p>
              <Button onClick={() => navigate("/map")} className="rounded-full">
                Explore Map
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SavedItems;
