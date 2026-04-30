import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const isTouchDevice = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    window.addEventListener("mousemove", handleMouseMove);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-text]");
      if (interactive) {
        setIsHovering(true);
        const cursorText = interactive.getAttribute("data-cursor-text");
        setHoverText(cursorText || "");
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setHoverText("");
    };

    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [handleMouseMove]);

  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2 border flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 36,
            height: isHovering ? 64 : 36,
            borderColor: isHovering
              ? "rgba(167, 139, 250, 0.5)"
              : "rgba(167, 139, 250, 0.25)",
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {hoverText && (
            <motion.span
              className="text-[10px] font-medium text-violet-300 tracking-wider uppercase"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "hsl(265, 90%, 70%)",
          }}
          animate={{
            width: isHovering ? 4 : 6,
            height: isHovering ? 4 : 6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
