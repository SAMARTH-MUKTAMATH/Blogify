import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

export const BlogCard = ({ post, index, onClick }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden aurora-shadow hover:aurora-glow transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {post.image ? (
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-all duration-700 ease-out"
            />
          ) : (
            <motion.div
              className="w-full h-full bg-aurora-gradient flex items-center justify-center scale-110 group-hover:scale-125 transition-all duration-700 ease-out"
            >
              <div className="text-4xl font-bold text-white/80">
                {post.title.charAt(0)}
              </div>
            </motion.div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
            {post.category}
          </Badge>
        </div>

        <CardContent className="p-6">
          {/* Title with Depth Shadow Effect */}
          <motion.h3 
            className="text-xl font-bold mb-3 line-clamp-2 cursor-pointer"
            style={{
              textShadow: "1px 1px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.15), 3px 3px 0px rgba(0,0,0,0.1)"
            }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2), 6px 6px 0px rgba(0,0,0,0.15), 8px 8px 0px rgba(0,0,0,0.1)",
              letterSpacing: "0.02em",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            layoutId={`title-${post.id}`}
          >
            {post.title.split('').map((char, i) => (
              <motion.span
                key={i}
                whileHover={{ 
                  y: Math.sin(i * 0.5) * -4,
                  scale: 1.1,
                  transition: { 
                    duration: 0.2, 
                    delay: i * 0.02,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h3>
          
          {/* Excerpt with Fade Wave Effect */}
          <motion.p 
            className="text-muted-foreground line-clamp-3 mb-4 cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            {post.excerpt.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-1"
                variants={{
                  initial: { 
                    opacity: 1,
                    scale: 1
                  },
                  hover: { 
                    opacity: [0.3, 1, 0.7, 1],
                    scale: [1, 1.05, 1],
                    transition: { 
                      duration: 0.5,
                      delay: i * 0.05,
                      times: [0, 0.3, 0.7, 1]
                    }
                  }
                }}
                whileHover={{
                  scale: [1, 1.08, 1],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
                  transition: {
                    duration: 0.4,
                    times: [0, 0.5, 1]
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {/* Author with Vertical Bounce */}
              <motion.div 
                className="flex items-center gap-1 cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <User className="w-4 h-4" />
                <motion.span className="font-medium">
                  {post.author.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ 
                        y: [0, -8, 0],
                        scale: [1, 1.1, 1],
                        transition: { 
                          duration: 0.6,
                          delay: i * 0.04,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>
              
              {/* Date with Scale Pulse */}
              <motion.div 
                className="flex items-center gap-1 cursor-pointer"
                whileHover={{ 
                  scale: [1, 1.1, 1.05],
                  transition: { 
                    duration: 0.5,
                    times: [0, 0.5, 1]
                  }
                }}
              >
                <Calendar className="w-4 h-4" />
                <motion.span
                  whileHover={{
                    letterSpacing: "0.1em",
                    textShadow: "0px 2px 8px rgba(0,0,0,0.3)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {post.date}
                </motion.span>
              </motion.div>
            </div>
            
            {/* Read Time with Shake Effect */}
            <motion.div 
              className="flex items-center gap-1 cursor-pointer relative"
              whileHover="shake"
              variants={{
                shake: {
                  x: [0, -2, 2, -2, 2, -1, 1, 0],
                  transition: {
                    duration: 0.5,
                    times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1]
                  }
                }
              }}
            >
              <Clock className="w-4 h-4" />
              <motion.span 
                className="font-medium relative"
                variants={{
                  shake: {
                    opacity: [1, 0.8, 1, 0.9, 1],
                    filter: [
                      "blur(0px)",
                      "blur(0.5px)", 
                      "blur(0px)",
                      "blur(0.3px)",
                      "blur(0px)"
                    ],
                    textShadow: [
                      "0px 0px 0px rgba(0,0,0,0)",
                      "1px 1px 2px rgba(0,0,0,0.3)",
                      "0px 0px 0px rgba(0,0,0,0)",
                      "1px 1px 2px rgba(0,0,0,0.2)",
                      "0px 0px 0px rgba(0,0,0,0)"
                    ],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.25, 0.5, 0.75, 1]
                    }
                  }
                }}
              >
                {post.readTime.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      shake: {
                        y: [0, Math.sin(i) * 2, 0],
                        scale: [1, 1.05, 1],
                        transition: {
                          duration: 0.3,
                          delay: i * 0.02
                        }
                      }
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
