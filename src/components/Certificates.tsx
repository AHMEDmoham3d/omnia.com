import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  thumbnail: string;
}

const Certificates = () => {
  const certificates: Certificate[] = [
    { 
      id: 1, 
      title: 'Sound Healing', 
      thumbnail: './Sound-Healing.png' 
    },
    { 
      id: 2, 
      title: 'Somatic Wisdom', 
      thumbnail: '/Somatic-wisdom.png' 
    },
    { 
      id: 3, 
      title: 'Healing Module', 
      thumbnail: '/Healing-module.png' 
    },
    { 
      id: 4, 
      title: 'Reiki Teacher', 
      thumbnail: '/Reiki-teacher.png' 
    },
    { 
      id: 5, 
      title: 'Tuning Fork Therapy', 
      thumbnail: '/tuning-fork-therapy.png' 
    },
    { 
      id: 6, 
      title: 'Access Bars', 
      thumbnail: '/Access-bars.png' 
    },
    { 
      id: 7, 
      title: 'Forks-Workshop', 
      thumbnail: '/forks-workshop.png' 
    },
    { 
      id: 8, 
      title: 'Emotional Release', 
      thumbnail: '/Emotional.png' 
    },
    { 
      id: 9, 
      title: 'Facial Beauty', 
      thumbnail: '/facail.png' 
    },
    { 
      id: 10, 
      title: 'Pain Relief (Tuning Fork)', 
      thumbnail: '/pain.png' 
    },
    { 
      id: 11, 
      title: 'Family Constellation', 
      thumbnail: '/decalaration.png' 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [certificatesPerPage, setCertificatesPerPage] = useState(3);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCertificatesPerPage(1);
      } else if (window.innerWidth < 768) {
        setCertificatesPerPage(2);
      } else {
        setCertificatesPerPage(3);
      }
      // Reset index when changing page size to avoid empty spaces
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev + certificatesPerPage >= certificates.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? certificates.length - certificatesPerPage : prev - 1
    );
  };

  const visibleCertificates = certificates.slice(
    currentIndex, 
    currentIndex + certificatesPerPage
  );

  // Fill empty slots if needed for consistent layout
  const emptySlots = certificatesPerPage - visibleCertificates.length;
  const displayCertificates = [...visibleCertificates];
  for (let i = 0; i < emptySlots; i++) {
    displayCertificates.push({ id: -i-1, title: '', thumbnail: '' });
  }

  return (
    <section id="certificates" className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            My Certifications
          </h2>
          <p className="text-xl text-gray-300">
            Browse my professional certifications in spiritual healing and energy work
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-800 transition-colors"
              aria-label="Previous certificates"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {displayCertificates.map((cert) => (
                  cert.id < 0 ? (
                    <div key={cert.id} className="aspect-[4/3] opacity-0" aria-hidden="true" />
                  ) : (
                    <div key={cert.id} className="group relative">
                      <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                        <img
                          src={cert.thumbnail}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-white text-center">
                        {cert.title}
                      </h3>
                    </div>
                  )
                ))}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-purple-800 transition-colors"
              aria-label="Next certificates"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Mobile indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(certificates.length / certificatesPerPage) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * certificatesPerPage)}
                className={`w-3 h-3 rounded-full ${currentIndex === i * certificatesPerPage ? 'bg-purple-400' : 'bg-gray-600'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;