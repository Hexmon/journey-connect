import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Megaphone, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const CreateNews = () => {
  const navigate = useNavigate();
  const [newsType, setNewsType] = useState<"news" | "opportunity">("news");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Posted successfully!",
      description: "Your update is now visible to the community.",
    });
    navigate("/map");
  };

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
            <div className="p-2 rounded-lg bg-news-soft">
              <Megaphone className="h-5 w-5 text-news" />
            </div>
            <h1 className="text-xl font-bold">Post Update</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-3">
            <Label>What are you sharing?</Label>
            <RadioGroup value={newsType} onValueChange={(v) => setNewsType(v as "news" | "opportunity")}>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    newsType === "news"
                      ? "border-news bg-news-soft"
                      : "border-border bg-card"
                  }`}
                >
                  <RadioGroupItem value="news" className="sr-only" />
                  <div className="text-center">
                    <Megaphone className="h-6 w-6 mx-auto mb-2 text-news" />
                    <p className="font-semibold">News / Update</p>
                    <p className="text-xs text-muted-foreground mt-1">Local announcement</p>
                  </div>
                </label>
                <label
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    newsType === "opportunity"
                      ? "border-news bg-news-soft"
                      : "border-border bg-card"
                  }`}
                >
                  <RadioGroupItem value="opportunity" className="sr-only" />
                  <div className="text-center">
                    <Briefcase className="h-6 w-6 mx-auto mb-2 text-news" />
                    <p className="font-semibold">Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">Job, gig, or opening</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder={newsType === "news" ? "What's the news?" : "Position or opportunity title"}
              className="h-12 rounded-xl"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder={
                newsType === "news"
                  ? "Share details about the news or update..."
                  : "Describe the opportunity, requirements, and how to apply..."
              }
              className="rounded-xl resize-none"
              rows={5}
              required
            />
          </div>

          {/* Category (for opportunities) */}
          {newsType === "opportunity" && (
            <div className="space-y-3">
              <Label>Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Job", "Gig", "Internship", "Volunteering", "Housing", "Other"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="p-3 rounded-xl border-2 border-border bg-card hover:border-news/30 transition-all text-sm font-medium"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Where is this relevant?"
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Contact Info (for opportunities) */}
          {newsType === "opportunity" && (
            <div className="space-y-2">
              <Label htmlFor="contact">Contact / Apply Info</Label>
              <Input
                id="contact"
                placeholder="Email, phone, or application link"
                className="h-12 rounded-xl"
              />
            </div>
          )}

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Link (optional)</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://..."
              className="h-12 rounded-xl"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 rounded-full text-base">
              Post {newsType === "news" ? "News" : "Opportunity"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
