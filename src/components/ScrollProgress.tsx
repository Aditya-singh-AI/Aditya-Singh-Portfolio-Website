import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(265, 90%, 65%), hsl(185, 100%, 55%), hsl(35, 95%, 60%))",
      }}
    />
  );
};

export default ScrollProgress;
