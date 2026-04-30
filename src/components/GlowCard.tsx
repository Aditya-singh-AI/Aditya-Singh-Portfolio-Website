import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowCard = ({ children, className = "", glowColor = "rgba(139, 92, 246, 0.15)" }: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mouse-following spotlight */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500"
        style={{
          width: "300px",
          height: "300px",
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      {/* Animated border glow */}
      <div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
