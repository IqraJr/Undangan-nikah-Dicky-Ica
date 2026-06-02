import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
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
