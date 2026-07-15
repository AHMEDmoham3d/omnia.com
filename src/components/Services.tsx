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
      title: "Readings",
      description: "",
      features: [
        <div key="tarot-types" className="grid grid-cols-1 gap-4 mt-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <p className="text-gray-300">
              <span className="font-semibold text-pink-300">📍All readings</span> are held online via video call in a safe, respectful, and completely confidential
            </p>
            <p className="mt-3 text-gray-300">
              <span className="font-semibold text-pink-300">💫Appointments</span> are scheduled based on availability
              <span className="font-semibold text-yellow-300">⚡Urgent Reading</span> available within 48 hours with extra fees
            </p>
            <p className="mt-3 text-gray-300">
              <span className="font-semibold text-pink-300">💫My sessions</span> focus on guidance, self-awareness, and personal growth.
              They are not intended for spying, spell work, or manipulation of others
            </p>
            <p className="mt-3 text-gray-300">
              <span className="font-semibold text-pink-300">●</span>Choose the reading that best suits your needs:
            </p>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">🔮Tarot Reading</span>
            <p className="mt-2 text-gray-300">⏳️1 Hour</p>
            <p className="mt-2 text-gray-300">
              A personalized reading designed to bring clarity, answer your questions, and help you better understand your situations and the people involved
            </p>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">🔮Charm Reading</span>
            <p className="mt-2 text-gray-300">
              Its a general reading using symbolic charms to offer insight into different areas of your life, including love, relationships, career, finances, travel, and more
            </p>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-xl text-pink-300">🔮Energy Blockage Reading</span>
            <p className="mt-2 text-gray-300">
              A focused reading designed to explore the energetic patterns that may be influencing a specific area of your life,
              helping you gain clarity and a deeper understanding of the root causes behind what may be holding you back
            </p>
          </div>
        </div>
      ]
    },
    {
      icon: <Music className="w-7 h-7 text-pink-400" />,
      title: "Sound Therapy",
      description: (
        <>
          It is a therapeutic experience that uses a combination of sound and frequencies that work directly on your nervous system to bring deep relaxation, restore balance, and promote healing.

          <div className="mt-4">
            <span className="font-semibold text-pink-300">🕯️🌿 Deep Relaxation</span>
            <p className="mt-2 text-gray-300">
              Designed to calm the nervous system and support those experiencing stress, anxiety, panic attacks, insomnia, mental overload, or difficulty focusing, helping restore inner balance.
            </p>
          </div>

          <div className="mt-4">
            <span className="font-semibold text-pink-300">🕯️🌿 Pain Release</span>
            <p className="mt-2 text-gray-300">
              Designed for physical pain relief, muscle tension, chronic fatigue, fibromyalgia, back pain, neck and shoulder pain, headaches, and other body discomforts.
            </p>
          </div>

          <div className="mt-4">
            <span className="font-semibold text-yellow-300">⚠️ Sound Sessions</span> are customized based on your needs to provide the best possible experience, so If you have a medical condition or currently receiving medical treatment, please contact me before booking to ensure the session is suitable for you.
          </div>
        </>
      ),
      features: [
        <div key="sound-therapy-types" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- BACK TO BALANCE</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Stress relief</li>
              <li>Chakra Balancing</li>
              <li>Soul Print</li>
              <li>Deep Relaxation</li>
            </ul>
          </div> */}
          {/* <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- PAIN TO PEACE</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Back, shoulder, neck, knee tightness</li>
              <li>Headaches and migraines</li>
              <li>Joint inflammation</li>
              <li>Panic/Anxiety Attack</li>
              <li>Insomnia</li>
            </ul>
          </div> */}
          {/* <div className="bg-gray-700/30 p-4 rounded-lg">
            <span className="font-semibold text-pink-300">- NATURAL BEAUTY</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Natural glow</li>
              <li>Stimulates Collagen</li>
              <li>Reduce Facial Tension</li>
              <li>Reduce signs and wrinkles</li>
            </ul>
          </div> */}
        </div>
      ]
    },
    {
      icon: <Heart className="w-7 h-7 text-pink-400" strokeWidth="2" fill="none" />,
      title: "Healing Sessions",
      description: (
        <>
          <div className="font-semibold text-pink-300">🤍🕯️🪶</div>
          <div className="mt-1 text-pink-300">📍Online Video Call</div>
          <br />
          <p>
            Healing Sessions are designed to help you gain clarity, reconnect with yourself, and take meaningful steps toward healing and personal growth
          </p>
          <p className="mt-3">
            These sessions are perfect for those who are ready to understand themselves more deeply, improve their quality of life,
            release recurring patterns, overcome personal blocks, and move forward with greater clarity and confidence.
          </p>
          <p className="mt-3">
            💫Each session is personalized and held in a safe, supportive, and completely confidential space.
          </p>
          <p className="mt-3 font-semibold"> <span className="mt-1 text-yellow-300">●</span> The Healing Session consists of two stages:</p>
          <p className="mt-2">🕯️ Initial Healing Session</p>
          <p className="mt-2">🕯️ Follow-Up Session</p>
          <p className="mt-1">
            The follow-up session is designed to review your progress, explore any changes you've experienced,
            and provide continued support throughout your healing journey.
          </p>
        </>
      ),
      features: []
    },
    // {
    //   icon: <Users className="w-7 h-7 text-white" />,
    //   title: "Soul Print",
    //   description: "",
    //   features: [
    //     <div className="flex flex-col items-center justify-center text-center">
    //       <div className="flex items-center space-x-2 mb-6 mt-4">
    //         <div className="relative">
    //           <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
    //           <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
    //         </div>
    //         <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    //           Coming Soon
    //         </span>
    //       </div>
    //     </div>
    //   ]
    // }
  ];

  return (
<section id="services" className="py-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                      {service.title === "Sound Therapy" ? (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>2 hours,In person(Only)</span>
                        </span>
                      ) : service.title !== "Readings" ? (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {service.title === "Tarot Reading" 
                              ? "60 min, Online (Video Call) or In person"
                              : service.title === "Sound Therapy"
                                ? ""
                              : service.title === "Healing Sessions" 
                                ? "60 min, Online (Video Call) or In person"
                                : service.title === "Soul Print"
                                  ? "Online Only"
                                  : ""}
                          </span>
                        </span>
                      ) : (
                        <span />
                      )}
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