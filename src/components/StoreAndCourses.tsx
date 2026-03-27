import React from 'react';
import { ShoppingBag, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';

const StoreAndCourses = () => {
  return (
    <section id="store-courses" className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
      
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-300">Exclusive Access</span>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight">
            Unlock Your Potential
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive into our exclusive <span className="font-semibold text-pink-300">Healing Store</span> packed with transformative tools. 
            Coming soon: <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Powerhouse Courses</span> 
            that will redefine your spiritual & healing journey. 
            Don't just evolve – <span className="font-bold text-yellow-400">Dominate</span> ✨
          </p>
        </div>

        {/* Store & Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Store Card */}
          <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 hover:border-purple-400/70 hover:bg-purple-500/5 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-8">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl group-hover:scale-110 transition-all duration-300 flex items-center justify-center border border-purple-400/30">
                <ShoppingBag className="w-10 h-10 text-pink-400 group-hover:text-pink-300" strokeWidth={1.5} />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
              Healing Store
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg opacity-90 group-hover:text-gray-200 transition-colors">
              Premium crystals, tuning forks, sound tools & more. 
              Elevate your practice with products trusted by healers worldwide. 
              <span className="text-green-400 font-semibold block mt-2 text-xl">Shop Now & Transform Instantly</span>
            </p>
            <a
              href="https://beyond-holistic-store-eg.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-400/50"
            >
              Shop Exclusive Products
              <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Courses Card */}
          <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 hover:border-pink-400/70 hover:bg-pink-500/5 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="bg-gradient-to-br from-yellow-500/20 to-purple-500/20 p-4 rounded-2xl group-hover:scale-110 transition-all duration-300 flex items-center justify-center border border-yellow-400/30">
                  <GraduationCap className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300" strokeWidth={1.5} />
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                Powerhouse Courses
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg opacity-90 group-hover:text-gray-200 transition-colors relative z-10">
                Revolutionary programs blending ancient wisdom with cutting-edge healing techniques. 
                Limited spots – secure yours before launch. 
                <span className="text-purple-300 font-semibold block mt-2 text-xl">Master Your Gifts. Lead Your Path.</span>
              </p>
              <button className="group/btn flex items-center justify-center w-full bg-gradient-to-r from-yellow-500 to-purple-500 hover:from-yellow-600 hover:to-purple-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-yellow-400/50 relative z-10">
                Join Elite Waitlist
                <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl border border-purple-400/30 backdrop-blur-sm">
          <p className="text-lg md:text-xl text-gray-200 mb-4">
            Ready to accelerate your transformation?{' '}
            <span className="font-bold text-white">Start with the store today</span> and get ready for courses that change everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://beyond-holistic-store-eg.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Enter The Store Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreAndCourses;

