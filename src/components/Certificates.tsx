import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Maximize2 } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  pdf: string;
  thumbnail: string;
}

interface EmptySlot {
  id: string;
  empty: true;
}

const Certificates = () => {
  const certificates: Certificate[] = [
    { 
      id: 1, 
      title: 'Sound Healing', 
      pdf: './Sound with Tereza Omnia Abdo.pdf',
      thumbnail: './Sound-Healing.png' 
    },
    { 
      id: 2, 
      title: 'Somatic Wisdom', 
      pdf: '/Somatic Wisdom.pdf',
      thumbnail: '/Somatic-wisdom.png' 
    },
    { 
      id: 3, 
      title: 'Healing Module', 
      pdf: '/Somatic Art.pdf',
      thumbnail: '/Healing-module.png' 
    },
    { 
      id: 4, 
      title: 'Reiki Teacher', 
      pdf: '/Reiki Master.pdf',
      thumbnail: '/Reiki-teacher.png' 
    },
    { 
      id: 5, 
      title: 'Tuning Fork Therapy', 
      pdf: '/Tuning Fork Therapy L1.pdf',
      thumbnail: '/tuning-fork-therapy.png' 
    },
    { 
      id: 6, 
      title: 'Access Bars', 
      pdf: '/Access Bars.pdf',
      thumbnail: '/Access-bars.png' 
    },
    { 
      id: 7, 
      title: 'Forks-Workshop', 
      pdf: '/Angel Forks.pdf',
      thumbnail: '/forks-workshop.png' 
    },
    { 
      id: 8, 
      title: 'Emotional Release', 
      pdf: '/Emotional Release.pdf',
      thumbnail: '/Emotional.png' 
    },
    { 
      id: 9, 
      title: 'Facial Beauty', 
      pdf: '/Facial Beauty.pdf',
      thumbnail: '/facail.png' 
    },
    { 
      id: 10, 
      title: 'Pain Relief (Tuning Fork)', 
      pdf: '/Pain Relief (Tuning Fork).pdf',
      thumbnail: '/pain.png' 
    },
    { 
      id: 11, 
      title: 'Family Constellation', 
      pdf: '/Family Constellation.pdf',
      thumbnail: '/decalaration.png' 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [certificatesPerPage, setCertificatesPerPage] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);

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

  const openModal = (cert: Certificate) => {
    setCurrentCertificate(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const visibleCertificates = certificates.slice(
    currentIndex, 
    currentIndex + certificatesPerPage
  );

  // Fill empty slots if needed for consistent layout
  const emptySlots = certificatesPerPage - visibleCertificates.length;
  const displayCertificates: (Certificate | EmptySlot)[] = [...visibleCertificates];
  for (let i = 0; i < emptySlots; i++) {
    displayCertificates.push({ id: `empty-${i}`, empty: true });
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
                  'empty' in cert ? (
                    <div key={cert.id} className="aspect-[4/3] opacity-0" aria-hidden="true" />
                  ) : (
                    <div key={cert.id} className="group relative">
                      <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                        <img
                          src={cert.thumbnail}
                          alt={cert.title}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => openModal(cert)}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button 
                            onClick={() => openModal(cert)}
                            className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2"
                            title="View Certificate"
                          >
                            <Maximize2 className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">Enlarge</span>
                          </button>
                        </div>
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

      {/* Modal for enlarged view */}
      {isModalOpen && currentCertificate && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-screen h-full">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full hover:bg-purple-800 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {currentCertificate.title}
              </h3>
              <div className="flex-1 overflow-auto flex items-center justify-center">
                <iframe 
                  src={currentCertificate.pdf} 
                  className="w-full h-full min-h-[60vh] border-none"
                  title={`Certificate: ${currentCertificate.title}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;