import { Badge } from "@/components/ui/badge";
import { Zap, Users, Shield, Video, ImageIcon, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <Badge
            variant="outline"
            className="border-purple-200 text-purple-600"
          >
            Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make your conversations more engaging,
            secure, and productive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-yellow-500" />,
              title: "Lightning Fast",
              description:
                "Real-time messaging with zero lag. Experience instant communication like never before.",
              color: "yellow",
            },
            {
              icon: <Users className="h-8 w-8 text-blue-500" />,
              title: "Group Conversations",
              description:
                "Create unlimited group chats with advanced moderation and management tools.",
              color: "blue",
            },
            {
              icon: <Shield className="h-8 w-8 text-green-500" />,
              title: "End-to-End Security",
              description:
                "Military-grade encryption ensures your conversations remain private and secure.",
              color: "green",
            },
            {
              icon: <Video className="h-8 w-8 text-purple-500" />,
              title: "Video & Voice Calls",
              description:
                "High-quality video and voice calls integrated seamlessly into your chats.",
              color: "purple",
            },
            {
              icon: <ImageIcon className="h-8 w-8 text-pink-500" />,
              title: "Rich Media Sharing",
              description:
                "Share photos, videos, documents, and files with drag-and-drop simplicity.",
              color: "pink",
            },
            {
              icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
              title: "Cross-Platform",
              description:
                "Access your chats anywhere - web, mobile, desktop. Always stay connected.",
              color: "indigo",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardContent className="p-8 space-y-4">
                <div
                  className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
