import { useState, useEffect } from 'react';

// Target date: July 4, 2026 10:00:00 WITA (UTC+8)
const TARGET_DATE = new Date('2026-07-04T10:00:00+08:00');

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      const newTimeLeft = difference > 0 ? {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      } : {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {timeItems.map((item, index) => (
          <div key={index} style={styles.card} className="animate-pulse-slow">
            <span style={styles.value} className="font-playful">
              {String(item.value).padStart(2, '0')}
            </span>
            <span style={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
      {timeLeft.isCompleted && (
        <p style={styles.completedText} className="font-playful">
          Hari Bahagia Telah Tiba! 🎉
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px 0',
    width: '100%',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #7A0C02',
    borderRadius: '12px',
    padding: '12px 6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(122, 12, 2, 0.05)',
  },
  value: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#7A0C02',
    lineHeight: '1.2',
  },
  label: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#5C4B49',
    marginTop: '4px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  completedText: {
    textAlign: 'center',
    color: '#7A0C02',
    fontSize: '1.2rem',
    marginTop: '15px',
  },
};

export default Countdown;
