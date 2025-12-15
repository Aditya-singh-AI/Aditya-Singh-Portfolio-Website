import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const ProjectsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };
  const projects = [
    {
      title: "Badminton Tournament System For College",
      description: "Badminton Tournament Website For Registration of the Participants modern UI, payment integration, and admin dashboard. Built with React, Node.js, and PostgreSQL.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop",
      technologies: ["React", "Node.js", "Supabase", "Razorpay", "Tailwind CSS"],
      demoLink: "https://badminton-tournament-website.vercel.app/",
      codeLink: "#",
      featured: true
    },
    {
      title: "AI Voice Assistant With Sementic Analysis",
      description: "An intelligent voice-enabled assistant powered by advanced semantic analysis and natural language processing. Features real-time speech recognition.",
      image: "image.png?w=600&h=300&fit=crop",
      technologies: ["python", "Firebase", "react", "llm", "speech recognition", "elevenlabs"],
      demoLink: "https://celcius-ai-voice-assistant.vercel.app/",
      codeLink: "#",
      featured: true
    },
    {
      title: "Weather App - SimplyWeather",
      description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=300&fit=crop",
      technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation"],
      demoLink: "https://simply-weather-app.vercel.app/",
      codeLink: "#",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website with smooth animations, dark mode support, and optimized performance.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Vercel"],
      demoLink: "",
      codeLink: "#",
      featured: false
    },
    // {
    //   title: "Social Media Dashboard",
    //   description: "Analytics dashboard for social media management with data visualization, scheduling, and performance tracking.",
    //   image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&h=300&fit=crop",
    //   technologies: ["React", "D3.js", "Express", "MongoDB"],
    //   demoLink: "#",
    //   codeLink: "#",
    //   featured: false
    // },
    // {
    //   title: "Learning Management System",
    //   description: "Educational platform with course creation, progress tracking, video streaming, and student assessment features.",
    //   image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=300&fit=crop",
    //   technologies: ["Django", "React", "PostgreSQL", "Redis", "AWS S3"],
    //   demoLink: "#",
    //   codeLink: "#",
    //   featured: false
    // }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section className="py-20 section-padding" id="projects" ref={ref}>
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
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Here are some of my recent projects that showcase my skills and passion for creating 
            exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={projectVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-smooth border-primary/10 hover:border-primary/30 h-full flex flex-col">
                <div className="relative overflow-hidden bg-muted">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute bottom-4 right-4 flex gap-2"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Demo
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <motion.h3 
                    className="text-2xl font-bold mb-3"
                    animate={{ color: hoveredIndex === index ? "hsl(var(--primary))" : "inherit" }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        custom={techIndex}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge 
                          className="bg-primary/10 text-primary border-primary/20 cursor-default"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="flex gap-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </motion.div>
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            Other Projects
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                custom={index + featuredProjects.length}
                variants={projectVariants}
                onMouseEnter={() => setHoveredIndex(index + featuredProjects.length)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:shadow-lg transition-smooth border-primary/10 hover:border-primary/30 h-full flex flex-col">
                  <div className="relative overflow-hidden bg-muted">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      animate={{ scale: hoveredIndex === index + featuredProjects.length ? 1.1 : 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <motion.h4 
                      className="text-lg font-semibold mb-2"
                      animate={{ color: hoveredIndex === index + featuredProjects.length ? "hsl(var(--primary))" : "inherit" }}
                    >
                      {project.title}
                    </motion.h4>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-1 mb-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                    >
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          custom={techIndex}
                          variants={badgeVariants}
                        >
                          <Badge 
                            className="text-xs bg-primary/10 text-primary border-primary/20 cursor-default"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge className="text-xs bg-muted">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </motion.div>
                    
                    <div className="flex gap-2">
                      <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      </motion.div>
                      <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
