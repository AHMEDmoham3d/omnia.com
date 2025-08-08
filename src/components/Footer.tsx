import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Heart, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // أيقونة التيك توك كعنصر JSX
  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-pink-400">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-pink-400" />
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
                href="mailto:ms.omnia.o@hotmail.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/+201009058159"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/your-instagram-username"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@your-tiktok-username"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon />
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
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
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
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
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
            <Heart className="w-4 h-4 inline text-pink-400 animate-pulse [animation-duration:1.5s] drop-shadow-[0_0_4px_rgba(244,114,182,0.7)] hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.9)] transition-all" />{' '}
            for Beautiful souls.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">
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