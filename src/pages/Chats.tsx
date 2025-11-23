import { MessageCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Chats = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">Chats</h1>
          <p className="text-text-secondary mb-6">Your conversations</p>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No chats yet</h3>
            <p className="text-text-secondary text-center max-w-xs">
              Join an event or connect with someone to start chatting
            </p>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Chats;
