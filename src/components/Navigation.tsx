import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PenTool, Home, Menu, X, Shredder } from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  currentPage: 'home' | 'post' | 'admin';
  onNavigate: (page: 'home' | 'post' | 'admin') => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleNavigate = (page: 'home' | 'post' | 'admin') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'admin', label: 'Write', icon: PenTool },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fondamento:wght@400;700;900&display=swap');
          
          .blogify-title {
            font-family: 'Fondamento', cursive;
            font-weight: 900;
            background: linear-gradient(135deg, #0c0a09, #292524, #44403c, #57534e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          /* Only fix: Add padding to prevent content hiding */
          body {
            padding-top: 60px;
          }
          
          @media (max-width: 640px) {
            body {
              padding-top: 56px;
            }
          }
        `}
      </style>
      
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-primary/15 border-b border-border/80' 
            : 'bg-primary/15 border-b border-border/50'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 sm:gap-4 cursor-pointer"
              onClick={() => handleNavigate('home')}
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 15,
                  y: -2
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotate: -5
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <motion.div
                  whileHover={{
                    rotateY: 180,
                    rotateZ: 10
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Shredder className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.div>
              <h1 className="text-xl sm:text-3xl blogify-title tracking-wide">
                Blogify
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    onHoverStart={() => setIsHovered(item.id)}
                    onHoverEnd={() => setIsHovered(null)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleNavigate(item.id as 'home' | 'admin')}
                      className={`relative flex items-center gap-2 transition-all duration-300 border-2 ${
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                          : "hover:bg-slate-800 hover:text-slate-100 hover:border-slate-700 border-primary/60"
                      }`}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-primary-foreground rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.4 }}
                        />
                      )}
                      
                      <IconComponent className={`w-4 h-4 transition-transform duration-200 ${
                        isHovered === item.id ? 'rotate-12' : ''
                      }`} />
                      
                      <span className="transition-all duration-300 font-medium">
                        {item.label}
                      </span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors border-2 border-primary/60 hover:border-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-[56px] left-4 right-4 bg-primary/20 rounded-xl border border-border/80 shadow-2xl z-40 md:hidden overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavigate(item.id as 'home' | 'admin')}
                      className={`w-full flex items-center gap-3 justify-start h-12 text-left transition-all duration-200 border-2 ${
                        isActive 
                          ? "bg-primary/10 text-primary border-primary" 
                          : "hover:bg-slate-800 hover:text-slate-100 hover:border-slate-700 border-primary/60"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-primary rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
