import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const PhotoGallery = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    { id: 1, src: './extracted_images/X18_2.png', caption: 'Kebersamaan Kami', rotation: '-2deg' },
    { id: 2, src: './extracted_images/X7_2.png', caption: 'Langkah Awal', rotation: '1deg' },
    { id: 3, src: './extracted_images/X13_1.png', caption: 'Tawa & Ceria', rotation: '-1.5deg' },
    { id: 4, src: './extracted_images/X15_1.png', caption: 'Hari Bahagia', rotation: '2deg' }
  ];

  const handleOpenLightbox = (photo) => {
    setActivePhoto(photo);
  };

  const handleCloseLightbox = () => {
    setActivePhoto(null);
  };

  return (
    <div style={styles.container}>
      {/* Photo Grid */}
      <div style={styles.grid}>
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
            <div style={styles.imageContainer}>
              <img 
                src={photo.src} 
                alt={photo.caption} 
                style={styles.image}
              />
              <div className="hover-overlay" style={styles.hoverOverlay}>
                <ZoomIn color="#FFFFFF" size={24} />
              </div>
            </div>
            <div className="caption" style={styles.captionText}>{photo.caption}</div>
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
              alt={activePhoto.caption} 
              style={styles.lightboxImg}
            />
            <p style={styles.lightboxCaption} className="font-playful">{activePhoto.caption}</p>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    justifyItems: 'center',
  },
  polaroidWrapper: {
    cursor: 'pointer',
    width: '100%',
    maxWidth: '180px',
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
    marginTop: '10px',
    textAlign: 'center',
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
  },
  lightboxCaption: {
    color: '#FFFFFF',
    fontSize: '1.2rem',
    marginTop: '15px',
  }
};

// Add CSS injection for hover effect directly
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    try {
      styleSheet.insertRule(`
        .polaroid-frame:hover .hover-overlay {
          opacity: 1 !important;
        }
      `, styleSheet.cssRules.length);
    } catch (e) {}
  }
}

export default PhotoGallery;
