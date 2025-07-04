import React from 'react';
import { Heart, Eye, Waves, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-pink-400" />,
      title: "Spiritual Healing",
      description: "Connect with your inner energy and find emotional balance through ancient healing practices."
    },
    {
      icon: <Eye className="w-12 h-12 text-purple-400" />,
      title: "Intuitive Readings",
      description: "Gain clarity on your life's path through personalized tarot and oracle card readings."
    },
    {
      icon: <Waves className="w-12 h-12 text-blue-400" />,
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
            Welcome to a sacred space where ancient wisdom meets modern healing. 
            I'm dedicated to guiding you on your spiritual journey through transformative practices 
            that have been cherished for centuries.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-2">
<img
  src="/omnia.jpg"
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
              With years of experience in spiritual healing and energy work, I combine traditional 
              practices with intuitive guidance to help you discover your true potential. Each session 
              is personalized to your unique needs and spiritual path.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're seeking clarity through tarot readings, healing through sound therapy, 
              or energy alignment through chakra work, you'll find a safe and nurturing environment 
              to explore your inner wisdom.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400">Healing Sessions</div>
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
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
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