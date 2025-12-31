import React from 'react';
import { Smile, Sparkles } from 'lucide-react';
import { Sun, Moon, Star, Users, Clock, Heart, Music } from 'lucide-react';

const Services = () => {
  const services = [
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
      title: "Tarot Reading",
      description: "",
      features: [
        <div key="tarot-types" className="grid grid-cols-1 gap-4 mt-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">2026 Reading<br/>(available till end of January only)</span>
            <p className="mt-2 text-gray-300">
              An exclusive reading that covers your personal energy in details for the year of 2026 including: (your major highlights, Opportunities, Warnings, Lessons and guidance)
            </p>
            <p className="mt-2 text-green-300">
              🔮plus: PDF file as a reference to you + 20% discount on Private reading valid for 3 months.
            </p>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">Private Reading - one to one, video Call, 60 min</span>
            <p className="mt-2 text-gray-300">
              Its a private reading that covers your topics, answering your questions clarify your situations and clear all your doubts
            </p>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">Daily Tiktok Live Reading</span>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
              <li>Yes/No questions</li>
              <li>Detailed Questions</li>
              <li>Mini Readings</li>
              <li>Vip Readings</li>
            </ul>
          </div>
        </div>
      ]
    },
    {
      icon: <Music className="w-7 h-7 text-pink-400" />,
      title: "Sound Therapy",
      description: "You will feel the shift within. I use a combination of frequencies and ancient techniques that work directly on your nervous system to bring deep relaxation, restore balance, and promote healing. It's a journey back to your natural state of harmony.",
      features: [
        "There are 3 different types of sessions:",
        <div key="sound-therapy-types" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- BACK TO BALANCE</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Stress relief</li>
              <li>Chakra Balancing</li>
              <li>Soul Print</li>
              <li>Deep Relaxation</li>
            </ul>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- PAIN TO PEACE</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Back, shoulder, neck, knee tightness</li>
              <li>Headaches and migraines</li>
              <li>Joint inflammation</li>
              <li>Panic/Anxiety Attack</li>
              <li>Insomnia</li>
            </ul>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- NATURAL BEAUTY</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Natural glow</li>
              <li>Stimulates Collagen</li>
              <li>Reduce Facial Tension</li>
              <li>Reduce signs and wrinkles</li>
            </ul>
          </div>
        </div>
      ]
    },
    {
      icon: <Heart className="w-7 h-7 text-pink-400" strokeWidth="2" fill="none" />,
      title: "Healing Sessions",
      description: (
        <>
          A gentle yet powerful healing session designed to clear energetic blockages, restore your balance and help you to reconnect with your true self while finding the sacred parts of you that you have forgotten.
          <br /><br />
          This healing session is perfect for releasing blockages related to relationships, family dynamics, grief or loss, money challenges, emotional struggles,...Its a safe space to let go and realign your energy.
        </>
      ),
      features: []
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Soul Print",
      description: "",
      features: [
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-2 mb-6 mt-4">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </div>
        </div>
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-2 flex-wrap">
            Feel <Heart className="w-5 h-5 text-pink-400 inline" />
            Heal <Heart className="w-5 h-5 text-pink-400 inline" />
            Rise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from a range of transformative sessions, each designed to support your personal journey,
            whether you are seeking clarity, balance, emotional or physical pain release — There is a space for you here{' '}
            <Smile className="w-5 h-5 inline text-yellow-400" />
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-700/50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-pink-300">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {service.title === "Tarot Reading" 
                            ? "60 min, Online (Video Call) or In person"
                            : service.title === "Healing Sessions" 
                              ? "60 min, Online (Video Call) or In person"
                              : service.title === "Soul Print"
                                ? "Online Only"
                                : "60 min, In person Only"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {service.description && (
                <div className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="text-sm text-gray-400">
                    {typeof feature === 'string' ? (
                      <div className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
                        <span>{feature}</span>
                      </div>
                    ) : (
                      feature
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;