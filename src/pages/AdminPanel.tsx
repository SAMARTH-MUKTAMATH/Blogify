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
    author: "Your Name",
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
      author: "Your Name",
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

          .slide-up {
            animation: slideUp 0.6s ease-out forwards;
            opacity: 0;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .delay-1 { animation-delay: 0.1s; }
          .delay-2 { animation-delay: 0.2s; }
          .delay-3 { animation-delay: 0.3s; }
          .delay-4 { animation-delay: 0.4s; }
          .delay-5 { animation-delay: 0.5s; }
          .delay-6 { animation-delay: 0.6s; }
          .delay-7 { animation-delay: 0.7s; }
          .delay-8 { animation-delay: 0.8s; }
        `}
      </style>
      
      <div className="min-h-screen bg-background pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 slide-up delay-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/70 text-black">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Content Creation Studio</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Craft Your{" "}
              <span className="aurora-text">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              <span className="text-lime-400 font-semibold">Transform your ideas</span> into captivating blog posts
            </p>
          </div>

          <div className="slide-up delay-2">
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
                    <div className="space-y-2 slide-up delay-3">
                      <Label htmlFor="title" className="form-text">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter your captivating title..."
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-lg font-semibold bg-background/50 form-text"
                      />
                    </div>

                    <div className="space-y-2 slide-up delay-4">
                      <Label htmlFor="excerpt" className="form-text">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Write a compelling excerpt that draws readers in..."
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        className="bg-background/50 form-text"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 slide-up delay-5">
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
                          placeholder="Your Name"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          className="bg-background/50 form-text"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 slide-up delay-6">
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
                    </div>

                    <div className="space-y-2 slide-up delay-7">
                      <Label className="form-text">Featured Image</Label>
                      
                      {imagePreview && (
                        <div className="relative slide-up">
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
                        </div>
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
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 slide-up">
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
                      <div className="w-full slide-up delay-2">
                        <img 
                          src={imagePreview} 
                          alt="Featured" 
                          className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg"
                        />
                      </div>
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
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg slide-up delay-8">
            <h3 className="font-semibold mb-2 text-primary">Live Publishing</h3>
            <p className="text-sm text-muted-foreground">
              Your posts will appear instantly on the home page after publishing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
