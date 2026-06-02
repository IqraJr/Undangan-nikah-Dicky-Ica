import { useState, useEffect, useRef } from 'react';

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

    let currentIndex = 0;
    let accumulatedText = '';

    // Clear text asynchronously to avoid React setState warnings
    const resetTimer = setTimeout(() => {
      setDisplayedText('');
    }, 0);

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        accumulatedText += text.charAt(currentIndex);
        setDisplayedText(accumulatedText);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(timer);
    };
  }, [start, text, speed]);

  return (
    <span ref={containerRef}>
      {displayedText}
    </span>
  );
};

export default TypingText;
