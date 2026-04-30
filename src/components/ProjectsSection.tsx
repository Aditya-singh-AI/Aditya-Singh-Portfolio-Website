import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef } from "react";

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };

  const projects = [
    { 
      title: "DeepScanX", 
      description: "Unified AI Radiology & Pathology Assistant. A state-of-the-art medical imaging platform for rapid assessment of histopathology and radiology images using explainable Deep Learning.", 
      image: "DeepScanX.png?w=600&h=300&fit=crop",
      technologies: ["React", "Flask", "PyTorch", "Supabase", "Tailwind CSS"], 
      demoLink: "", 
      codeLink: "https://github.com/Aditya-singh-AI/DeepScanX", 
      featured: true, 
      year: "2026" 
    },
    { title: "Badminton Tournament System", description: "Tournament website for registration with modern UI, payment integration, and admin dashboard.", image: "Shuttleverse.png?w=600&h=300&fit=crop",
      technologies: ["React", "Node.js", "Supabase", "Razorpay", "Tailwind CSS"], demoLink: "https://badminton-tournament-website.vercel.app/", codeLink: "#", featured: true, year: "2025" },
    { title: "AI Voice Assistant", description: "Intelligent voice-enabled assistant powered by semantic analysis and natural language processing with real-time speech recognition.", image: "image.png?w=600&h=300&fit=crop",
      technologies: ["Python", "Firebase", "React", "LLM", "ElevenLabs"], demoLink: "https://celcius-ai-voice-assistant.vercel.app/", codeLink: "#", featured: true, year: "2025" },
    { title: "Weather App — SimplyWeather", description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.", image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=300&fit=crop",
      technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation"], demoLink: "https://simply-weather-app.vercel.app/", codeLink: "#", featured: false, year: "2024" },
    { title: "Portfolio Website", description: "A responsive portfolio website with smooth animations, dark mode support, and optimized performance.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Vercel"], demoLink: "", codeLink: "#", featured: false, year: "2024" },
  ];

  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <section className="py-28 section-padding relative" id="projects" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>03.</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl">
            Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-24">
          {featured.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}>
              <TiltCard>
                <div className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "" : ""}`}>
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative group rounded-2xl overflow-hidden border border-white/[0.04]"
                      onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                      <motion.img src={project.image} alt={project.title} className="w-full h-72 md:h-80 object-cover"
                        animate={{ scale: hoveredIndex === index ? 1.05 : 1 }} transition={{ duration: 0.6 }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                      <motion.div className="absolute bottom-4 right-4 flex gap-2"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 10 }} transition={{ duration: 0.3 }}>
                        {project.demoLink && (
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full glass-effect-strong text-sm font-medium flex items-center gap-1.5 hover:bg-violet-500/20 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> Demo
                          </a>
                        )}
                        <a href={project.codeLink} className="px-4 py-2 rounded-full glass-effect-strong text-sm font-medium flex items-center gap-1.5 hover:bg-violet-500/20 transition-colors">
                          <Github className="w-3.5 h-3.5" /> Code
                        </a>
                      </motion.div>
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-effect text-xs text-violet-400" style={{ fontFamily: "var(--font-mono)" }}>
                        {project.year}
                      </div>
                    </div>
                  </div>
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                    <span className="text-violet-400 text-xs tracking-wider uppercase" style={{ fontFamily: "var(--font-mono)" }}>Featured Project</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "var(--font-display)" }}>{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 glass-effect rounded-xl p-5">{project.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs text-violet-400 bg-violet-500/10 border border-violet-500/15 rounded-full" style={{ fontFamily: "var(--font-mono)" }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h3 variants={fadeUp} className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>Other Projects</motion.h3>
          <div className="grid md:grid-cols-2 gap-5">
            {other.map((project, index) => (
              <motion.div key={index} variants={fadeUp}
                className="group p-6 rounded-2xl border border-white/[0.04] bg-card/30 hover:border-violet-500/20 transition-all duration-500"
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(139,92,246,0.06)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-violet-500/10"><Github className="w-5 h-5 text-violet-400" /></div>
                  <div className="flex gap-3">
                    {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-400 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                    <a href={project.codeLink} className="text-muted-foreground hover:text-violet-400 transition-colors"><ArrowUpRight className="w-4 h-4" /></a>
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-violet-400 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{tech}{i < Math.min(3, project.technologies.length - 1) ? " ·" : ""}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
