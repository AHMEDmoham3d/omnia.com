import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'shopping' | 'courses'>('shopping');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog.html' }, 
    { name: 'Shopping', href: 'https://beyond-holistic-store-eg.vercel.app/' },
    { name: 'Courses', action: () => { setModalType('courses'); setShowModal(true); } }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 supports-[backdrop-filter:blur(20px)]:backdrop-blur-md shadow-lg ${
        isScrolled 
          ? 'bg-gray-900/95 shadow-xl backdrop-blur-md' 
          : 'bg-white/10 shadow-lg backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-xl sm:text-2xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
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
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700 rounded-t-xl shadow-2xl mx-3 sm:mx-4 -mt-2 animate-slide-down">
          <nav className="flex flex-col space-y-3 pt-3 pb-4 px-3 sm:px-4 max-h-80 overflow-y-auto">
            {navItems.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.action();
                  }}
                  className="text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 transition-all duration-200 font-medium text-left py-2 px-2 rounded-lg"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 transition-all duration-200 font-medium py-2 px-2 rounded-lg block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            )}
          </nav>
        </div>
      )}

      {/* Modal for Courses */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#16182F] text-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
              <Sparkles className="w-12 h-12 text-purple-300 animate-pulse" />
              <h2 className="text-2xl font-bold text-center">{modalType === 'courses' ? 'Courses' : 'Shopping'}</h2>
              <p className="text-center text-gray-300">
                Our {modalType === 'courses' ? 'Courses' : 'Shopping'} section is under development.<br /> Stay tuned!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

