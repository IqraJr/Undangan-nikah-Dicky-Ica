import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
    // Configs
    const particleCount = 25; // Keep it low for performance
    const colors = [
      'rgba(122, 12, 2, 0.15)',  // Burgundy soft
      'rgba(192, 45, 36, 0.12)',  // Burgundy light
      'rgba(243, 236, 224, 0.6)', // Cream sparkle
      'rgba(212, 175, 55, 0.25)', // Gold sparkle
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 5 + 3;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 0.5 - 0.25;
        // Shape: 0 = petal/ellipse, 1 = star/circle
        this.shapeType = Math.random() > 0.6 ? 1 : 0;
      }

      update() {
        this.x += this.speedX + Math.sin(this.y / 30) * 0.15; // Swirling drift
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
          this.speedY = Math.random() * 0.8 + 0.4;
        }
        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        ctx.beginPath();
        if (this.shapeType === 0) {
          // Draw a leaf/petal shape
          ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, 2 * Math.PI);
        } else {
          // Draw a small circle/glitter star
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Behind all content
        pointerEvents: 'none', // Allow clicking elements through canvas
      }}
    />
  );
};

export default ParticleBackground;
