import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ParticleBackground from './components/ParticleBackground';

// Interfaces
interface Visitor {
  id: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  isp: string;
  device: string;
  browser: string;
  screenResolution: string;
  language: string;
  visitTime: string;
  pageViews: string[];
  timeOnSite: number;
  isActive: boolean;
  lastActivity: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  content: string;
  timestamp: string;
  status: string;
  ip: string;
}

interface IPData {
  ip: string;
}

interface LocationData {
  country_name?: string;
  city?: string;
  region?: string;
  timezone?: string;
  org?: string;
}

function App() {
  const [visitorData, setVisitorData] = useState<{
    totalVisitors: number;
    uniqueVisitors: number;
    todayVisitors: number;
    countries: string[];
    cities: string[];
    pageViews: { [key: string]: number };
    realTimeVisitors: Visitor[];
  }>({
    totalVisitors: 0,
    uniqueVisitors: 0,
    todayVisitors: 0,
    countries: [],
    cities: [],
    pageViews: {
      home: 0,
      services: 0,
      about: 0,
      contact: 0
    },
    realTimeVisitors: []
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Disable right click and dev tools
    const disableSecurityRisks = () => {
      document.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
          (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase()))
        ) {
          e.preventDefault();
        }
      });
    };
    disableSecurityRisks();
  }, []);

  useEffect(() => {
    const trackRealVisitor = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json() as IPData;

        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json() as LocationData;

        const visitorId = btoa(
          ipData.ip +
          navigator.userAgent +
          screen.width + screen.height
        );

        const existingData: Visitor[] = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
        const isUniqueVisitor = !existingData.find((v) => v.id === visitorId);

        const visitorInfo: Visitor = {
          id: visitorId,
          ip: ipData.ip,
          country: locationData.country_name || 'Unknown',
          city: locationData.city || 'Unknown',
          region: locationData.region || 'Unknown',
          timezone: locationData.timezone || 'Unknown',
          isp: locationData.org || 'Unknown',
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browser: navigator.userAgent.split(' ').pop()?.split('/')[0] || 'unknown',
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
          visitTime: new Date().toISOString(),
          pageViews: ['home'],
          timeOnSite: 0,
          isActive: true,
          lastActivity: new Date().toISOString()
        };

        const updatedVisitors: Visitor[] = isUniqueVisitor
          ? [...existingData, visitorInfo]
          : existingData.map((v) =>
              v.id === visitorId
                ? { ...v, visitTime: new Date().toISOString(), lastActivity: new Date().toISOString(), isActive: true }
                : v
            );

        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedVisitors));

        const today = new Date().toDateString();
        const todayVisitors = updatedVisitors.filter(
          (v) => new Date(v.visitTime).toDateString() === today
        ).length;

        const uniqueCountries = [...new Set(updatedVisitors.map((v) => v.country))];
        const uniqueCities = [...new Set(updatedVisitors.map((v) => v.city))];

        setVisitorData({
          totalVisitors: updatedVisitors.length,
          uniqueVisitors: updatedVisitors.length,
          todayVisitors: todayVisitors,
          countries: uniqueCountries,
          cities: uniqueCities,
          pageViews: {
            home: updatedVisitors.reduce((acc, v) => acc + (v.pageViews.includes('home') ? 1 : 0), 0),
            services: updatedVisitors.reduce((acc, v) => acc + (v.pageViews.includes('services') ? 1 : 0), 0),
            about: updatedVisitors.reduce((acc, v) => acc + (v.pageViews.includes('about') ? 1 : 0), 0),
            contact: updatedVisitors.reduce((acc, v) => acc + (v.pageViews.includes('contact') ? 1 : 0), 0)
          },
          realTimeVisitors: updatedVisitors.filter((v) => v.isActive)
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackRealVisitor();

    let startTime = Date.now();
    let currentPage = 'home';

    const trackPageView = (page: string) => {
      const visitors: Visitor[] = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
      const currentVisitorId = visitors[visitors.length - 1]?.id;

      if (currentVisitorId) {
        const updatedVisitors = visitors.map((v) => {
          if (v.id === currentVisitorId) {
            const updatedPageViews = [...new Set([...v.pageViews, page])];
            return { ...v, pageViews: updatedPageViews, lastActivity: new Date().toISOString() };
          }
          return v;
        });
        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedVisitors));
      }
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom && currentPage !== section) {
            currentPage = section;
            trackPageView(section);
          }
        }
      });
    };

    const handleVisibilityChange = () => {
      const visitors: Visitor[] = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
      const currentVisitorId = visitors[visitors.length - 1]?.id;

      if (document.hidden && currentVisitorId) {
        const timeSpent = Date.now() - startTime;
        const updatedVisitors = visitors.map((v) => {
          if (v.id === currentVisitorId) {
            return {
              ...v,
              timeOnSite: (v.timeOnSite || 0) + timeSpent,
              isActive: false,
              lastActivity: new Date().toISOString()
            };
          }
          return v;
        });
        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedVisitors));
      } else if (!document.hidden) {
        startTime = Date.now();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const savedMessages: Message[] = JSON.parse(localStorage.getItem('omnia_secure_messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const handleNewMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'status' | 'ip'>) => {
    const newMessage: Message = {
      id: Date.now(),
      ...messageData,
      timestamp: new Date().toISOString(),
      status: 'unread',
      ip: 'Hidden for security'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('omnia_secure_messages', JSON.stringify(updatedMessages));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ParticleBackground />
                <Hero />
                <About />
                <Services />
                <Contact onMessageSent={handleNewMessage} />
                <Footer />
              </>
            }
          />

          <Route
            path="/omnia-admin-zx9H2k-4t93p"
            element={
              <AdminPanel
                visitorData={visitorData}
                messages={messages}
                setMessages={setMessages}
                onClose={() => {}}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
