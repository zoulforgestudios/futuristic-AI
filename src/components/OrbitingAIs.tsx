import { useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';

export function OrbitingAIs() {
  const { aiModes } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.3;
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw central Zoul orb
      const zoul = aiModes.find(ai => ai.id === 'zoul');
      if (zoul) {
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
        gradient.addColorStop(0, zoul.color + 'ff');
        gradient.addColorStop(0.5, zoul.color + '80');
        gradient.addColorStop(1, zoul.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = zoul.color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Draw emoji
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(zoul.icon, centerX, centerY);
      }

      // Draw orbiting AIs
      const otherAIs = aiModes.filter(ai => ai.id !== 'zoul');
      otherAIs.forEach((ai, index) => {
        const aiAngle = angle + (index * (Math.PI * 2 / otherAIs.length));
        const x = centerX + Math.cos(aiAngle) * orbitRadius;
        const y = centerY + Math.sin(aiAngle) * orbitRadius;

        // Draw orbit path
        if (ai.active) {
          ctx.strokeStyle = ai.color + '30';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw AI orb
        const size = ai.active ? 25 : 15;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, ai.color + 'ff');
        gradient.addColorStop(0.5, ai.color + '80');
        gradient.addColorStop(1, ai.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = ai.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw emoji
        ctx.font = ai.active ? '16px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ai.icon, x, y);

        // Draw connection lines for active AIs
        if (ai.active) {
          ctx.strokeStyle = ai.color + '40';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      angle += 0.01;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [aiModes]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}
