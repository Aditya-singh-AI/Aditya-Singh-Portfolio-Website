import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");

  const triggerExit = useCallback(() => {
    setPhase("exit");
    setTimeout(() => onComplete(), 900);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(triggerExit, 300);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "hsl(240, 15%, 4%)" }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Decorative corner marks */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-violet-400/30" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyan-400/30" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-violet-400/30" />

          {/* Monogram */}
          <motion.div
            className="mb-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(265, 90%, 65%), hsl(185, 100%, 55%), hsl(35, 95%, 60%), hsl(265, 90%, 65%))",
                }}
              />
              <div className="absolute inset-[2px] rounded-[14px] bg-[hsl(240,15%,4%)] flex items-center justify-center">
                <span className="text-xl font-bold gradient-text font-display">
                  AS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-accent)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-4 text-sm tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "hsl(265, 90%, 65%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.min(Math.floor(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
