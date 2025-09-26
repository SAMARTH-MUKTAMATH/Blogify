import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, Upload, Sparkles, X, AlertCircle, AlertTriangle, User, Calendar, Tag, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// 🔥 NEW: Import newsletter function
import { sendNewPostNotification } from '../utils/emailService';

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

interface AdminPanelProps {
  onPreview: () => void;
  // 🔥 UPDATED: Return Promise<BlogPost> for newsletter integration
  onSavePost: (post: Omit<BlogPost, 'id' | 'date' | 'readTime'>, imageFile?: File) => Promise<BlogPost>;
  editingPost?: BlogPost | null;
}

// Auto-Growing Textarea Component
const AutoGrowTextarea = ({ 
  value, 
  onChange, 
  placeholder, 
  className,
  id,
  minRows = 5,
  maxRows = 25
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className: string;
  id?: string;
  minRows?: number;
  maxRows?: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const lineHeight = 24;
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = newHeight + 'px';
      
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    setTimeout(adjustHeight, 0);
  };

  return (
    <Textarea
      ref={textareaRef}
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      rows={minRows}
      style={{ 
        resize: 'none',
        minHeight: `${minRows * 24}px`,
        maxHeight: `${maxRows * 24}px`,
        overflowY: 'hidden',
        transition: 'height 0.1s ease'
      }}
    />
  );
};

export const AdminPanel = ({ onPreview, onSavePost, editingPost }: AdminPanelProps) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Your Name",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploadStatus, setImageUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  // Populate form when editing
  useEffect(() => {
    if (editingPost) {
      console.log('📝 POPULATING FORM FOR EDITING:', editingPost.id);
      setFormData({
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        category: editingPost.category,
        author: editingPost.author,
      });
      
      if (editingPost.image) {
        setImagePreview(editingPost.image);
        setImageUploadStatus('success');
      }
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "Your Name",
      });
      setImagePreview(null);
      setSelectedImage(null);
      setImageUploadStatus('idle');
    }
  }, [editingPost]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageUploadStatus('idle');
    setUploadError('');
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        const errorMsg = "File too large. Please select an image smaller than 10MB.";
        setUploadError(errorMsg);
        setImageUploadStatus('error');
        toast({
          title: "File too large",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        const errorMsg = "Invalid file type. Please select an image file (PNG, JPG, GIF).";
        setUploadError(errorMsg);
        setImageUploadStatus('error');
        toast({
          title: "Invalid file type",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      setImageUploadStatus('success');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image selected! ✨",
        description: `Selected: ${file.name}`,
      });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageUploadStatus('idle');
    setUploadError('');
    
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Handle save button click - show confirmation for new posts
  const handleSaveClick = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the title and content fields.",
        variant: "destructive",
      });
      return;
    }

    // If editing existing post, save directly
    if (editingPost) {
      handleConfirmedSave();
    } else {
      // For new posts, show confirmation dialog
      setShowConfirmDialog(true);
    }
  };

  // 🔥 UPDATED: Add newsletter notification after successful save
  const handleConfirmedSave = async () => {
    setShowConfirmDialog(false);
    
    try {
      setImageUploadStatus('uploading');

      const newPost = {
        ...formData,
        image: imagePreview,
        category: formData.category || "Uncategorized"
      };

      // Save the post first
      const savedPost = await onSavePost(newPost, selectedImage || undefined);
      
      // 🔥 NEW: Send newsletter notifications after successful save
      if (!editingPost) { // Only for new posts, not edits
        try {
          await sendNewPostNotification({
            id: savedPost?.id || Date.now(),
            title: newPost.title,
            excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
          });
          
          console.log('📧 Newsletter notifications sent to all subscribers!');
        } catch (emailError) {
          console.error('📧 Newsletter notification failed:', emailError);
          // Don't fail the entire save if email fails
        }
      }

      if (!editingPost) {
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          author: "Your Name",
        });
        setSelectedImage(null);
        setImagePreview(null);
      }
      
      setImageUploadStatus('idle');
      setUploadError('');

      // 🔥 UPDATED: Show newsletter notification in toast
      toast({
        title: editingPost ? "Post Updated! ✨" : "Post Published & Notifications Sent! 📧",
        description: editingPost ? 
          "Your blog post has been updated successfully." : 
          "Your blog post has been published and all subscribers have been notified!",
      });

    } catch (error) {
      console.error('💥 SAVE ERROR:', error);
      setImageUploadStatus('error');
      setUploadError(error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        title: "Save Failed",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    }
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
      
      <div className="min-h-screen bg-background pt-16 sm:pt-20 md:pt-24 pb-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 slide-up delay-1">
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full bg-primary/70 text-black mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Content Creation Studio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
              Craft Your{" "}
              <span className="aurora-text">Story</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground px-4">
              <span className=" font-semibold">Transform your ideas</span> into captivating blog posts
            </p>
          </div>

          {/* Main Form Card */}
          <div className="slide-up delay-2">
            <Card className="aurora-shadow bg-primary/20 backdrop-blur-sm border-border/50">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 form-text">
                  <span className="text-lg sm:text-xl">
                    {editingPost ? 'Edit Post' : 'Write New Post'}
                  </span>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="bg-lime-400/20 hover:bg-primary/70 hover:text-black transition-colors duration-200 form-text text-xs sm:text-sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isPreviewMode ? "Edit" : "Preview"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveClick}
                      disabled={imageUploadStatus === 'uploading'}
                      className="bg-primary/30 aurora-glow hover:bg-primary/70 hover:text-black transition-colors duration-200 form-text text-xs sm:text-sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {imageUploadStatus === 'uploading' ? 'Publishing...' : editingPost ? 'Update Post' : 'Publish Post'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                {!isPreviewMode ? (
                  <>
                    {/* Title */}
                    <div className="space-y-2 slide-up delay-3">
                      <Label htmlFor="title" className="form-text text-sm">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter your captivating title..."
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-base sm:text-lg font-semibold bg-background/50 form-text"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2 slide-up delay-4">
                      <Label htmlFor="excerpt" className="form-text text-sm">Excerpt</Label>
                      <AutoGrowTextarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        placeholder="Write a compelling excerpt that draws readers in..."
                        className="bg-background/50 form-text text-sm sm:text-base border-border/50 focus:border-primary"
                        minRows={3}
                        maxRows={6}
                      />
                    </div>

                    {/* Category & Author */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 slide-up delay-5">
                      <div className="space-y-2">
                        <Label className="form-text text-sm">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger className="bg-background/50 form-text text-sm">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="form-text">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="form-text text-sm">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="author" className="form-text text-sm">Author</Label>
                        <Input
                          id="author"
                          placeholder="Your Name"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          className="bg-background/50 form-text text-sm"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 slide-up delay-6">
                      <Label htmlFor="content" className="form-text text-sm">Content</Label>
                      <AutoGrowTextarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        placeholder="Start writing your amazing story here..."
                        className="bg-background/50 form-text text-sm sm:text-base border-border/50 focus:border-primary"
                        minRows={5}
                        maxRows={20}
                      />
                      <p className="text-xs text-muted-foreground form-text">
                        Tip: You can use HTML tags for rich formatting
                      </p>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2 slide-up delay-7">
                      <Label className="form-text text-sm">Featured Image</Label>
                      
                      {imageUploadStatus !== 'idle' && (
                        <div className={`flex items-center gap-2 p-2 rounded text-xs sm:text-sm ${
                          imageUploadStatus === 'success' ? 'bg-green-100 text-green-800' :
                          imageUploadStatus === 'uploading' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {imageUploadStatus === 'success' && '✅ Image ready'}
                          {imageUploadStatus === 'uploading' && '⏳ Uploading...'}
                          {imageUploadStatus === 'error' && (
                            <><AlertCircle className="w-4 h-4" /> {uploadError}</>
                          )}
                        </div>
                      )}
                      
                      {imagePreview && (
                        <div className="relative slide-up">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full max-w-sm h-32 sm:h-48 object-cover rounded-lg border mx-auto"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      <div className="border-2 border-dashed border-border/50 rounded-lg p-4 sm:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground form-text">
                            {selectedImage ? 'Tap to change image' : 'Tap to upload image'}
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
                  <div className="space-y-4 sm:space-y-6 slide-up">
                    <div className="text-center border-b border-border pb-4 sm:pb-6">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 form-text px-2">
                        {formData.title || "Your Post Title"}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground form-text">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{formData.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span>{formData.category || "Uncategorized"}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>1 min read</span>
                        </div>
                      </div>
                    </div>

                    {imagePreview && (
                      <div className="w-full slide-up delay-2">
                        <img 
                          src={imagePreview} 
                          alt="Featured" 
                          className="w-full max-w-2xl mx-auto h-48 sm:h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {formData.excerpt && (
                      <div className="text-base sm:text-lg text-muted-foreground italic form-text px-2">
                        {formData.excerpt}
                      </div>
                    )}

                    <div 
                      className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none form-text px-2"
                      dangerouslySetInnerHTML={{ 
                        __html: formData.content || "<p>Start writing your content to see the preview...</p>" 
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Minimal margin top */}
          <div className="mt-3 text-center slide-up delay-8">
            <p className="text-xs sm:text-sm text-muted-foreground form-text">
              Your posts will appear instantly on the home page after publishing.
            </p>
          </div>

        </div>
      </div>

      {/* Fixed Confirmation Dialog - Preview Button Works */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-lg aurora-shadow bg-lime-50 dark:bg-lime-950/20 backdrop-blur-sm border border-lime-200 dark:border-lime-800 rounded-xl">
          <AlertDialogHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <AlertTriangle className="w-8 h-8 text-white drop-shadow-sm" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-lime-900 dark:text-lime-100 form-text">
              Ready to Publish?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4 pt-3">
              {/* Important Section */}
              <div className="bg-lime-100 dark:bg-lime-900/30 backdrop-blur-sm rounded-xl p-5 border border-lime-300 dark:border-lime-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <span className="text-white text-sm font-bold drop-shadow-sm">!</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lime-900 dark:text-lime-100 mb-2 form-text text-base">
                      Important: Posts cannot be edited after publishing
                    </p>
                    <p className="text-sm text-lime-800 dark:text-lime-200 form-text leading-relaxed">
                      Once published, you can only <strong className="text-lime-900 dark:text-lime-100">delete</strong> and recreate posts. 
                      Make sure everything looks perfect before proceeding!
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip Section - SAME BG COLOR AS IMPORTANT */}
              <div className="bg-lime-100 dark:bg-lime-900/30 backdrop-blur-sm rounded-xl p-4 border border-lime-300 dark:border-lime-700 shadow-sm">
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center shadow-sm">
                    <Eye className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-lime-900 dark:text-lime-100 form-text">
                    💡 Tip: Use the Preview button to review your post first
                  </span>
                </div>
              </div>

              {/* Success Section - Light Lime */}
              <div className="bg-lime-25 dark:bg-lime-900/10 rounded-lg p-3 border border-lime-200 dark:border-lime-600 shadow-sm">
                <p className="text-sm text-lime-800 dark:text-lime-200 form-text font-medium">
                  Your post will appear <span className="font-bold text-lime-700 dark:text-lime-300 bg-lime-200 dark:bg-lime-800 px-1.5 py-0.5 rounded">instantly</span> on the home page
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-lime-200 dark:border-lime-700">
            <AlertDialogCancel 
              onClick={() => {
                setShowConfirmDialog(false);
                setIsPreviewMode(true); // ACTIVATE PREVIEW MODE
              }}
              className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-lime-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-lime-200 dark:border-gray-600 font-semibold form-text shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Eye className="w-4 h-4 mr-2" />
              Check Preview First
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmedSave}
              className="w-full sm:w-auto bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 form-text border-0"
            >
              <Sparkles className="w-4 h-4 mr-2 drop-shadow-sm" />
              Publish Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
