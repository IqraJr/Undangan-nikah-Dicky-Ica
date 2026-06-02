
const PageBorder = () => {
  const cornerSvg = (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Outer corner lines */}
      <path 
        d="M 0 0 L 100 0 M 0 0 L 0 100" 
        stroke="var(--burgundy-primary)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 8 8 L 92 8 M 8 8 L 8 92" 
        stroke="var(--gold-primary)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      {/* Decorative leaf scrolls */}
      <path 
        d="M 14 14 Q 60 14 60 35 C 60 55 45 60 35 60 C 20 60 14 45 14 35 Z" 
        stroke="var(--burgundy-primary)" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 14 14 Q 14 60 35 60 C 55 60 60 45 60 35 C 60 20 45 14 35 14 Z" 
        stroke="var(--burgundy-primary)" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Gold solid highlight leaf */}
      <path 
        d="M 18 18 C 32 18 42 28 42 42 C 28 42 18 32 18 18 Z" 
        fill="var(--gold-primary)" 
        opacity="0.45" 
      />
      {/* Sparkles / dots */}
      <circle cx="8" cy="8" r="4.5" fill="var(--burgundy-primary)" />
      <circle cx="92" cy="8" r="2.5" fill="var(--gold-primary)" />
      <circle cx="8" cy="92" r="2.5" fill="var(--gold-primary)" />
      <circle cx="28" cy="28" r="2" fill="var(--gold-primary)" />
    </svg>
  );

  return (
    <div style={styles.borderContainer} className="page-border-container">
      {/* Inner gold boundary */}
      <div style={styles.borderInner} className="page-border-inner"></div>

      {/* Corners */}
      <div style={{ ...styles.corner, top: 0, left: 0 }} className="border-corner tl">
        {cornerSvg}
      </div>
      <div style={{ ...styles.corner, top: 0, right: 0, transform: 'scaleX(-1)' }} className="border-corner tr">
        {cornerSvg}
      </div>
      <div style={{ ...styles.corner, bottom: 0, left: 0, transform: 'scaleY(-1)' }} className="border-corner bl">
        {cornerSvg}
      </div>
      <div style={{ ...styles.corner, bottom: 0, right: 0, transform: 'scale(-1)' }} className="border-corner br">
        {cornerSvg}
      </div>
    </div>
  );
};

const styles = {
  borderContainer: {
    position: 'fixed',
    top: '12px',
    left: '12px',
    right: '12px',
    bottom: '12px',
    border: '1.5px solid var(--burgundy-border-trans)',
    borderRadius: '8px',
    pointerEvents: 'none',
    zIndex: 9990, // Just below bottom nav/popups, but above content
  },
  borderInner: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    right: '4px',
    bottom: '4px',
    border: '1px solid rgba(212, 175, 55, 0.4)',
    borderRadius: '4px',
  },
  corner: {
    position: 'absolute',
    width: '48px',
    height: '48px',
  }
};

export default PageBorder;
