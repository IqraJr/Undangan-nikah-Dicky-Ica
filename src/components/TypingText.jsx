import React, { useState, useEffect, useRef } from 'react';

const TypingText = ({ text, speed = 40, delay = 300, triggerOnScroll = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [start, setStart] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!triggerOnScroll) {
      const timer = setTimeout(() => setStart(true), delay);
      return () => clearTimeout(timer);
    }

    // Trigger typing when scrolled into view
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

  useEffect(() => {
    if (!start) return;

    let timer;
    let currentIndex = 0;

    // Clear text before starting typing
    setDisplayedText('');

    timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [start, text, speed]);

  return (
    <span ref={containerRef}>
      {displayedText}
      {displayedText.length < text.length && start && (
        <span style={styles.cursor} className="typing-cursor">|</span>
      )}
    </span>
  );
};

const styles = {
  cursor: {
    display: 'inline-block',
    animation: 'blink 0.8s step-end infinite',
    color: '#7A0C02',
    fontWeight: 'bold',
    marginLeft: '2px',
  }
};

// Insert cursor blink keyframes dynamically if not present
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    try {
      styleSheet.insertRule(`
        @keyframes blink {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
      `, styleSheet.cssRules.length);
    } catch (e) {}
  }
}

export default TypingText;
