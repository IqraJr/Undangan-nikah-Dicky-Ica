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
      style={styles.floatingButton}
      title={isPlaying ? "Matikan Musik" : "Putar Musik"}
    >
      {isPlaying ? (
        <Volume2 size={24} color="#7A0C02" style={styles.iconRotate} />
      ) : (
        <VolumeX size={24} color="#7A0C02" />
      )}
    </div>
  );
};

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: '2px solid #7A0C02',
    boxShadow: '0 4px 15px rgba(122, 12, 2, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 999,
    transition: 'all 0.3s ease',
  },
  iconRotate: {
    animation: 'spin 4s linear infinite',
  }
};

export default MusicPlayer;
