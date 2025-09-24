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
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-slate-200/50 bg-white/80 backdrop-blur-sm">
        
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
              className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center scale-110 group-hover:scale-125 transition-all duration-700 ease-out"
            >
              <div className="text-4xl font-bold text-white/80">
                {post.title.charAt(0)}
              </div>
            </motion.div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-blue-600/90 text-white">
            {post.category}
          </Badge>
        </div>

        <CardContent className="p-6">
          {/* Simple Scale Hover Effect */}
          <motion.h3 
            className="text-xl font-bold mb-3 line-clamp-2 cursor-pointer text-gray-900"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {post.title}
          </motion.h3>
          
          <p className="text-gray-600 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="font-medium text-gray-700">
                  {post.author}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-gray-600">
                  {post.date}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-gray-700">
                {post.readTime}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
