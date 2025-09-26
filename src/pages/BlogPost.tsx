import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import Newsletter from "@/components/Newsletter";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string | null;
}

interface BlogPostProps {
  postId: number;
  posts: BlogPost[];
  onBack: () => void;
}

export const BlogPost = ({ postId, posts, onBack }: BlogPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const post = posts.find(p => p.id === postId);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Button onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: readProgress / 100 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1 }}
      />

      <motion.div
        className="fixed top-24 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          size="sm"
          variant={isLiked ? "default" : "outline"}
          onClick={() => setIsLiked(!isLiked)}
          className={`w-12 h-12 p-0 ${isLiked ? 'aurora-glow bg-primary' : 'bg-card/80 backdrop-blur-sm'}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 p-0 bg-card/80 backdrop-blur-sm border-border/50"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={isBookmarked ? "default" : "outline"}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-12 h-12 p-0 ${isBookmarked ? 'bg-accent' : 'bg-card/80 backdrop-blur-sm'}`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </motion.div>

      <article className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.header
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </motion.header>

          {post.image && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Newsletter signup at the end of each post */}
          <motion.div
            className="border-t border-border/50 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Newsletter />
          </motion.div>
        </div>
      </article>
    </div>
  );
};
