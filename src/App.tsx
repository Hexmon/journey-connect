import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
