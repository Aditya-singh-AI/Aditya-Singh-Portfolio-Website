import { Card } from "@/components/ui/card";
import { Code, Palette, Smartphone, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
    hover: { scale: 1.1 },
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Design",
      description: "Crafting beautiful and intuitive user interfaces that delight users."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive",
      description: "Building applications that work seamlessly across all devices and screens."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description: "Optimizing applications for speed, efficiency, and exceptional user experience."
    }
  ];

  return (
    <section className="py-20 section-padding" id="about" ref={ref}>
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I'm a passionate developer with 5+ years of experience creating digital solutions 
            that combine beautiful design with robust functionality. I specialize in modern 
            web technologies and love turning complex problems into simple, elegant solutions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold"
              variants={itemVariants}
            >
              Bringing Ideas to <span className="gradient-text">Life</span>
            </motion.h3>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              With a strong foundation in both frontend and backend development, I create 
              comprehensive solutions that not only look great but also perform exceptionally. 
              My approach combines technical expertise with creative problem-solving to deliver 
              products that users love.
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or mentoring aspiring developers. I believe in continuous 
              learning and staying ahead of industry trends.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((tech, i) => (
                <motion.span 
                  key={tech}
                  custom={i}
                  variants={techVariants}
                  whileHover="hover"
                  className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="gradient-border p-1 rounded-2xl"
            variants={profileVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div 
              className="bg-card p-8 rounded-2xl relative z-10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <motion.img 
                    src="/ADDI PHOTO 1.jpg"
                    alt="Aditya Singh"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                    animate={{ boxShadow: ["0 0 20px rgba(168, 85, 247, 0.3)", "0 0 40px rgba(168, 85, 247, 0.6)", "0 0 20px rgba(168, 85, 247, 0.3)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <h4 className="text-xl font-semibold">Aditya Singh</h4>
                  <p className="text-muted-foreground">Full Stack Developer</p>
                </div>
                
                <div className="space-y-3 border-t border-primary/10 pt-6">
                  <motion.div 
                    className="flex justify-between"
                    variants={itemVariants}
                  >
                    <span className="text-muted-foreground">Location</span>
                    <span>Gwalior , MP</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    variants={itemVariants}
                  >
                    <span className="text-muted-foreground">Projects</span>
                    <span>10+ Completed</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    variants={itemVariants}
                  >
                    <span className="text-muted-foreground">Languages</span>
                    <span>English,Hindi</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
            >
              <Card 
                className="p-6 hover:shadow-lg transition-smooth group border-primary/10 hover:border-primary/30 h-full"
              >
                <motion.div 
                  className="text-primary mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;