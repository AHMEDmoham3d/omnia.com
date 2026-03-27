import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = async () => {
      try {
        audio.volume = 0.2; // Very low volume
        audio.loop = true;
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.log('Autoplay blocked, will retry on interaction:', e);
      }
    };

    // Attempt autoplay immediately
    playMusic();

    // Retry on various user interactions
    const handleInteraction = () => {
      if (!isPlaying) {
        playMusic();
      }
    };

    const events = ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'];
    events.forEach(event => document.addEventListener(event, handleInteraction, { once: true }));

    // Handle tab visibility
    const handleVisibilityChange = () => {
      if (!document.hidden && isPlaying) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
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
      
      {/* Minimal Control - Only show if needed */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-500/90 hover:to-pink-500/90 shadow-2xl border-2 border-white/30 backdrop-blur-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110 group opacity-70 hover:opacity-100"
        title="Toggle Music"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </>
  );
};

export default BackgroundMusic;

