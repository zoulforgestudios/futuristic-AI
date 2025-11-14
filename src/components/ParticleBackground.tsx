import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    const colors = ['#6A00FF', '#00FFFF', '#8B5CF6', '#3B82F6', '#9370DB'];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;

    function animate() {
      if (!canvas || !ctx) return;
      
      // Fade effect instead of clear for trails
      ctx.fillStyle = 'rgba(11, 0, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      particles.forEach((p, index) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Pulse effect
        const pulse = Math.sin(time * 10 + index) * 0.3 + 0.7;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * pulse;
        ctx.shadowBlur = 20 * pulse;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((p2, index2) => {
          if (index !== index2) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - distance / 150) * 0.2 * pulse;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
    />
  );
}
