import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hover: { scale: 1.2, rotate: 5 },
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ];

  return (
    <motion.footer 
      className="py-12 section-padding border-t border-primary/10"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            className="text-center md:text-left"
            variants={itemVariants}
          >
            <motion.div 
              className="text-2xl font-bold gradient-text mb-2"
              whileHover={{ scale: 1.05 }}
            >
              Aditya Singh
            </motion.div>
            <p className="text-muted-foreground">
              Crafting digital experiences with passion and precision
            </p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="p-2 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 transition-smooth glow-effect"
                aria-label={link.label}
                custom={index}
                variants={socialVariants}
                whileHover="hover"
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-8 border-t border-primary/10 text-center text-muted-foreground"
          variants={itemVariants}
        >
          <motion.p 
            className="flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            © {currentYear} Aditya Singh. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.span>
            and lots of coffee.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;