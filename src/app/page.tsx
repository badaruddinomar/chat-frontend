import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Users,
  Shield,
  Zap,
  Globe,
  Smartphone,
  Star,
  ArrowRight,
  Check,
  Target,
  Heart,
  Sparkles,
  Play,
  Send,
  Video,
  FileText,
  Lock,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
export default function ChatAppLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* 3. Features */}
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
              Powerful features designed to make your conversations more
              engaging, secure, and productive.
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

      {/* 4. Our Mission */}
      <section
        id="mission"
        className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-stars-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Target className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">Our Mission</h2>
              <p className="text-xl lg:text-2xl text-purple-100 leading-relaxed">
                To revolutionize how people connect and communicate in the
                digital age
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-purple-800 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold">Human Connection</h3>
                <p className="text-purple-200">
                  We believe technology should bring people closer together, not
                  drive them apart.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold">Global Reach</h3>
                <p className="text-blue-200">
                  Breaking down barriers and connecting people across cultures
                  and continents.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center mx-auto">
                  <Lock className="h-8 w-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-indigo-200">
                  {`Your conversations are yours. We're committed to protecting
                  your privacy always.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Trusted by
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {" "}
                  Millions
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join the community of users who have made ChatVibe their go-to
                communication platform
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "2M+", label: "Active Users" },
                { number: "50M+", label: "Messages Sent" },
                { number: "99.9%", label: "Uptime" },
                { number: "150+", label: "Countries" },
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Brand Logos */}
            <div className="space-y-8">
              <p className="text-gray-500 font-medium">
                Trusted by leading companies worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400 font-medium">Brand {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore All Features */}
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

      {/* 7. Testimonials */}
      <section
        id="testimonials"
        className="py-24 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge
              variant="outline"
              className="border-purple-200 text-purple-600"
            >
              Testimonials
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              What Our Users
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                Say
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real users who love ChatVibe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Product Manager at TechCorp",
                content:
                  "ChatVibe has completely transformed how our team communicates. The real-time features and seamless integration make collaboration effortless.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Michael Chen",
                role: "Startup Founder",
                content:
                  "The security features give me peace of mind, and the user experience is absolutely fantastic. Our entire company runs on ChatVibe now.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Emily Rodriguez",
                role: "Remote Team Lead",
                content:
                  "Managing a distributed team has never been easier. ChatVibe keeps everyone connected and productive, no matter where they are.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Minimal Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Brand */}
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ChatVibe
              </span>
            </div>

            {/* CTA */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold">Ready to Start Chatting?</h3>
              <p className="text-gray-400">
                Join millions of users who trust ChatVibe for their daily
                communication.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                &copy; 2024 ChatVibe. All rights reserved. Made with ❤️ for
                better communication.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
