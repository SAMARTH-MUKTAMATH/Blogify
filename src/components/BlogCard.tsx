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
      className="group cursor-pointer w-full"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 border border-slate-200/50 bg-white/80 backdrop-blur-sm">
        
        {/* Image Container */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          {post.image ? (
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-all duration-700 ease-out"
            />
          ) : (
            <motion.div
              className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center scale-110 group-hover:scale-125 transition-all duration-700 ease-out"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/80">
                {post.title.charAt(0)}
              </div>
            </motion.div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-primary/90 text-black font-semibold text-xs">
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-3 sm:p-4 md:p-6">
          <motion.h3 
            className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 cursor-pointer text-gray-900 leading-tight"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {post.title}
          </motion.h3>
          
          <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        </CardContent>

        {/* Footer - ALL 3 IN ONE LINE */}
        <CardFooter className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-0">
          <div className="flex items-center justify-between w-full text-xs sm:text-sm text-gray-500 gap-1">
            
            {/* Author */}
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium text-gray-700 truncate">
                {post.author}
              </span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-400 px-1">•</span>
            
            {/* Date */}
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-gray-600 truncate">
                {post.date}
              </span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-400 px-1">•</span>
            
            {/* Read Time */}
            <div className="flex items-center gap-1 min-w-0 flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium text-gray-700 whitespace-nowrap">
                {post.readTime}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
