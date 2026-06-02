import { useEffect, useRef } from 'react';

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
    const particleCount = 40; // Perfect balance for rich visual and 60FPS performance

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles class
    class Particle {
      constructor(isInitial = false) {
        this.x = Math.random() * canvas.width;
        // Spread particles vertically on load, otherwise start them above screen
        this.y = isInitial ? Math.random() * canvas.height : -20;
        
        // 60% petals, 40% sparkles
        this.type = Math.random() > 0.45 ? 'petal' : 'sparkle';
        
        if (this.type === 'petal') {
          this.size = Math.random() * 8 + 6;
          this.speedX = Math.random() * 0.3 - 0.15;
          this.speedY = Math.random() * 0.5 + 0.45; // Gentle fall
          
          // Mix of burgundy and soft pink tones
          const petalColors = [
            'rgba(122, 12, 2, 0.18)',   // Burgundy soft
            'rgba(192, 45, 36, 0.14)',   // Burgundy light
            'rgba(224, 150, 155, 0.22)', // Blush rose pink
            'rgba(243, 220, 222, 0.25)', // White rose blush
          ];
          this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
          
          this.rotation = Math.random() * 360;
          this.rotationSpeed = Math.random() * 1.2 - 0.6;
          
          // 3D rotation variables
          this.rotationY = Math.random() * Math.PI;
          this.rotationYSpeed = Math.random() * 0.02 + 0.015;
          
          // Sine wave offset for wind drift
          this.windOffset = Math.random() * 100;
        } else {
          // Sparkle configs
          this.size = Math.random() * 2.5 + 1.5;
          this.speedX = Math.random() * 0.15 - 0.075;
          this.speedY = Math.random() * 0.3 + 0.2; // Slower drift
          
          // Gold base color, opacity will be dynamic
          this.color = 'rgba(212, 175, 55, '; 
          this.baseOpacity = Math.random() * 0.45 + 0.25;
          this.opacity = this.baseOpacity;
          this.twinkleSpeed = Math.random() * 0.04 + 0.02;
          this.time = Math.random() * 100;
        }
      }

      update() {
        if (this.type === 'petal') {
          // Wind swing using sine wave
          this.x += this.speedX + Math.sin(this.y / 45 + this.windOffset) * 0.35;
          this.y += this.speedY;
          this.rotation += this.rotationSpeed;
          this.rotationY += this.rotationYSpeed;

          // Recycle petal when it goes off screen
          if (this.y > canvas.height + 20) {
            this.reset();
          }
        } else {
          // Sparkle drift
          this.x += this.speedX + Math.sin(this.y / 60) * 0.1;
          this.y += this.speedY;
          
          // Twinkle effect (sine wave opacity oscillation)
          this.time += this.twinkleSpeed;
          this.opacity = this.baseOpacity + Math.sin(this.time) * 0.2;
          
          // Clamp opacity limits
          if (this.opacity < 0.15) this.opacity = 0.15;
          if (this.opacity > 0.8) this.opacity = 0.8;

          // Recycle sparkle when off screen
          if (this.y > canvas.height + 10) {
            this.reset();
          }
        }

        // Screen boundary wrap for horizontal movement
        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      reset() {
        this.y = -20;
        this.x = Math.random() * canvas.width;
        if (this.type === 'petal') {
          this.speedY = Math.random() * 0.5 + 0.45;
          this.rotationY = 0;
        } else {
          this.speedY = Math.random() * 0.3 + 0.2;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'petal') {
          ctx.rotate((this.rotation * Math.PI) / 180);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          
          // Simulate 3D rotation by squishing the shape width
          const scaleX = Math.sin(this.rotationY);
          ctx.scale(scaleX, 1);
          
          // Draw organic teardrop petal
          ctx.moveTo(0, -this.size);
          ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.4, this.size * 0.8, this.size * 0.6, 0, this.size);
          ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.6, -this.size * 0.8, -this.size * 0.4, 0, -this.size);
          ctx.fill();
        } else {
          // Draw glowing golden 4-point star
          ctx.fillStyle = `${this.color}${this.opacity})`;
          ctx.beginPath();
          const r = this.size;
          
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Initialize particles spread across the entire screen height
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(true));
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
        pointerEvents: 'none', // Allow clicks through
      }}
    />
  );
};

export default ParticleBackground;
