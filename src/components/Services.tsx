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
      description: (
        <>
          Tarot is a mirror of your energy each card holds a message for you, its like a heart to heart conversation with the universe, we ask and the cards respond whether its love, career or personal growth.
          <br /><br />
          Each reading is personalized to your specific questions or your life situations.
          <br /><br />
          I leave you with guidance, wisdom, clarity and the light to navigate your next steps.
        </>
      ),
      features: []
    },
    {
      icon: <Music className="w-7 h-7 text-pink-400" />,
      title: "Sound Therapy (Tuning Forks)",
      description: "You will feel the shift within. I use a combination of frequencies and ancient techniques that work directly on your nervous system to bring deep relaxation, restore balance, and promote healing. It's a journey back to your natural state of harmony.",
      features: [
        "There are 3 different types of sessions:",
        <div key="sound-therapy-types" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- BACK TO BALANCE</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Stress relief</li>
              <li>Chakra Balancing</li>
              <li>Energy Alignment</li>
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
      title: "spiritual session, Who you are?",
      description: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="flex items-center space-x-2 mb-6 mt-4">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </div>
          <p>Currently preparing for a new session that will help you connect deeper with yourself and understand who you truly are.</p>
        </div>
      ),
      features: []
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "The tarot reading was incredibly accurate and gave me the clarity I needed to make important life decisions.",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "The sound healing session was transformative. I felt deeply relaxed and energized for days afterward.",
      rating: 5
    },
    {
      name: "Elena K.",
      text: "Amazing energy healing experience. I could feel the positive changes in my body and mind immediately.",
      rating: 5
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
                            : service.title === "Energy Healing Session" 
                              ? "60-90 min, Online (Video Call) or In person"
                              : service.title === "spiritual session, Who you are?"
                                ? "Online Only"
                                : "60 min, In person Only"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </div>

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

        {/* Testimonials */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            What People Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-purple-400 font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;