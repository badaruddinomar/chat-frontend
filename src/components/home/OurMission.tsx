import { Target, Heart, Globe, Lock } from "lucide-react";

const OurMission = () => {
  return (
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
              To revolutionize how people connect and communicate in the digital
              age
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
                Breaking down barriers and connecting people across cultures and
                continents.
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
  );
};

export default OurMission;
