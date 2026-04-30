import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    data.append("access_key", "d3d8ff36-a421-4482-81cb-ee977981480c");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await response.json();
      if (result.success) {
        toast({ title: "Message Sent!", description: "Thank you! I'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        form.reset();
      } else throw new Error("Failed");
    } catch {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 focus:bg-white/[0.04] transition-all duration-300";

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, title: "Email", value: "aditya.asb24@gmail.com", href: "mailto:aditya.asb24@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, title: "Phone", value: "+91 9770089725", href: "tel:9770089725" },
    { icon: <MapPin className="w-5 h-5" />, title: "Location", value: "Gwalior, MP India", href: "#" },
  ];

  return (
    <section className="py-28 section-padding relative" id="contact" ref={ref}>
      {/* Watermark */}
      <div className="absolute top-20 right-0 text-[8rem] md:text-[12rem] font-bold text-white/[0.012] pointer-events-none select-none leading-none text-right"
        style={{ fontFamily: "var(--font-display)" }}>
        LET'S<br />TALK
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>05.</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-400 to-transparent" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div className="grid md:grid-cols-3 gap-5 mb-16" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {contactInfo.map((info, index) => (
            <motion.a key={index} href={info.href} variants={fadeUp}
              className="group p-6 rounded-2xl border border-white/[0.04] bg-card/30 hover:border-violet-500/20 transition-all duration-500 text-center"
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(139,92,246,0.06)" }}>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4 text-violet-400 group-hover:scale-110 transition-transform">{info.icon}</div>
              <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{info.title}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-violet-400 transition-colors">{info.value}</p>
            </motion.a>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div className="lg:col-span-2 space-y-6" variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.h3 variants={fadeUp} className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Let's Start a <span className="gradient-text">Conversation</span>
            </motion.h3>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
              Whether you have a project in mind, need consultation, or just want to connect, I'd love to hear from you. I typically respond within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-4 pt-4">
              {["Available for freelance projects", "Remote work worldwide", "Long-term partnerships welcome"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <motion.div className="w-2 h-2 bg-violet-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.7 }}>
            <div className="p-8 rounded-2xl border border-white/[0.04] bg-card/30">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className={inputClass} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Project discussion" required className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} required className={`${inputClass} resize-none`} />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-3.5 rounded-xl font-semibold text-background flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 rounded-xl" style={{ background: "var(--gradient-secondary)" }} />
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity }}><Send className="w-4 h-4" /></motion.div> : <ArrowUpRight className="w-4 h-4" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;