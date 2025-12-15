import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("access_key", "d3d8ff36-a421-4482-81cb-ee977981480c");
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "aditya.asb24@gmail.com",
      href: "mailto:aditya.asb24@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 9770089725",
      href: "tel:9770089725"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Gwalior, MP India",
      href: "#"
    }
  ];

  return (
    <section className="py-20 section-padding bg-card/30" id="contact" ref={ref}>
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
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together to bring your ideas to life.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-smooth border-primary/10 hover:border-primary/30 group">
                <motion.div 
                  className="text-primary mb-4 mx-auto w-fit"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {info.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <motion.a 
                  href={info.href}
                  className="text-muted-foreground hover:text-primary transition-smooth inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  {info.value}
                </motion.a>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
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
              Let's Start a <span className="gradient-text">Conversation</span>
            </motion.h3>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Whether you have a project in mind, need consultation, or just want to connect, 
              I'd love to hear from you. I typically respond within 24 hours.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {[
                "Available for freelance projects",
                "Remote work worldwide",
                "Long-term partnerships welcome"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3"
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  ></motion.div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={2}
          >
            <Card className="p-6 border-primary/10 hover:shadow-lg transition-smooth">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    custom={0}
                    variants={formFieldVariants}
                  >
                    <label className="text-sm font-medium">Name</label>
                    <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    custom={1}
                    variants={formFieldVariants}
                  >
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  className="space-y-2"
                  custom={2}
                  variants={formFieldVariants}
                >
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project discussion"
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  custom={3}
                  variants={formFieldVariants}
                >
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="border-primary/20 focus:border-primary resize-none"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:opacity-90 glow-effect transition-smooth text-lg py-3 cursor-pointer"
                  >
                    <motion.div
                      animate={{ rotate: isSubmitting ? 360 : 0 }}
                      transition={{ duration: 0.6, repeat: isSubmitting ? Infinity : 0 }}
                    >
                      {isSubmitting ? (
                        <Send className="w-5 h-5 mr-2" />
                      ) : (
                        <Check className="w-5 h-5 mr-2" />
                      )}
                    </motion.div>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;