import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, Upload, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
}

interface AdminPanelProps {
  onPreview: () => void;
  onSavePost: (post: Omit<BlogPost, 'id' | 'date' | 'readTime'>) => void;
}

export const AdminPanel = ({ onPreview, onSavePost }: AdminPanelProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Aurora Writer",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, GIF).",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded! ✨",
        description: `Selected: ${file.name}`,
      });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the title and content fields.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      ...formData,
      image: imagePreview,
      category: formData.category || "Uncategorized"
    };

    onSavePost(newPost);

    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "Aurora Writer",
    });
    setSelectedImage(null);
    setImagePreview(null);

    toast({
      title: "Post Published! ✨",
      description: "Your blog post has been published successfully.",
    });
  };

  const categories = ["Technology", "Design", "UX Design", "Development", "Writing", "Creative"];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
          
          .form-text {
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
          }
        `}
      </style>
      
      <div className="min-h-screen bg-background pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/70 text-black"
              initial={{ opacity: 0, y: -50, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Content Creation Studio</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Craft Your{" "}
              <span className="aurora-text">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              <span className="text-lime-400 font-semibold">Transform your ideas</span> into captivating blog posts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
          >
            <Card className="aurora-shadow bg-primary/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between form-text">
                  <span>Write New Post</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="bg-lime-400/20 hover:bg-primary/70 hover:text-black transition-colors duration-200 form-text"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isPreviewMode ? "Edit" : "Preview"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-primary/30 aurora-glow hover:bg-primary/70 hover:text-black transition-colors duration-200 form-text"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Publish Post
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {!isPreviewMode ? (
                  <>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: 100, rotate: 5 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                    >
                      <Label htmlFor="title" className="form-text">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter your captivating title..."
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-lg font-semibold bg-background/50 form-text"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -100, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                    >
                      <Label htmlFor="excerpt" className="form-text">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Write a compelling excerpt that draws readers in..."
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        className="bg-background/50 form-text"
                        rows={3}
                      />
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 50, rotate: -2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 120 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="category" className="form-text">Category</Label>
                        <Select onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger className="bg-background/50 form-text">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="form-text">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="form-text">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="author" className="form-text">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          className="bg-background/50 form-text"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, scale: 0.7, y: 80 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 90 }}
                    >
                      <Label htmlFor="content" className="form-text">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Start writing your amazing story here..."
                        value={formData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        className="bg-background/50 min-h-96 form-text"
                        rows={20}
                      />
                      <p className="text-sm text-muted-foreground form-text">
                        Tip: You can use HTML tags for rich formatting
                      </p>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -150, rotate: 10 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
                    >
                      <Label className="form-text">Featured Image</Label>
                      
                      {imagePreview && (
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                        >
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full max-w-md h-48 object-cover rounded-lg border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}

                      <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground form-text">
                            {selectedImage ? 'Click to change image' : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 form-text">
                            PNG, JPG, GIF up to 10MB
                          </p>
                          {selectedImage && (
                            <p className="text-xs text-lime-400 mt-1 form-text">
                              Selected: {selectedImage.name}
                            </p>
                          )}
                        </label>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <div className="text-center border-b border-border pb-6">
                      <h1 className="text-3xl md:text-4xl font-bold mb-4 form-text">
                        {formData.title || "Your Post Title"}
                      </h1>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground form-text">
                        <span>By {formData.author}</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{formData.category || "Uncategorized"}</span>
                      </div>
                    </div>

                    {imagePreview && (
                      <motion.div 
                        className="w-full"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <img 
                          src={imagePreview} 
                          alt="Featured" 
                          className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg"
                        />
                      </motion.div>
                    )}

                    {formData.excerpt && (
                      <div className="text-lg text-muted-foreground italic form-text">
                        {formData.excerpt}
                      </div>
                    )}

                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none form-text"
                      dangerouslySetInnerHTML={{ 
                        __html: formData.content || "<p>Start writing your content to see the preview...</p>" 
                      }}
                    />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg"
            initial={{ opacity: 0, y: 100, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 80 }}
          >
            <h3 className="font-semibold mb-2 text-primary">Live Publishing</h3>
            <p className="text-sm text-muted-foreground">
              Your posts will appear instantly on the home page after publishing.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};
