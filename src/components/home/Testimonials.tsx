import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
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
              avatar: "/Logo.svg",
            },
            {
              name: "Michael Chen",
              role: "Startup Founder",
              content:
                "The security features give me peace of mind, and the user experience is absolutely fantastic. Our entire company runs on ChatVibe now.",
              rating: 5,
              avatar: "/Logo.svg",
            },
            {
              name: "Emily Rodriguez",
              role: "Remote Team Lead",
              content:
                "Managing a distributed team has never been easier. ChatVibe keeps everyone connected and productive, no matter where they are.",
              rating: 5,
              avatar: "/Logo.svg",
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
                    src={testimonial.avatar || "/Logo.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                    width={60}
                    height={60}
                  />
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
