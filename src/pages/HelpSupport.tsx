import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, MessageCircle, Book, Mail, Shield, Bug } from "lucide-react";

const helpTopics = [
  {
    icon: MessageCircle,
    title: "Getting Started",
    description: "Learn the basics of Journey",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Safety Guide",
    description: "Stay safe while connecting",
    color: "success",
  },
  {
    icon: Book,
    title: "FAQs",
    description: "Common questions answered",
    color: "info",
  },
  {
    icon: Bug,
    title: "Report a Problem",
    description: "Let us know what's wrong",
    color: "danger",
  },
];

const HelpSupport = () => {
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
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Help & Support</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Contact */}
        <div className="bg-gradient-to-br from-primary-soft to-secondary-soft rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-2">Need immediate help?</h2>
          <p className="text-sm text-text-secondary mb-4">
            Our support team is here for you
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-all">
              <MessageCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Live Chat</p>
            </button>
            <button className="flex-1 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-all">
              <Mail className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Email</p>
            </button>
          </div>
        </div>

        {/* Help Topics */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Browse Help Topics</h2>
          {helpTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.title}
                className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      topic.color === "primary"
                        ? "bg-primary-soft"
                        : topic.color === "success"
                        ? "bg-success-soft"
                        : topic.color === "info"
                        ? "bg-info-soft"
                        : "bg-danger-soft"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        topic.color === "primary"
                          ? "text-primary"
                          : topic.color === "success"
                          ? "text-success"
                          : topic.color === "info"
                          ? "text-info"
                          : "text-destructive"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {topic.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground">›</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Common Questions */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Common Questions</h2>
          <div className="space-y-2">
            {[
              "How do I change my visibility settings?",
              "How do I report someone?",
              "How does ride sharing work?",
              "How do I delete my account?",
            ].map((question) => (
              <button
                key={question}
                className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-left"
              >
                <p className="text-sm font-medium">{question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-muted rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium">Contact Information</p>
          <p className="text-xs text-muted-foreground">
            Email: support@journey.app
          </p>
          <p className="text-xs text-muted-foreground">
            Response time: Usually within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
