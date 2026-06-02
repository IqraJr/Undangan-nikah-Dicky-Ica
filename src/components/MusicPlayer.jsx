import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const playerRef = useRef(null);
  const iframeContainerId = 'youtube-audio-player';

  const isPlayingRef = useRef(isPlaying);
  const setIsPlayingRef = useRef(setIsPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    setIsPlayingRef.current = setIsPlaying;
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    // 1. Load YouTube Iframe API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initPlayer = () => {
      // Ensure element exists before initializing
      if (!document.getElementById(iframeContainerId)) return;

      playerRef.current = new window.YT.Player(iframeContainerId, {
        height: '0',
        width: '0',
        videoId: '3pYqVj-FyBk',
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: '3pYqVj-FyBk', // Required for looping single video
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(50); // Set volume to 50%
            if (isPlayingRef.current) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // Check if player states sync
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlayingRef.current(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlayingRef.current(false);
            }
          }
        }
      });
    };

    // 2. Set up callback
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn("Could not destroy YT player:", e);
        }
      }
    };
  }, []);

  // Trigger play/pause when isPlaying prop changes
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.warn("Error toggling YouTube video playback:", e);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Invisible container for YouTube Iframe Player */}
      <div id={iframeContainerId} style={{ display: 'none', width: 0, height: 0 }}></div>

      {/* Circular Floating Music Action Button */}
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
    </>
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
