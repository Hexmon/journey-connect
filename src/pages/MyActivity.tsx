import { useNavigate } from "react-router-dom";
import { ArrowLeft, History, Calendar, Users, Car, HandHeart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: "1",
    type: "event",
    icon: Calendar,
    color: "secondary",
    title: "Coffee Meetup at Central Café",
    date: "Yesterday",
    status: "Attended",
  },
  {
    id: "2",
    type: "ride",
    icon: Car,
    color: "info",
    title: "Ride to Downtown",
    date: "2 days ago",
    status: "Completed",
  },
  {
    id: "3",
    type: "help",
    icon: HandHeart,
    color: "success",
    title: "Helped with directions",
    date: "3 days ago",
    status: "Resolved",
  },
];

const MyActivity = () => {
  const navigate = useNavigate();

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
              <History className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">My Activity</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-background">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
            <TabsTrigger value="rides" className="flex-1">Rides</TabsTrigger>
            <TabsTrigger value="help" className="flex-1">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="p-6 space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activity.color === "secondary"
                          ? "bg-secondary-soft"
                          : activity.color === "info"
                          ? "bg-info-soft"
                          : "bg-success-soft"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          activity.color === "secondary"
                            ? "text-secondary"
                            : activity.color === "info"
                            ? "text-info"
                            : "text-success"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.date}
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 bg-success-soft text-success text-xs font-medium rounded-full">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="events" className="p-6">
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No events yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join events to see your activity here
              </p>
              <Button onClick={() => navigate("/discover")} className="rounded-full">
                Discover Events
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="rides" className="p-6">
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Car className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No rides yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share or find rides to see history here
              </p>
              <Button onClick={() => navigate("/map")} className="rounded-full">
                Find Rides
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="help" className="p-6">
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <HandHeart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No help activity yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help others or ask for help to see history
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

export default MyActivity;
