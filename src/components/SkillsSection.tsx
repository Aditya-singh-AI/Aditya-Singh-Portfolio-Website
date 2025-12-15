import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SkillsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  const techTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.03, duration: 0.4 },
    }),
    hover: { scale: 1.15, y: -5 },
  };
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 85 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 82 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 78 },
        { name: "AWS", level: 82 },
        { name: "Figma", level: 85 },
      ]
    }
  ];

  const technologies = [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Node.js", 
    "Python", "Django", "PostgreSQL", "MongoDB", "Redis", "Docker", 
    "AWS", "Vercel", "Tailwind CSS", "Figma", "Git", "GraphQL"
  ];

  return (
    <section className="py-20 section-padding bg-card/30" id="skills" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            I'm constantly expanding my toolkit and staying current with the latest technologies 
            to deliver cutting-edge solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 border-primary/10 hover:border-primary/30 transition-smooth hover:shadow-lg">
                <h3 className="text-2xl font-bold mb-6 gradient-text">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="space-y-2"
                      custom={skillIndex}
                      variants={skillVariants}
                    >
                      <motion.div 
                        className="flex justify-between items-center"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium">{skill.name}</span>
                        <motion.span 
                          className="text-sm text-muted-foreground"
                          animate={inView ? { opacity: [0, 1] } : { opacity: 0 }}
                          transition={{ delay: 0.3 + skillIndex * 0.1, duration: 0.5 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </motion.div>
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ 
                          delay: 0.2 + skillIndex * 0.1, 
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      >
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-muted" 
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8"
            variants={itemVariants}
          >
            Technologies I Work With
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {technologies.map((tech, index) => (
              <motion.span 
                key={index}
                custom={index}
                variants={techTagVariants}
                whileHover="hover"
                className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 
                           rounded-full text-sm font-medium cursor-default
                           hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary/40"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;