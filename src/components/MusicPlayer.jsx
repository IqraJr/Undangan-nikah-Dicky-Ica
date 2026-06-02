import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const setIsPlayingRef = useRef(setIsPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    setIsPlayingRef.current = setIsPlaying;
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    // Create HTML5 Audio element loading local lagu1.MP3
    const audio = new Audio('./lagu1.MP3');
    audio.loop = true;
    audio.volume = 0.5; // Set volume to 50%
    audioRef.current = audio;

    // Listen to native events to keep React state synchronized
    const handlePlay = () => setIsPlayingRef.current(true);
    const handlePause = () => setIsPlayingRef.current(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try playing if state starts as true (e.g. user unlocked the invitation)
    if (isPlayingRef.current) {
      audio.play().catch(err => {
        console.warn("Autoplay blocked by browser:", err);
        setIsPlayingRef.current(false);
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
      audioRef.current = null;
    };
  }, []); // Run once on mount

  // Sync play/pause prop changes to the HTML5 Audio element
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Audio play blocked by browser:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className={`music-player-widget ${isPlaying ? 'playing' : ''}`} 
      onClick={togglePlay}
      title={isPlaying ? "Matikan Musik" : "Putar Musik"}
    >
      {isPlaying ? (
        <Volume2 size={24} color="#7A0C02" className="music-widget-icon-playing" />
      ) : (
        <VolumeX size={24} color="#7A0C02" />
      )}
    </div>
  );
};

export default MusicPlayer;
