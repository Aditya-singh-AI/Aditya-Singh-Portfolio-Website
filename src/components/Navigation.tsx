import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleResumeClick = () => {
    // Open resume in new tab
    window.open("/Resume Aditya Singh.pdf", "_blank");
  };

  const menuVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10" 
          : "bg-transparent"
      }`}
      animate={{ boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none" }}
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            AS
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-primary transition-smooth relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-smooth" 
                  layoutId="underline"
                />
              </motion.button>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleResumeClick}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                variant="outline"
              >
                Resume
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          transition={{ duration: 0.3 }}
        >
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/10">
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left text-muted-foreground hover:text-primary transition-smooth py-2"
                    variants={itemVariants}
                    custom={index}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div
                  variants={itemVariants}
                  custom={navLinks.length}
                  initial="closed"
                  animate="open"
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Button 
                    onClick={handleResumeClick}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    Resume
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;