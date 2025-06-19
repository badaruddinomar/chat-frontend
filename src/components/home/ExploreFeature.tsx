import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const ExploreFeature = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <Badge
            variant="outline"
            className="border-purple-200 text-purple-600"
          >
            Explore More
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Discover All
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deeper into what makes ChatVibe the ultimate communication
            platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {[
              {
                icon: <Send className="h-6 w-6 text-purple-600" />,
                title: "Smart Messaging",
                description:
                  "AI-powered message suggestions, auto-translation, and smart replies to enhance your conversations.",
              },
              {
                icon: <FileText className="h-6 w-6 text-blue-600" />,
                title: "Document Collaboration",
                description:
                  "Share and collaborate on documents in real-time without leaving your chat window.",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-indigo-600" />,
                title: "Custom Themes",
                description:
                  "Personalize your chat experience with custom themes, colors, and layouts.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Feature showcase"
                className="w-full h-auto rounded-2xl shadow-lg"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeature;
