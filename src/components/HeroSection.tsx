import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Sparkles,
  Code2,
  Palette,
  Zap,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

// Typewriter Hook
const useTypewriter = (words: string[], speed = 100, pause = 2000) => {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          if (charIndex + 1 === currentWord.length)
            setTimeout(() => setIsDeleting(true), pause);
        } else {
          setDisplay(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
          if (charIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);
  return display;
};

// Animated Counter
const AnimatedCounter = ({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += target / 40;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      requestAnimationFrame(step);
    };
    step();
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Animated Mesh Gradient Background
const MeshGradient = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(265 90% 65% / 0.08) 0%, transparent 60%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large morphing blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
        style={{ background: "hsl(265, 90%, 55%)", top: "10%", left: "5%" }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.05]"
        style={{ background: "hsl(185, 100%, 50%)", top: "30%", right: "0%" }}
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-[0.04]"
        style={{ background: "hsl(35, 95%, 55%)", bottom: "10%", left: "40%" }}
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      {/* Radial center glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(265 90% 65% / 0.04) 0%, transparent 60%)",
        }}
      />
      {/* Decorative geometric shapes */}
      <motion.div
        className="absolute top-[15%] right-[12%] w-20 h-20 border border-violet-500/10 rounded-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[8%] w-14 h-14 border border-cyan-500/10 rounded-full"
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[60%] right-[20%] w-3 h-3 bg-violet-400/20 rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[30%] left-[30%] w-2 h-2 bg-cyan-400/20 rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[35%] w-2 h-2 bg-amber-400/15 rounded-full"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      {/* SVG cross lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#vFade)"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#vFade)"
          strokeWidth="0.5"
        />
        <line
          x1="20%"
          y1="0"
          x2="20%"
          y2="100%"
          stroke="url(#vFade)"
          strokeWidth="0.3"
          strokeDasharray="8 16"
        />
        <line
          x1="80%"
          y1="0"
          x2="80%"
          y2="100%"
          stroke="url(#vFade)"
          strokeWidth="0.3"
          strokeDasharray="8 16"
        />
        <defs>
          <linearGradient id="vFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const roleText = useTypewriter(
    [
      "Full Stack Developer",
      "UI/UX Designer",
      "Creative Coder",
      "Problem Solver",
    ],
    80,
    2500,
  );

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume Aditya Singh.pdf";
    link.download = "Resume Aditya Singh.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  const letterReveal = {
    hidden: { y: "110%", opacity: 0, rotateX: 50 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const nameLetters = "ADITYA".split("");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <MeshGradient />

      <motion.div className="relative z-10 max-w-7xl mx-auto w-full section-padding">
        <motion.div
          className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh]"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Left — Text */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <motion.div
                className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: "left" }}
              />
              <motion.span
                className="text-violet-400 text-sm tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Portfolio 2025
              </motion.span>
            </motion.div>

            <div className="space-y-1" style={{ perspective: "1000px" }}>
              <div className="overflow-hidden pb-2">
                <motion.h1
                  variants={letterReveal}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-[-0.04em] text-foreground/60"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Hi, I'm
                </motion.h1>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.div variants={letterReveal} className="flex">
                  {nameLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] tracking-[-0.04em] inline-block"
                      style={{
                        fontFamily: "var(--font-display)",
                        background:
                          "linear-gradient(135deg, hsl(265, 90%, 65%), hsl(185, 100%, 55%), hsl(35, 95%, 60%))",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "text-shimmer 4s linear infinite",
                      }}
                      initial={{
                        opacity: 0,
                        y: 20,
                        rotateZ: Math.random() * 10 - 5,
                        scale: 0.8,
                      }}
                      animate={
                        loaded ? { opacity: 1, y: 0, rotateZ: 0, scale: 1 } : {}
                      }
                      transition={{
                        delay: 0.5 + i * 0.07,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.h1
                  variants={letterReveal}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] tracking-[-0.04em] text-white/15"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Singh.
                </motion.h1>
              </div>
            </div>

            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-glow" />
              <p
                className="text-lg md:text-xl text-muted-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {roleText}
                <motion.span
                  className="inline-block w-[2px] h-5 bg-violet-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground max-w-lg leading-relaxed text-base"
            >
              Crafting digital experiences with modern technologies. Passionate
              about creating beautiful, functional, and user-centered
              applications that make a difference.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <MagneticButton
                as="a"
                href="#projects"
                className="group relative px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold tracking-wide hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-2"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>View My Work</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </MagneticButton>
              <MagneticButton
                onClick={downloadResume}
                className="px-8 py-3.5 rounded-full font-semibold border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 transition-all duration-300"
              >
                Download CV
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3 pt-2">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Aditya-singh-AI",
                  label: "GitHub",
                },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-singh-aiml", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                {
                  icon: Mail,
                  href: "mailto:aditya.asb24@gmail.com",
                  label: "Email",
                },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 rounded-xl border border-white/[0.06] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile + Stats */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-8"
            variants={fadeUp}
          >
            <motion.div className="relative">
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  width: "calc(100% + 20px)",
                  height: "calc(100% + 20px)",
                  top: "-10px",
                  left: "-10px",
                }}
              >
                <div
                  className="absolute inset-[-50%] animate-spin-slow"
                  style={{
                    background:
                      "conic-gradient(from 0deg, hsl(265,90%,65%), hsl(185,100%,55%), hsl(35,95%,60%), hsl(265,90%,65%))",
                  }}
                />
                <div className="absolute inset-[3px] rounded-[calc(1.5rem-3px)] bg-background" />
              </div>
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, hsl(265 90% 65% / 0.4), transparent 70%)",
                  width: "calc(100% + 40px)",
                  height: "calc(100% + 40px)",
                  top: "-20px",
                  left: "-20px",
                }}
              />
              <motion.img
                src="/Hero image.png"
                alt="Aditya Singh"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover border-4 border-background z-10 cursor-pointer hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-shadow duration-500"
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {[
                {
                  icon: Sparkles,
                  x: "-5%",
                  y: "-5%",
                  delay: 1.1,
                  color: "text-violet-400",
                },
                {
                  icon: Code2,
                  x: "85%",
                  y: "15%",
                  delay: 1.3,
                  color: "text-cyan-400",
                },
                {
                  icon: Palette,
                  x: "-8%",
                  y: "70%",
                  delay: 1.5,
                  color: "text-cyan-400",
                },
                {
                  icon: Zap,
                  x: "88%",
                  y: "80%",
                  delay: 1.7,
                  color: "text-amber-400",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 rounded-xl glass-effect flex items-center justify-center z-20"
                  style={{ left: b.x, top: b.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay: b.delay },
                    scale: { delay: b.delay, type: "spring" },
                    y: { delay: b.delay + 0.5, duration: 3, repeat: Infinity },
                  }}
                >
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-3 gap-4 text-center w-full max-w-xs">
              {[
                { value: 10, suffix: "+", label: "Projects" },
                { value: 2, suffix: "+", label: "Years" },
                { value: 15, suffix: "+", label: "Tech Stack" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass-effect rounded-xl p-3 group hover:border-violet-500/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12, duration: 0.6 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 30px rgba(139,92,246,0.1)",
                  }}
                >
                  <div className="text-2xl font-bold gradient-text">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-9 rounded-full border-2 border-violet-400/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-violet-400"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span
            className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
