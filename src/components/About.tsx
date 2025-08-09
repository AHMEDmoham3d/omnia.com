import React from 'react';
import { Heart, Eye, Waves, Star, Sun, Moon, Music } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-pink-400" />,
      title: "Spiritual Healing",
      description: "Connect with your inner energy and find emotional balance through ancient healing practices."
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
      description: "Gain clarity on your life's path Whether (love, career or personal growth) through personalized tarot and oracle card ."
    },
    {
      icon: <Music className="w-12 h-12 text-blue-400" />,
      title: "Sound Therapy",
      description: "Experience deep relaxation and healing through therapeutic tuning fork sessions."
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-400" />,
      title: "Energy Alignment",
      description: "Balance your chakras and restore harmony to your mind, body, and spirit."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Omnia
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to a sacred space where ancient wisdom meets modern healing.<br />
            I am dedicated to guiding you on your journey to awake your own consciousness to find your way in life
            through some practices that have been cherished for centuries.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-2">
              <img
                src="/hero.jpeg"
                alt="Spiritual healing session with tarot cards and crystals"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-4">
              Your Journey to Inner Harmony
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Practicing since 2020, with a strong foundation in continuous study and a scientific approach, I combine my tools and techniques to help you find clarity, transformation and personal growth.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I hold sacred space for those who are ready to release what no longer serves them and reconnect with their inner light. Through sound therapy, tarot, energy healing
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