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

    // Candle animation
    class Candle {
      x: number;
      y: number;
      width: number;
      height: number;
      flameHeight: number;
      flameWidth: number;
      flickerIntensity: number;
      baseColor: string;
      glowColor: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 60;
        this.flameHeight = 40;
        this.flameWidth = 20;
        this.flickerIntensity = 5;
        this.baseColor = '#f472b6'; // Pink-400
        this.glowColor = 'rgba(244, 114, 182, 0.3)';
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Candle stick
        ctx.fillStyle = '#fdf2f8'; // Light pink
        ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
        
        // Candle wax drips
        ctx.fillStyle = '#fbcfe8'; // Lighter pink
        for (let i = 0; i < 3; i++) {
          const dripY = this.y + 10 + Math.random() * this.height/2;
          const dripWidth = 3 + Math.random() * 4;
          const dripHeight = 5 + Math.random() * 8;
          ctx.beginPath();
          ctx.moveTo(this.x - dripWidth/2, dripY);
          ctx.bezierCurveTo(
            this.x - dripWidth/2, dripY + dripHeight/2,
            this.x + dripWidth/2, dripY + dripHeight/2,
            this.x + dripWidth/2, dripY + dripHeight
          );
          ctx.fill();
        }

        // Flame with flickering effect
        const flicker = Math.random() * this.flickerIntensity - this.flickerIntensity/2;
        
        // Flame glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y - this.flameHeight/2, 5,
          this.x, this.y - this.flameHeight/2, 30
        );
        gradient.addColorStop(0, 'rgba(244, 114, 182, 0.8)');
        gradient.addColorStop(1, 'rgba(244, 114, 182, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(
          this.x, 
          this.y - this.flameHeight/2 + flicker, 
          25, 
          40, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.fill();

        // Flame core
        const flameGradient = ctx.createLinearGradient(
          this.x, this.y - this.flameHeight,
          this.x, this.y
        );
        flameGradient.addColorStop(0, '#fef08a'); // Yellow-200
        flameGradient.addColorStop(0.5, '#f472b6'); // Pink-400
        flameGradient.addColorStop(1, '#ec4899'); // Pink-500
        
        ctx.fillStyle = flameGradient;
        ctx.beginPath();
        ctx.moveTo(this.x - this.flameWidth/2, this.y);
        ctx.quadraticCurveTo(
          this.x, 
          this.y - this.flameHeight + flicker, 
          this.x + this.flameWidth/2, 
          this.y
        );
        ctx.fill();
      }
    }

    // Create candles
    const candles: Candle[] = [];
    const candleCount = Math.floor(window.innerWidth / 200);
    
    for (let i = 0; i < candleCount; i++) {
      const x = (i + 0.5) * (window.innerWidth / candleCount);
      const y = window.innerHeight - 100 + Math.random() * 40;
      candles.push(new Candle(x, y));
    }

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

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

      // Draw particles
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

      // Draw candles
      candles.forEach(candle => {
        candle.draw(ctx);
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
      {/* Candle Animated Background */}
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
            Omnia Abdo
          </h1>
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
            Book Sessions
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