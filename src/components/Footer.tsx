import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <motion.footer 
      className="bg-background border-t border-border/50 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Digital <span className="aurora-text">Stories</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Illuminating the digital sky with captivating stories, insights, and ideas that inspire innovation and creativity.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "#", label: "Email" }
                ].map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="p-2 rounded-lg bg-card hover:bg-primary/20 transition-colors duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Contact", "Privacy", "Terms"].map((link, index) => (
                  <motion.li key={link}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Categories */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {["Technology", "AI", "Development", "Design"].map((category, index) => (
                  <motion.li key={category}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {category}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 Digital Stories. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by You
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
