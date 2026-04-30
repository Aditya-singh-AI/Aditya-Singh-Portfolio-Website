import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionDivider = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="relative py-8 flex items-center justify-center">
      <motion.div
        className="h-[1px] w-full max-w-md"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(265 90% 65% / 0.25), hsl(185 100% 55% / 0.25), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "var(--gradient-accent)",
        }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
      />
    </div>
  );
};

export default SectionDivider;
