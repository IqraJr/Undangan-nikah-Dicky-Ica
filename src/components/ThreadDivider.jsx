
const ThreadDivider = () => {
  return (
    <div style={styles.container}>
      <svg 
        width="120" 
        height="32" 
        viewBox="0 0 120 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={styles.svg}
      >
        {/* Looping red thread path */}
        <path 
          d="M0 16 Q30 16 46 16 C53 16 56 8 56 12 C56 22 64 22 64 12 C64 8 67 16 74 16 Q100 16 120 16" 
          stroke="var(--burgundy-primary)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none" 
        />
        {/* Hanging heart path */}
        <path 
          d="M60 7 C59 5.5 57 5.5 57 7 C57 9 60 11 60 11 C60 11 63 9 63 7 C63 5.5 61 5.5 60 7 Z" 
          fill="var(--burgundy-primary)" 
        />
      </svg>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0 16px 0',
  },
  svg: {
    display: 'block',
    opacity: 0.8,
  }
};

export default ThreadDivider;
