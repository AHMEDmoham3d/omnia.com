import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    { 
      id: 1, 
      title: 'Energy Healing Certification', 
      pdf: './Reiki Master.pdf',
      thumbnail: '/certificates/thumb1.jpg' 
    },
    { 
      id: 2, 
      title: 'Advanced Tarot Reading', 
      pdf: '/certificates/cert2.pdf',
      thumbnail: '/certificates/thumb2.jpg' 
    },
    // ... add more certificates up to 11
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const certificatesPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev + 1 > certificates.length - certificatesPerPage ? 0 : prev + 1
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
              className="hidden md:flex p-2 rounded-full bg-gray-800 hover:bg-purple-800 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {visibleCertificates.map((cert) => (
                  <div key={cert.id} className="group relative">
                    <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                      <img
                        src={cert.thumbnail}
                        alt={cert.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => window.open(cert.pdf, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button 
                          onClick={() => window.open(cert.pdf, '_blank')}
                          className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                          title="View Certificate"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <a
                          href={cert.pdf}
                          download
                          className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="w-5 h-5 text-white" />
                        </a>
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-white text-center">
                      {cert.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              className="hidden md:flex p-2 rounded-full bg-gray-800 hover:bg-purple-800 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center mt-8 gap-2 md:hidden">
            {Array.from({ length: Math.ceil(certificates.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * certificatesPerPage)}
                className={`w-3 h-3 rounded-full ${currentIndex === i * certificatesPerPage ? 'bg-purple-400' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;