import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, BookOpen } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' }
  ];

  return (
    <div>
      {/* Header Component */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 ml-[120px]">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Omnia Abdo
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 mr-[120px]">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group"
                >
                  {item.name === 'Blog' ? (
                    <span className="flex items-center">
                      <BookOpen className="mr-1 w-4 h-4" />
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <nav className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name === 'Blog' && <BookOpen className="mr-2 w-4 h-4" />}
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Blog Section */}
      <section id="blog" className="pt-32 pb-20 bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              The Tuning Fork: Its Importance and Applications
            </h2>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
              <span>Published: June 15, 2023</span>
              <span>•</span>
              <span>By: Omar Ahmed</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <img 
              src="https://images.unsplash.com/photo-1603298616801-90b409488a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Tuning fork" 
              className="w-full h-64 object-cover rounded-lg mb-8"
            />

            <p className="text-lg mb-6">
              The tuning fork is a small but incredibly important tool with applications ranging from music to science and medicine. This simple device that produces a pure musical tone when struck has become fundamental in many technical and scientific applications.
            </p>

            <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">What is a Tuning Fork?</h3>
            <p className="mb-6">
              A tuning fork is a two-pronged metal fork that resonates at a specific constant pitch when struck. It was invented in 1711 by British musician John Shore, and was originally used to tune musical instruments.
            </p>

            <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">Key Applications</h3>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Music: Used as a pitch reference to tune musical instruments (typically 440 Hz for the A above middle C).</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Medicine: Used in hearing tests and to evaluate the function of the inner ear.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Physics: Helps in studying sound properties and vibrations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Horology: Some mechanical watches used tuning forks for timekeeping.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">Interesting Facts</h3>
            <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400 mb-8">
              <p className="italic">
                "The 440 Hz tuning fork became the international standard for musical pitch at a 1939 conference in London. Before this, reference pitches varied between countries and even cities!"
              </p>
            </div>

            <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4">Conclusion</h3>
            <p>
              Despite its small size, the tuning fork plays a vital role in many fields. From tuning violins to helping doctors diagnose hearing problems, this simple tool proves that useful technology doesn't always need to be complex. In our digital age, the tuning fork remains a testament to how some simple inventions can remain relevant for centuries.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <h4 className="text-lg font-semibold mb-4">Related Articles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="bg-gray-800/50 hover:bg-gray-700 transition p-4 rounded-lg">
                <h5 className="text-purple-300 font-medium">The Evolution of Musical Tuning Standards</h5>
                <p className="text-sm text-gray-400 mt-1">5 min read</p>
              </a>
              <a href="#" className="bg-gray-800/50 hover:bg-gray-700 transition p-4 rounded-lg">
                <h5 className="text-purple-300 font-medium">How Human Hearing Works</h5>
                <p className="text-sm text-gray-400 mt-1">8 min read</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;