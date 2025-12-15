import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CursorFollower = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      cursorX.current += (mouseX.current - cursorX.current) * 0.1;
      cursorY.current += (mouseY.current - cursorY.current) * 0.1;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Cursor Glow */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full blur-xl pointer-events-none z-50"
        style={{
          left: -16,
          top: -16,
        }}
        animate={{
          x: cursorX.current,
          y: cursorY.current,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
      {/* Cursor Dot */}
      <motion.div
        className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50"
        style={{
          left: -6,
          top: -6,
        }}
        animate={{
          x: mouseX.current,
          y: mouseY.current,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 500,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CursorFollower;
