import { Code, Palette, Smartphone, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import GlowCard from "./GlowCard";

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const slideInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
  const slideInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  const features = [
    { icon: <Code className="w-6 h-6" />, title: "Clean Code", description: "Writing maintainable, scalable, and efficient code following best practices.", accent: "violet", glow: "rgba(139, 92, 246, 0.12)" },
    { icon: <Palette className="w-6 h-6" />, title: "Creative Design", description: "Crafting beautiful and intuitive user interfaces that delight users.", accent: "cyan", glow: "rgba(34, 211, 238, 0.12)" },
    { icon: <Smartphone className="w-6 h-6" />, title: "Responsive", description: "Building applications that work seamlessly across all devices and screens.", accent: "violet", glow: "rgba(139, 92, 246, 0.12)" },
    { icon: <Zap className="w-6 h-6" />, title: "Performance", description: "Optimizing for speed, efficiency, and exceptional user experience.", accent: "amber", glow: "rgba(251, 191, 36, 0.10)" },
  ];

  return (
    <section className="py-28 section-padding relative" id="about" ref={sectionRef}>
      <motion.div className="absolute top-20 -left-10 text-[12rem] md:text-[16rem] font-bold text-white/[0.015] pointer-events-none select-none leading-none"
        style={{ fontFamily: "var(--font-display)", y: watermarkY, x: watermarkX }}>WHO<br />AM I</motion.div>

      <motion.div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>01.</span>
            <motion.div className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent"
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "left" }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            I'm a passionate developer with experience creating digital solutions that combine beautiful design with robust functionality.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <motion.div className="lg:col-span-7 space-y-6" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.h3 variants={slideInLeft} className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Bringing Ideas to <span className="gradient-text">Life</span>
            </motion.h3>
            <motion.p variants={slideInLeft} className="text-muted-foreground leading-relaxed">
              With a strong foundation in both frontend and backend development, I create comprehensive solutions that not only look great but also perform exceptionally. My approach combines technical expertise with creative problem-solving to deliver products that users love.
            </motion.p>
            <motion.p variants={slideInLeft} className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and staying ahead of industry trends.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Projects Done", value: "10+" },
                { label: "Location", value: "Gwalior, MP" },
                { label: "Languages", value: "EN, HI" },
              ].map((stat, i) => (
                <motion.div key={i} className="glass-effect rounded-xl p-4 text-center hover:border-violet-500/20 transition-all duration-300"
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(139,92,246,0.08)" }}>
                  <div className="text-lg font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-4">
              {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Next.js", "PostgreSQL"].map((tech, i) => (
                <motion.span key={tech}
                  className="px-3 py-1.5 text-sm bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -2, backgroundColor: "rgba(139, 92, 246, 0.15)", boxShadow: "0 4px 15px rgba(139,92,246,0.2)" }}>
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-5" variants={slideInRight} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div className="relative p-[1.5px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 animate-spin-slow" style={{ background: "conic-gradient(from 0deg, hsl(265,90%,65%), hsl(185,100%,55%), hsl(35,95%,60%), hsl(265,90%,65%))" }} />
              <div className="bg-card rounded-2xl p-8 relative">
                <div className="text-center mb-6">
                  <motion.img src="/ADDI PHOTO 1.jpg" alt="Aditya Singh"
                    className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-violet-500/20"
                    animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.2)", "0 0 40px rgba(139,92,246,0.3)", "0 0 20px rgba(139,92,246,0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity }} whileHover={{ scale: 1.08 }} />
                  <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Aditya Singh</h4>
                  <p className="text-violet-400 text-sm">Full Stack Developer</p>
                </div>
                <div className="space-y-4 border-t border-white/[0.06] pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><span className="text-base">📍</span> Location</span>
                    <span className="text-foreground font-medium">Gwalior, MP</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><span className="text-base">🎓</span> Education</span>
                    <div className="text-right">
                      <div className="text-foreground font-medium">B.Tech CSE (AIML)</div>
                      <div className="text-xs text-muted-foreground mt-0.5">🏫 MITS, Gwalior</div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2 mt-0.5"><span className="text-base">📜</span> Certs</span>
                    <div className="flex flex-col items-end gap-1.5">
                      {["AWS Cloud", "Machine Learning", "Full Stack Dev"].map(cert => (
                        <span key={cert} className="text-[11px] bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded border border-violet-500/20">{cert}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><span className="text-base">🚀</span> Projects</span>
                    <span className="text-foreground font-medium">10+ Completed</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm bg-green-500/10 border border-green-500/20 py-2 rounded-lg">
                  <motion.div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </motion.div>
                  <span className="text-green-400 font-medium tracking-wide">Open to Work</span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a href="#contact" className="text-center py-2.5 rounded-lg bg-white text-slate-950 font-bold text-sm hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">Hire Me</a>
                  <button className="text-center py-2.5 rounded-lg border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors" onClick={() => {
                    const link = document.createElement("a"); link.href = "/Resume Aditya Singh.pdf"; link.download = "Resume Aditya Singh.pdf";
                    document.body.appendChild(link); link.click(); document.body.removeChild(link);
                  }}>Resume</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards with GlowCard */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUp}>
              <GlowCard className="rounded-2xl border border-white/[0.04] bg-card/40 hover:border-violet-500/20 transition-all duration-500" glowColor={feature.glow}>
                <div className="p-6">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div className={`mb-4 p-3 rounded-xl w-fit ${
                    feature.accent === "violet" ? "bg-violet-500/10 text-violet-400" :
                    feature.accent === "cyan" ? "bg-cyan-500/10 text-cyan-400" : "bg-amber-500/10 text-amber-400"
                  }`} whileHover={{ scale: 1.15, rotate: 5 }}>{feature.icon}</motion.div>
                  <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;