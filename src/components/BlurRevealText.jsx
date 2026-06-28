import { useState, useEffect, useRef } from 'react';

const BlurRevealText = ({ text, delay = 200, triggerOnScroll = false, wordDelay = 35 }) => {
  const [start, setStart] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!triggerOnScroll) {
      const timer = setTimeout(() => setStart(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, triggerOnScroll]);

  // Split text by newlines first to preserve manual line breaks
  const lines = text.split('\n');

  return (
    <span ref={containerRef} style={{ display: 'block', width: '100%' }}>
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');
        
        // Calculate cumulative word index to offset stagger delay across multiple lines
        let wordCounter = 0;
        for (let i = 0; i < lineIdx; i++) {
          wordCounter += lines[i].split(' ').length;
        }

        return (
          <span 
            key={lineIdx} 
            style={{ 
              display: 'block', 
              marginBottom: lineIdx < lines.length - 1 ? '4px' : '0',
              lineHeight: '1.8'
            }}
          >
            {words.map((word, wordIdx) => {
              const globalIdx = wordCounter + wordIdx;
              const wordStyle = {
                display: 'inline-block',
                marginRight: '6px',
                filter: start ? 'blur(0px)' : 'blur(8px)',
                opacity: start ? 1 : 0,
                transform: start ? 'translateY(0px)' : 'translateY(4px)',
                transition: 'filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: start ? `${globalIdx * wordDelay}ms` : '0ms',
              };

              return (
                <span key={wordIdx} style={wordStyle}>
                  {word}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export default BlurRevealText;
