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
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden aurora-shadow hover:aurora-glow transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden">
          {post.image ? (
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="w-full h-full bg-aurora-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
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
          <motion.h3 
            className="text-xl font-bold mb-3 line-clamp-2 group-hover:aurora-text transition-all duration-300"
            layoutId={`title-${post.id}`}
          >
            {post.title}
          </motion.h3>
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};