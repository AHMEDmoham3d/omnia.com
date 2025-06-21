import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [visitorData, setVisitorData] = useState({
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
  const [messages, setMessages] = useState([]);

  // Real visitor tracking
  useEffect(() => {
    const trackRealVisitor = async () => {
      try {
        // Get real IP and location data
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Get detailed location information
        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json();

        // Create unique visitor ID based on IP + User Agent + Screen Resolution
        const visitorId = btoa(ipData.ip + navigator.userAgent + screen.width + screen.height);
        
        // Get existing visitor data from secure storage
        const existingData = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
        
        // Check if this is a unique visitor
        const isUniqueVisitor = !existingData.find(v => v.id === visitorId);
        
        const visitorInfo = {
          id: visitorId,
          ip: ipData.ip,
          country: locationData.country_name || 'Unknown',
          city: locationData.city || 'Unknown',
          region: locationData.region || 'Unknown',
          timezone: locationData.timezone || 'Unknown',
          isp: locationData.org || 'Unknown',
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browser: navigator.userAgent.split(' ').pop().split('/')[0],
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
          visitTime: new Date().toISOString(),
          pageViews: ['home'],
          timeOnSite: 0,
          isActive: true,
          lastActivity: new Date().toISOString()
        };

        // Update visitor data
        let updatedVisitors;
        if (isUniqueVisitor) {
          updatedVisitors = [...existingData, visitorInfo];
        } else {
          updatedVisitors = existingData.map(v => 
            v.id === visitorId 
              ? { ...v, visitTime: new Date().toISOString(), lastActivity: new Date().toISOString(), isActive: true }
              : v
          );
        }

        // Save to secure storage
        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedVisitors));

        // Update state with real data
        const today = new Date().toDateString();
        const todayVisitors = updatedVisitors.filter(v => 
          new Date(v.visitTime).toDateString() === today
        ).length;

        const uniqueCountries = [...new Set(updatedVisitors.map(v => v.country))];
        const uniqueCities = [...new Set(updatedVisitors.map(v => v.city))];

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
          realTimeVisitors: updatedVisitors.filter(v => v.isActive)
        });

      } catch (error) {
        console.error('Error tracking visitor:', error);
        // Fallback to basic tracking if external APIs fail
        const fallbackId = btoa(navigator.userAgent + Date.now());
        const fallbackData = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
        
        const fallbackVisitor = {
          id: fallbackId,
          ip: 'Hidden',
          country: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browser: navigator.userAgent.split(' ').pop().split('/')[0],
          visitTime: new Date().toISOString(),
          pageViews: ['home'],
          isActive: true
        };

        const updatedFallback = [...fallbackData, fallbackVisitor];
        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedFallback));
        
        setVisitorData(prev => ({
          ...prev,
          totalVisitors: updatedFallback.length,
          uniqueVisitors: updatedFallback.length,
          todayVisitors: updatedFallback.filter(v => 
            new Date(v.visitTime).toDateString() === new Date().toDateString()
          ).length
        }));
      }
    };

    trackRealVisitor();

    // Track page visibility and time spent
    let startTime = Date.now();
    let currentPage = 'home';

    const trackPageView = (page) => {
      const visitors = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
      const currentVisitorId = visitors[visitors.length - 1]?.id;
      
      if (currentVisitorId) {
        const updatedVisitors = visitors.map(v => {
          if (v.id === currentVisitorId) {
            const updatedPageViews = [...new Set([...v.pageViews, page])];
            return { ...v, pageViews: updatedPageViews, lastActivity: new Date().toISOString() };
          }
          return v;
        });
        localStorage.setItem('omnia_secure_visitors', JSON.stringify(updatedVisitors));
      }
    };

    // Track scroll and section views
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
      const visitors = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
      const currentVisitorId = visitors[visitors.length - 1]?.id;
      
      if (document.hidden && currentVisitorId) {
        const timeSpent = Date.now() - startTime;
        const updatedVisitors = visitors.map(v => {
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

  // Load messages from secure storage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('omnia_secure_messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const handleNewMessage = (messageData) => {
    const newMessage = {
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
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      
      {/* Admin Access Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-20 hover:opacity-100"
        title="Admin Access"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>

      <Header />
      <Hero />
      <About />
      <Services />
      <Contact onMessageSent={handleNewMessage} />
      <Footer />

      {isAdminOpen && (
        <AdminPanel 
          onClose={() => setIsAdminOpen(false)}
          visitorData={visitorData}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

export default App;