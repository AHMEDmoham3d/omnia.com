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

function App() {
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

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Block right-click, copy, paste, and inspect tools
    const disableSecurityRisks = () => {
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
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
    const savedMessages = JSON.parse(localStorage.getItem('omnia_secure_messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const handleNewMessage = (messageData: any) => {
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
    <Router>
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ParticleBackground />
                <Header />
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
