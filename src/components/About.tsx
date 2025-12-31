import React, { useState, useEffect } from 'react';
import { Heart, Eye, Waves, Star, Sun, Moon, Music, Sparkles } from 'lucide-react';

const About = () => {
  const images = ['/omnia-logo.jpg', '/ooo.jpeg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    {
      icon: <Heart className="w-12 h-12 text-pink-400" />,
      title: "Spiritual Healing",
      description: "Clear your repeated patterns or energy blockages , restore your balance and find the sacred parts of you that you have forgotten."
    },
    {
      icon: (
        <div className="flex justify-center" style={{ gap: '2px' }}>
          {/* Sun Card */}
          <div className="w-6 h-10 bg-transparent rounded-sm transform rotate-2 border-2 border-pink-400 shadow-md flex items-center justify-center">
            <Sun className="w-4 h-4 text-pink-400" strokeWidth="2" fill="none" />
          </div>
          {/* Moon Card */}
          <div className="w-6 h-10 bg-transparent rounded-sm transform -rotate-1 border-2 border-pink-400 shadow-md flex items-center justify-center">
            <Moon className="w-4 h-4 text-pink-400" strokeWidth="2" fill="none" />
          </div>
          {/* Star Card */}
          <div className="w-6 h-10 bg-transparent rounded-sm transform rotate-3 border-2 border-pink-400 shadow-md flex items-center justify-center">
            <Star className="w-4 h-4 text-pink-400" strokeWidth="2" fill="none" />
          </div>
        </div>
      ),
      title: "Tarot Readings",
      description: "Gain clarity on your life's path whether its (love, career or personal growth) through personalized Tarot and oracle cards."
    },
    {
      icon: <Music className="w-12 h-12 text-blue-400" />,
      title: "Sound Therapy",
      description: "In this session, your nervous system calms,  your breath deepens and your energy begins to flow freely again. Its a return to your natural harmony."
    },
    {
      icon: (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      ),
      title: "Soul Print",
      description: (
        <div className="text-center">
          {/* <p className="mb-2">Upcoming spiritual session</p> */}
          {/* <p className="font-semibold mb-2">Light within</p> */}
          {/* <p className="mb-4">Guiding you back to the truth of who you are?</p> */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Beyond Holistic 
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {/* Welcome to a sacred space where ancient wisdom meets modern healing.<br />
            I am dedicated to guiding you on your journey to awake your own consciousness to find your way in life
            through some practices that have been cherished for centuries. */}
              Welcome to a saced space , no matter what you are going through <br />
              you will find guidance here.
            </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={currentImageIndex === 0 ? "Spiritual healing session with tarot cards and crystals" : "Beyond Holistic spiritual services"}
                  className="w-full h-full object-cover animate-fade-in"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-4">
              About Omnia

            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Practicing since 2020, with a strong foundation in continuous study and a scientific approach, I combine my tools and techniques to help you find clarity, transformation and personal growth.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              {/* I hold sacred space for those who are ready to release what no longer serves them and reconnect with their inner light. Through sound therapy, tarot, energy healing */}
              Iam dedicated to guiding you through your journey to awake your own consciousness to find your way in life.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Each session is personalized to your unique needs and spiritual path.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">750+</div>
                <div className="text-gray-400">Healing Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">2800+</div>
                <div className="text-gray-400">Taro Reading</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;