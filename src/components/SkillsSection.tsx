import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const SkillRing = ({ name, level, delay, inView }: { name: string; level: number; delay: number; inView: boolean }) => {
  const r = 40, c = 2 * Math.PI * r, off = c - (level / 100) * c;
  return (
    <motion.div
      className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/[0.04] bg-card/30 hover:border-violet-500/20 transition-all duration-500 group"
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }} whileHover={{ y: -6 }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
          <motion.circle cx="50" cy="50" r={r} fill="none" strokeWidth="6" strokeLinecap="round"
            stroke="url(#sg)" strokeDasharray={c}
            initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: off } : { strokeDashoffset: c }}
            transition={{ delay: delay + 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(265,90%,65%)" /><stop offset="100%" stopColor="hsl(185,100%,55%)" />
          </linearGradient></defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-mono)" }}>{level}%</span>
        </div>
      </div>
      <span className="font-semibold text-sm text-center" style={{ fontFamily: "var(--font-heading)" }}>{name}</span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

  const cats = [
    { title: "Frontend", skills: [{ name: "React/Next.js", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Tailwind CSS", level: 92 }, { name: "Vue.js", level: 85 }] },
    { title: "Backend", skills: [{ name: "Node.js", level: 88 }, { name: "Python", level: 82 }, { name: "PostgreSQL", level: 85 }, { name: "MongoDB", level: 80 }] },
    { title: "Tools", skills: [{ name: "Git/GitHub", level: 90 }, { name: "Docker", level: 78 }, { name: "AWS", level: 82 }, { name: "Figma", level: 85 }] },
  ];

  const t1 = ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Node.js", "Python", "Django", "PostgreSQL"];
  const t2 = ["MongoDB", "Redis", "Docker", "AWS", "Vercel", "Tailwind CSS", "Figma", "Git", "GraphQL"];

  return (
    <section className="py-28 section-padding relative" id="skills" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>02.</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl">
            Constantly expanding my toolkit and staying current with the latest technologies.
          </motion.p>
        </motion.div>

        <motion.div className="flex gap-1 mb-10 p-1 bg-card/50 rounded-full w-fit border border-white/[0.04]"
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {cats.map((cat, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === i ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {activeTab === i && <motion.div className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-secondary)" }}
                layoutId="activeSkillTab" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative z-10">{cat.title}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20" key={activeTab}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            {cats[activeTab].skills.map((s, i) => <SkillRing key={s.name} name={s.name} level={s.level} delay={i * 0.1} inView={inView} />)}
          </motion.div>
        </AnimatePresence>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>Technologies I Work With</h3>
          <div className="space-y-3">
            {[{ techs: t1, cls: "animate-marquee" }, { techs: t2, cls: "animate-marquee-reverse" }].map((row, ri) => (
              <div key={ri} className="relative overflow-hidden py-2">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
                <div className={`flex gap-3 ${row.cls}`}>
                  {[...row.techs, ...row.techs].map((t, i) => (
                    <span key={i} className="px-5 py-2.5 bg-card/40 border border-white/[0.04] rounded-full text-sm font-medium whitespace-nowrap hover:border-violet-500/20 hover:text-violet-400 transition-all duration-300">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;