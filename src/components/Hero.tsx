import React, { useEffect, useRef } from 'react';
import { Sparkles, Moon, Star } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-indigo-900/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Moon className="w-12 h-12 text-purple-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Star className="w-8 h-8 text-yellow-300 opacity-70" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float">
          <Sparkles className="w-10 h-10 text-pink-300 opacity-50" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
            Omnia
          </h1>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 border border-purple-400/30 rounded-full animate-spin-slow"></div>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light animate-fade-in-up">
          Unlock Your Spiritual Journey Through Ancient Wisdom
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up-delayed">
          Experience the transformative power of tarot reading, spiritual energy healing, 
          and sound therapy with tuning forks. Discover your path to inner harmony and enlightenment.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-more-delayed">
          <a
            href="#services"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Services
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          
          <a
            href="#contact"
            className="group border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
          >
            Book Consultation
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">✨</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;