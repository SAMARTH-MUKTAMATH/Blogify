import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { FloatingElements } from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, TrendingUp, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";

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

interface BlogHomeProps {
  onPostClick: (id: number) => void;
  posts: BlogPost[];
}

export const BlogHome = ({ onPostClick, posts }: BlogHomeProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const initialCategories = ["All", "Technology", "Design", "UX Design", "Development", "Writing", "Creative"];
  const additionalCategories = ["AI", "Tools", "Photography", "Entertainment", "Finance", "Lifestyle", "Food", "Travel", "Health", "Crypto", "Database", "Cloud", "DevOps", "Security", "Mobile", "API"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      
      <section className="relative pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/50 text-black"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Ideas Written, Minds Enlightened</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stories that{" "}
              <span className="aurora-text">Illuminate</span>
              <br />
              the Digital Sky
            </h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover captivating stories, insights, and ideas that light up your imagination
              like the northern lights across a starlit sky.
            </motion.p>

            {/* UPDATED RESPONSIVE SEARCH SECTION */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                <Input
                  placeholder="Search for inspiration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-card/50 border-border/50 backdrop-blur-sm text-sm sm:text-base"
                />
              </div>
              
              {/* Trending Button */}
              <Button 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 aurora-glow transition-all duration-300 py-2.5 sm:py-2 text-sm sm:text-base font-medium whitespace-nowrap"
                size="default"
              >
                <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                Trending
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 mb-12">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Initial Categories */}
            {initialCategories.map((category) => (
              <motion.div
                key={category}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category 
                      ? "aurora-glow bg-primary" 
                      : "hover:bg-primary/20 hover:shadow-md"
                  }`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
            
            {/* Expand/Collapse Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="transition-all duration-300 hover:bg-primary/20 hover:shadow-md"
              >
                <MoreHorizontal className="w-4 h-4" />
                {showAllCategories ? "Less" : "More"}
              </Button>
            </motion.div>

            {/* Additional Categories with Animation */}
            <AnimatePresence>
              {showAllCategories && (
                <motion.div
                  className="flex flex-wrap gap-2 justify-center w-full mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {additionalCategories.map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`transition-all duration-300 ${
                          selectedCategory === category 
                            ? "aurora-glow bg-primary" 
                            : "hover:bg-primary/20 hover:shadow-md"
                        }`}
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onClick={() => onPostClick(post.id)}
              />
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                {posts.length === 0 ? "Create your first post to get started!" : "Try adjusting your search or filter criteria"}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

<Footer />
