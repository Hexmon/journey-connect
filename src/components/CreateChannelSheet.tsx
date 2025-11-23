import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Hash, Lock, Globe, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateChannelSheetProps {
  open: boolean;
  onClose: () => void;
}

const CreateChannelSheet = ({ open, onClose }: CreateChannelSheetProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"public" | "private" | "dm">("public");

  const handleCreate = () => {
    if (name.trim()) {
      toast.success(`Created ${type} channel: ${name}`);
      setName("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh]">
        <SheetHeader>
          <SheetTitle>Create New Channel</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Channel Type */}
          <div className="space-y-3">
            <Label>Channel Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as any)}>
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Public Forum</p>
                      <p className="text-xs text-muted-foreground">Anyone can join and view messages</p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Lock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Private Group</p>
                      <p className="text-xs text-muted-foreground">Invite-only closed group</p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="dm" id="dm" />
                <Label htmlFor="dm" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Direct Message</p>
                      <p className="text-xs text-muted-foreground">Private conversation</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Channel Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Channel Name</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="general-chat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this channel about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreate}
            className="w-full h-12 text-base rounded-full"
            disabled={!name.trim()}
          >
            Create Channel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateChannelSheet;
