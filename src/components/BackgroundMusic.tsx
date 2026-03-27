import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Autoplay prevented:', e));
    });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', () => {});
    };
  }, []);

  useEffect(() => {
    const handlePageVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else if (hasUserInteracted && isPlaying) {
        audio.play().catch(e => console.log('Autoplay prevented after tab switch:', e));
      }
    };

    document.addEventListener('visibilitychange', handlePageVisibility);
    return () => document.removeEventListener('visibilitychange', handlePageVisibility);
  }, [hasUserInteracted, isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasUserInteracted(true);
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.3; // Low volume for background
      audio.loop = true;
      audio.play().catch(e => {
        console.log('Autoplay blocked:', e);
        // Fallback: show message or retry on next interaction
      });
    }
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="/intro.mp3"
        preload="auto"
        className="hidden"
      />
      
      {/* Floating Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-2xl hover:shadow-purple-500/25 border-4 border-white/20 backdrop-blur-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:rotate-12 group"
        title={isPlaying ? 'Pause Music' : 'Play Background Music'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 rounded-full blur transition-all duration-300 animate-ping-slow"></div>
        <span className="relative z-10">
          {isPlaying ? '⏸️' : '▶️'}
        </span>
      </button>
      
      {/* Music Status Indicator */}
      {hasUserInteracted && (
        <div className={`fixed top-6 right-6 z-[99] px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-300 ${
          isPlaying 
            ? 'bg-green-500/20 text-green-300 border-green-400/50 animate-pulse shadow-lg shadow-green-500/25' 
            : 'bg-gray-500/20 text-gray-400 border-gray-600/50 opacity-50'
        }`}>
          {isPlaying ? '🎵 Music On' : '🎵 Music Off'}
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;

