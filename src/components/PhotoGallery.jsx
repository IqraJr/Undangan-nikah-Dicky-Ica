import { useState } from 'react';
import { X, ZoomIn, Heart } from 'lucide-react';

const PhotoGallery = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    { id: 1, src: './extracted_images/ica-kecil.png', rotation: '-2deg' },
    { id: 2, src: './extracted_images/dicky-kecil.png', rotation: '1deg' },
    { id: 3, src: './extracted_images/foto1.png', rotation: '-1.5deg' },
    { id: 4, src: './extracted_images/foto2.png', rotation: '2deg' }
  ];

  const handleOpenLightbox = (photo) => {
    setActivePhoto(photo);
  };

  const handleCloseLightbox = () => {
    setActivePhoto(null);
  };

  return (
    <div style={styles.container}>
      {/* Photo Grid - now styled responsively in CSS */}
      <div className="photo-gallery-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="polaroid-frame" 
            style={{ 
              ...styles.polaroidWrapper, 
              transform: `rotate(${photo.rotation})` 
            }}
            onClick={() => handleOpenLightbox(photo)}
          >
            {/* Elegant double-dashed inner gold border */}
            <div className="polaroid-inner-border">
              <div style={styles.imageContainer}>
                <img 
                  src={photo.src} 
                  alt="Galeri Foto" 
                  style={styles.image}
                />
                <div className="hover-overlay" style={styles.hoverOverlay}>
                  <ZoomIn color="#FFFFFF" size={24} />
                </div>
              </div>
              
              {/* Elegant Golden Heart Ornament inside the gold dashed frame */}
              <div className="caption" style={styles.captionText}>
                <div style={styles.ornamentContainer}>
                  <div style={styles.ornamentLine}></div>
                  <Heart size={10} color="var(--gold-primary)" fill="var(--gold-primary)" style={{ opacity: 0.8 }} />
                  <div style={styles.ornamentLine}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div style={styles.lightboxOverlay} onClick={handleCloseLightbox} className="animate-fade-in">
          <button style={styles.closeBtn} onClick={handleCloseLightbox}>
            <X size={28} color="#FFFFFF" />
          </button>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={activePhoto.src} 
              alt="Preview Foto" 
              style={styles.lightboxImg}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    margin: '20px 0',
  },
  polaroidWrapper: {
    cursor: 'pointer',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '2px',
  },
  image: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    display: 'block',
  },
  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(122, 12, 2, 0.4)',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease',
  },
  captionText: {
    fontSize: '0.95rem',
    marginTop: '8px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ornamentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '4px 0',
  },
  ornamentLine: {
    height: '1px',
    width: '20px',
    backgroundColor: 'rgba(212, 175, 55, 0.35)',
  },
  lightboxOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10000,
  },
  lightboxContent: {
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lightboxImg: {
    maxWidth: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
    borderRadius: '6px',
    border: '4px solid #FFFFFF',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  }
};

export default PhotoGallery;
