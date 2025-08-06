import React from 'react';
import { Smile } from 'lucide-react';
import { Headphones, Zap, Users, Clock, Star, Heart, Hand } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: (
        <div className="relative h-12 w-20">
          {/* Hand holding the cards - clearly visible */}
          <Hand className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 text-gray-300 rotate-[20deg] z-0" />
          {/* Tarot cards stack - realistic style */}
          <div className="flex relative z-10 justify-center" style={{ gap: '1px' }}>
            <div className="w-5 h-12 bg-gradient-to-b from-gray-100 to-gray-300 rounded-sm transform rotate-2 border border-gray-400 shadow-md"></div>
            <div className="w-5 h-12 bg-gradient-to-b from-gray-100 to-gray-300 rounded-sm transform -rotate-1 border border-gray-400 shadow-md"></div>
            <div className="w-5 h-12 bg-gradient-to-b from-gray-100 to-gray-300 rounded-sm transform rotate-3 border border-gray-400 shadow-md"></div>
          </div>
        </div>
      ),
      title: "Tarot Card Reading",
      description: "Discover insights about your past, present, and future through the ancient art of tarot. Each reading is personalized to your specific questions and life situation.",
      features: ["Personal guidance", "Future insights", "Relationship advice", "Career direction"]
    },
    {
      icon: <Headphones className="w-7 h-7 text-white" />,
      title: "Sound Healing with Tuning Forks",
      description: "Experience deep relaxation and cellular healing through therapeutic sound frequencies. Tuning forks help restore balance and harmony to your energy field.",
      features: ["Stress relief", "Energy alignment", "Chakra balancing", "Deep relaxation"]
    },
    {
      icon: <Heart className="w-7 h-7 text-red-400 fill-red-400" />,
      title: "Energy Healing Session",
      description: "Clear blockages and restore natural energy flow through hands-on healing techniques. Perfect for physical, emotional, and spiritual wellness.",
      features: ["Chakra clearing", "Aura cleansing", "Emotional release", "Spiritual alignment"]
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Group Meditation Circle",
      description: "Join like-minded souls in a powerful group meditation experience. Amplify your spiritual practice through collective energy and intention.",
      features: ["Group energy", "Guided meditation", "Spiritual community", "Shared healing"]
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
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>{feature}</span>
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