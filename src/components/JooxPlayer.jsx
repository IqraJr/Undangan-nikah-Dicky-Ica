import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';

const JooxPlayer = ({ isPlaying, setIsPlaying, currentTime, duration, onSeek }) => {
  const coverImage = './extracted_images/foto2.png';

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    onSeek(Number(e.target.value));
  };

  return (
    <div className="joox-player-card animate-pulse-slow">
      {/* Vinyl & Image container */}
      <div className="joox-vinyl-section">
        <div className={`joox-vinyl-disk ${isPlaying ? 'spinning' : ''}`}>
          <div className="joox-vinyl-lines"></div>
          {/* Couple photo center art */}
          <div className="joox-cover-wrapper">
            <img 
              src={coverImage} 
              alt="Album Cover" 
              className="joox-cover-art" 
            />
          </div>
          <div className="joox-center-hole"></div>
        </div>
      </div>

      {/* Control & Details section */}
      <div className="joox-controls-section">
        <div className="joox-song-details">
          <h4 className="joox-song-title font-playful">Hari Bahagia</h4>
          <p className="joox-song-artist">Ica & Dicky</p>
        </div>

        {/* Scrubber Timeline Progress */}
        <div className="joox-timeline-container">
          <span className="joox-time font-sans">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min={0} 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleProgressChange} 
            className="joox-slider" 
          />
          <span className="joox-time font-sans">{formatTime(duration)}</span>
        </div>

        {/* Buttons Controls */}
        <div className="joox-btn-group">
          <button 
            onClick={() => onSeek(Math.max(0, currentTime - 10))} 
            className="joox-media-btn"
            title="Mundur 10 Detik"
            aria-label="Mundur 10 Detik"
          >
            <RotateCcw size={18} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="joox-play-btn"
            title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
            aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
            )}
          </button>

          <button 
            onClick={() => onSeek(Math.min(duration, currentTime + 10))} 
            className="joox-media-btn"
            title="Maju 10 Detik"
            aria-label="Maju 10 Detik"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JooxPlayer;
