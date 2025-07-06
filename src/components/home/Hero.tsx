import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-2"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Now with AI-powered features
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Chat Beyond
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                {" "}
                Boundaries
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Experience the future of communication with our revolutionary chat
              platform. Connect instantly, share seamlessly, and collaborate
              effortlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
            >
              Start Chatting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 border-purple-200 hover:bg-purple-50"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 pt-8">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Instant messaging</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/Logo.svg"
              alt="ChatVibe Interface Preview"
              width={1000}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              ✨ Live Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
