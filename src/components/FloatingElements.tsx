import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingElements = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Aurora Orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full mix-blend-screen"
          style={{
            background: i % 2 === 0 
              ? "radial-gradient(circle, hsl(120 73% 85% / 0.3), transparent)"
              : "radial-gradient(circle, hsl(120 100% 95% / 0.3), transparent)",
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
          }}
          animate={{
            x: [0, dimensions.width * 0.8, 0],
            y: [0, dimensions.height * 0.6, dimensions.height * 0.3, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          animate={{
            y: [dimensions.height + 20, -20],
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width
            ],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8,
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Aurora Lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px opacity-40"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(${i % 2 === 0 ? '120 73% 85%' : '120 100% 95%'}), transparent)`,
            width: `${300 + i * 200}px`,
            top: `${20 + i * 30}%`,
          }}
          animate={{
            x: [-300, dimensions.width + 300],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 4,
          }}
        />
      ))}
    </div>
  );
};
