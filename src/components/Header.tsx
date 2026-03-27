import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'shopping' | 'courses' | 'blog'>('shopping');
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      if (window.innerWidth < 768) return;
      setShowFloatingMenu(true);
    };
    const handleMouseLeave = () => {
      setShowFloatingMenu(false);
    };

    const headerElement = document.querySelector('header');
    if (headerElement) {
      headerElement.addEventListener('mousemove', handleMouseMove);
      headerElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (headerElement) {
        headerElement.removeEventListener('mousemove', handleMouseMove);
        headerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const quickAccessItems = [
    { name: 'Blog', action: () => { setModalType('blog'); setShowModal(true); } },
    { name: 'Shopping', href: 'https://beyond-holistic-store-eg.vercel.app/' },
    { name: 'Courses', action: () => { setModalType('courses'); setShowModal(true); } }
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-purple-500/30' : 'bg-gradient-to-r from-transparent via-gray-900/80 to-transparent backdrop-blur-md'
        }`}
      >
        {/* Glowing border animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 animate-pulse-slow rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo - Enhanced with glow */}
            <div className="flex items-center space-x-3 group/logo relative">
              <div className="relative p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 group-hover/logo:scale-110 transition-all duration-300">
                <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-purple-400 animate-pulse group-hover/logo:animate-[spin_3s_linear_infinite] drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 blur animate-ping rounded-2xl"></div>
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg leading-tight tracking-wide">
                Beyond Holistic
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <div className="flex space-x-6 mr-4">
                {navItems.map((item) =>
                  item.action ? (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 font-medium relative group backdrop-blur-sm"
                    >
                      {item.name}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur rounded-full transition-opacity duration-300"></span>
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 font-medium relative group backdrop-blur-sm"
                    >
                      {item.name}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur rounded-full transition-opacity duration-300"></span>
                    </a>
                  )
                )}
              </div>
              
              {/* Quick Access Buttons - Eye-catching */}
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group/quick">
                {quickAccessItems.map((item, index) =>
                  item.action ? (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="group/item relative px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md backdrop-blur-sm border border-purple-400/50"
                    >
                      {item.name}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover/item:opacity-30 rounded-xl blur transition-all duration-300"></div>
                      <div className="relative z-10 flex items-center space-x-1">
                        {item.name}
                        <ChevronDown className="w-3 h-3 group-hover/item:rotate-180 transition-transform duration-300" />
                      </div>
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group/item relative px-4 py-2 rounded-xl bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-500 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md backdrop-blur-sm border border-green-400/50"
                    >
                      {item.name}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover/item:opacity-30 rounded-xl blur transition-all duration-300"></div>
                    </a>
                  )
                )}
              </div>
            </nav>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 text-white font-semibold"
            >
              <span className="text-sm font-medium hidden sm:inline">Menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-xl border-t border-purple-500/30 shadow-2xl">
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group block text-center py-4 px-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-purple-400/50 transition-all duration-300 font-semibold shadow-md hover:shadow-xl hover:scale-105 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 rounded-2xl blur"></div>
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Quick Access in Mobile */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {quickAccessItems.map((item) =>
                  item.action ? (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsMenuOpen(false);
                        item.action();
                      }}
                      className="w-full group block text-center py-4 px-6 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-blue-400/50 text-base"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 rounded-2xl blur left-0 top-0 w-full h-full"></div>
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="w-full group block text-center py-4 px-6 bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-green-400/50 text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 rounded-2xl blur left-0 top-0 w-full h-full"></div>
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Floating Menu Indicator for Desktop - Subtle */}
      {showFloatingMenu && !isScrolled && window.innerWidth >= 768 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none opacity-80 animate-pulse">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-purple-400/30 shadow-2xl">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-200 tracking-wide">✨ Explore Store • Courses • Blog</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
        </div>
      )}

      {/* Unified Modal for Courses/Blog - Enhanced */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 text-white p-10 rounded-3xl shadow-2xl w-[95vw] max-w-lg mx-auto animate-in fade-in zoom-in duration-300 border border-white/10 backdrop-blur-2xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 animate-pulse">
                <Sparkles className="w-16 h-16 text-purple-300 drop-shadow-lg" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                {modalType === 'blog' ? 'Blog' : modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h2>
              <p className="text-lg text-gray-300 max-w-md leading-relaxed drop-shadow-md">
                Our {modalType === 'blog' ? 'Blog' : modalType.charAt(0).toUpperCase() + modalType.slice(1)} section is under construction.
                <br />
                <span className="font-semibold text-yellow-400 block mt-2">Coming soon with amazing content! ✨</span>
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400/50 backdrop-blur-sm flex items-center space-x-2"
              >
                <span>Got it!</span>
                <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

