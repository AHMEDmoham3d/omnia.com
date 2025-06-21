import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Omnia
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Guiding souls on their spiritual journey through ancient wisdom, 
              tarot readings, energy healing, and sound therapy. Discover your path to inner harmony.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Tarot Reading',
                'Sound Healing',
                'Energy Healing',
                'Group Meditation'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Omnia. All rights reserved. Made with{' '}
            <Heart className="w-4 h-4 inline text-red-400" /> for spiritual souls.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-900/20 text-green-400 px-4 py-2 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>SSL Secured & Privacy Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;