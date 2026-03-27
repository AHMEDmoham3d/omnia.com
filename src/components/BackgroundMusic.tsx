import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const ensurePlaying = async () => {
      try {
        audio.volume = 0.2;
        audio.loop = true;
        await audio.play();
      } catch (e) {
        console.log('Autoplay policy blocked:', e);
      }
    };

    // Auto play on mount
    ensurePlaying();

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        // Pause when leaving site/new tab
        audio.pause();
      } else {
        // Resume when returning
        ensurePlaying();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio?.pause();
    };
  }, []);

  return (
    <>
      <audio 
        ref={audioRef}
        src="/intro.mp3"
        preload="auto"
        className="hidden"
      />
    </>
  );
};

export default BackgroundMusic;

