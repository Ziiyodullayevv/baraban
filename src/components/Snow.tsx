import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // canvas turi

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvas mavjudligini tekshirish

    const ctx = canvas.getContext('2d'); // kontekst olish
    if (!ctx) return; // agar kontekst topilmasa, qaytish

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes: Snowflake[] = [];
    const maxSnowflakes = 100;

    class Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      wind: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.radius = Math.random() * 4 + 1;
        this.speed = Math.random() * 2 + 1;
        this.wind = Math.random() * 2 - 1;
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;

        if (canvas && this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }

        if (canvas && (this.x > canvas.width || this.x < 0)) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      }
    }

    function createSnowflakes() {
      for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
      }
    }

    function animate() {
      if (!ctx) return;
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
      });

      requestAnimationFrame(animate);
    }

    createSnowflakes();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Snowfall;
