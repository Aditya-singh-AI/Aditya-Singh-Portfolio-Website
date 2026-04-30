import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";
import { useRef } from "react";

const ExperienceSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };

  const experiences = [
    { icon: <Rocket className="w-5 h-5" />, title: "Full Stack Developer", company: "Freelance / Personal Projects", period: "2024 — Present",
      description: "Building modern web applications with React, Next.js, Node.js, and cloud technologies. Delivering premium digital experiences for clients.",
      skills: ["React", "Next.js", "Node.js", "Supabase", "Tailwind CSS"], accent: "violet" },
    { icon: <GraduationCap className="w-5 h-5" />, title: "B.Tech in Computer Science", company: "University Studies", period: "2023 — Present",
      description: "Studying Computer Science with focus on software engineering, data structures, algorithms, and modern web technologies.",
      skills: ["DSA", "DBMS", "OS", "Computer Networks"], accent: "cyan" },
    { icon: <Briefcase className="w-5 h-5" />, title: "Web Development Intern", company: "Project-Based Learning", period: "2023 — 2024",
      description: "Gained hands-on experience building real-world projects, learning industry best practices, and collaborating with development teams.",
      skills: ["HTML/CSS", "JavaScript", "React", "Git"], accent: "violet" },
    { icon: <Award className="w-5 h-5" />, title: "Self-Taught Developer", company: "Online Learning", period: "2022 — 2023",
      description: "Started learning programming through online courses, building small projects, and contributing to the developer community.",
      skills: ["Python", "JavaScript", "Problem Solving"], accent: "amber" },
  ];

  return (
    <section className="py-28 section-padding relative" id="experience" ref={sectionRef}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>04.</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            My <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl">
            A timeline of my professional growth and key milestones.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Scroll-driven line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-white/[0.04]">
            <motion.div className="w-full origin-top" style={{ height: lineHeight, background: "linear-gradient(to bottom, hsl(265,90%,65%), hsl(185,100%,55%))" }} />
          </div>

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div key={index}
                className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.7 }}>
                
                <motion.div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-[18px] h-[18px] rounded-full border-2 border-violet-400 bg-background z-10"
                  initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.4, type: "spring" }}>
                  <div className="w-full h-full rounded-full bg-violet-400/30 animate-pulse-glow" />
                </motion.div>

                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <motion.div className="p-6 rounded-2xl border border-white/[0.04] bg-card/30 hover:border-violet-500/20 transition-all duration-500 group"
                    whileHover={{ y: -4 }}>
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className={`p-2 rounded-lg ${
                        exp.accent === "violet" ? "bg-violet-500/10 text-violet-400" :
                        exp.accent === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>{exp.icon}</div>
                      <span className="text-xs text-violet-400 tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-violet-400 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs text-violet-400/70 bg-violet-500/5 rounded-md" style={{ fontFamily: "var(--font-mono)" }}>{skill}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
