import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import OnboardingUsername from "./pages/OnboardingUsername";
import OnboardingIntent from "./pages/OnboardingIntent";
import OnboardingInterests from "./pages/OnboardingInterests";
import OnboardingSafety from "./pages/OnboardingSafety";
import Map from "./pages/Map";
import Discover from "./pages/Discover";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import CreateRide from "./pages/CreateRide";
import CreateHelp from "./pages/CreateHelp";
import CreateMeetPeople from "./pages/CreateMeetPeople";
import CreateNews from "./pages/CreateNews";
import LonelyMode from "./pages/LonelyMode";
import SafetySettings from "./pages/SafetySettings";
import SavedItems from "./pages/SavedItems";
import MyActivity from "./pages/MyActivity";
import NotificationSettings from "./pages/NotificationSettings";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/username" element={<OnboardingUsername />} />
          <Route path="/onboarding/intent" element={<OnboardingIntent />} />
          <Route path="/onboarding/interests" element={<OnboardingInterests />} />
          <Route path="/onboarding/safety" element={<OnboardingSafety />} />
          <Route path="/map" element={<Map />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:chatId" element={<ChatRoom />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-ride" element={<CreateRide />} />
          <Route path="/create-help" element={<CreateHelp />} />
          <Route path="/create-meet-people" element={<CreateMeetPeople />} />
          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/lonely-mode" element={<LonelyMode />} />
          <Route path="/safety-settings" element={<SafetySettings />} />
          <Route path="/saved-items" element={<SavedItems />} />
          <Route path="/my-activity" element={<MyActivity />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help-support" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
