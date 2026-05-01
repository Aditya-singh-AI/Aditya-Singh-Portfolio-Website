import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 0 : 45;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number; color: string }[] = [];

    const colors = [
      "rgba(167, 139, 250,",  // violet
      "rgba(34, 211, 238,",   // cyan
      "rgba(251, 191, 36,",   // amber (rare)
    ];

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (particleCount === 0) {
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    for (let i = 0; i < particleCount; i++) {
      const colorWeight = Math.random();
      const color = colorWeight < 0.5 ? colors[0] : colorWeight < 0.9 ? colors[1] : colors[2];
      particles.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.35 + 0.08,
        color,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.o})`;
        ctx.fill();

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.02) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Aurora blobs */}
      {[
        { color: "rgba(139, 92, 246, 0.07)", top: "10%", left: "15%", delay: "0s", size: "500px" },
        { color: "rgba(34, 211, 238, 0.05)", top: "55%", left: "65%", delay: "3s", size: "450px" },
        { color: "rgba(251, 191, 36, 0.03)", top: "35%", left: "45%", delay: "6s", size: "400px" },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl animate-aurora"
          style={{
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};

export default FloatingParticles;
