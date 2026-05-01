import { Github, Linkedin, Mail, Heart, Twitter, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const currentYear = new Date().getFullYear();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Aditya-singh-AI" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-singh-aiml" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:aditya.asb24@gmail.com" },
  ];

  const navLinks = [
    { href: "#about", label: "About" }, { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" }, { href: "#experience", label: "Experience" }, { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.footer className="py-16 section-padding relative" ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(265 90% 65% / 0.2), hsl(185 100% 55% / 0.2), transparent)" }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div variants={fadeUp}>
            <motion.div className="text-2xl font-bold gradient-text mb-3 inline-block" style={{ fontFamily: "var(--font-display)" }} whileHover={{ scale: 1.05 }}>
              Aditya Singh
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Crafting digital experiences with passion, precision, and modern technologies.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-400 mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-violet-400 transition-colors py-1"
                  onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-400 mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, i) => (
                <motion.a key={i} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                  className="p-2.5 rounded-xl border border-white/[0.04] hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <link.icon className="w-4 h-4 text-muted-foreground" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4" variants={fadeUp}>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {currentYear} Aditya Singh. Made with
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-4 h-4 text-violet-400 fill-current" />
            </motion.span>
            and lots of coffee.
          </p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2.5 rounded-xl border border-white/[0.04] hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300"
            whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
            <ArrowUp className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;