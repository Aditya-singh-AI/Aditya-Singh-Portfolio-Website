import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

const TextReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: TextRevealProps) => {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.2 });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const offset = directionMap[direction];

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
          y: offset.y,
          x: offset.x,
        }}
        animate={
          inView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: offset.y, x: offset.x }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;
