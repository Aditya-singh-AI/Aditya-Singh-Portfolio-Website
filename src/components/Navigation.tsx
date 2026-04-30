import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    setHidden(diff > 5 && latest > 150);
    setScrolled(latest > 50);
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About", num: "01" },
    { href: "#skills", label: "Skills", num: "02" },
    { href: "#projects", label: "Projects", num: "03" },
    { href: "#experience", label: "Experience", num: "04" },
    { href: "#contact", label: "Contact", num: "05" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleResumeClick = () => {
    window.open("/Resume Aditya Singh.pdf", "_blank");
  };

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`relative rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-background/60 backdrop-blur-2xl border border-white/[0.06] shadow-lg shadow-black/20"
              : "bg-transparent border border-transparent"
          }`}
        >
          <div className="px-4 md:px-6">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative group flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-lg relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
                    style={{
                      background: "conic-gradient(from 0deg, hsl(265, 90%, 65%), hsl(185, 100%, 55%), hsl(35, 95%, 60%), hsl(265, 90%, 65%))",
                    }}
                  />
                  <div className="absolute inset-[1.5px] rounded-[6.5px] bg-background flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text font-display">AS</span>
                  </div>
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-3 py-1.5 text-sm transition-colors duration-300 group"
                    whileHover={{ y: -1 }}
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        activeSection === link.href.slice(1)
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <span className="text-violet-400/60 text-[10px] font-mono mr-1">{link.num}</span>
                      {link.label}
                    </span>
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                        style={{ background: "var(--gradient-accent)" }}
                        layoutId="activeNavIndicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
                <motion.button
                  onClick={handleResumeClick}
                  className="ml-3 px-4 py-1.5 text-sm font-medium rounded-full relative overflow-hidden group"
                  style={{
                    border: "1px solid hsl(265, 90%, 65%, 0.3)",
                    color: "hsl(265, 90%, 65%)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Resume</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-violet-500/10" />
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
            <div className="relative flex flex-col items-center space-y-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-3xl font-bold text-foreground hover:text-violet-400 transition-colors"
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-violet-400/40 text-base font-mono mr-3">{link.num}.</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  handleResumeClick();
                  setIsOpen(false);
                }}
                className="mt-6 px-8 py-3 text-violet-400 rounded-full text-lg font-medium"
                style={{ border: "1px solid hsl(265, 90%, 65%, 0.3)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: navLinks.length * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;