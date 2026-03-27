import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'shopping' | 'courses' | 'blog'>('shopping');
  const [menuAnimation, setMenuAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Trigger animation when menu opens
      setTimeout(() => setMenuAnimation(true), 100);
    } else {
      setMenuAnimation(false);
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '📖' },
    { name: 'Services', href: '#services', icon: '✨' },
    { name: 'Contact', href: '#contact', icon: '📧' },
    { name: 'Blog', action: () => { setModalType('blog'); setShowModal(true); }, icon: '📝' }, 
    { name: 'Shopping', href: 'https://beyond-holistic-store-eg.vercel.app/', icon: '🛍️', external: true },
    { name: 'Courses', action: () => { setModalType('courses'); setShowModal(true); }, icon: '🎓' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Beyond Holistic
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  {item.external && <ExternalLink className="w-3 h-3" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            )}
          </nav>

          {/* Mobile Menu Button with Pulse Animation when menu is closed */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white relative group"
          >
            {!isMenuOpen && !isScrolled && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            )}
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced with attention-grabbing animations */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl animate-slideDown">
            <nav className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`transform transition-all duration-500 ${
                    menuAnimation 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.action ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        item.action();
                      }}
                      className="w-full text-left group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3 py-3 px-4">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-medium text-base">
                          {item.name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-purple-400 ml-auto transform -rotate-90 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></div>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="w-full block group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3 py-3 px-4">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-medium text-base">
                          {item.name}
                        </span>
                        {item.external ? (
                          <ExternalLink className="w-4 h-4 text-purple-400 ml-auto group-hover:translate-x-1 transition-all duration-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-purple-400 ml-auto transform -rotate-90 group-hover:translate-x-1 transition-all duration-300" />
                        )}
                      </div>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></div>
                    </a>
                  )}
                </div>
              ))}
              
              {/* Decorative element to draw attention */}
              <div className="mt-4 pt-4 border-t border-purple-500/30">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Navigate to explore</span>
                  <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      {/* Unified Modal for Courses/Blog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-md mx-auto animate-scaleIn border border-purple-500/30">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                <Sparkles className="w-12 h-12 text-purple-300 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {modalType === 'blog' ? '📝 Blog' : modalType === 'courses' ? '🎓 Courses' : '🛍️ Shopping'}
              </h2>
              <p className="text-gray-300 max-w-sm">
                Our {modalType === 'blog' ? 'Blog' : modalType === 'courses' ? 'Courses' : 'Shopping'} section is under development right now.<br />
                Stay tuned for amazing content coming soon!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Got it! ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;