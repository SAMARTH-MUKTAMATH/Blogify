import { useState, useEffect } from "react";
import { AuroraLoader } from "@/components/AuroraLoader";
import { Navigation } from "@/components/Navigation";
import { BlogHome } from "@/pages/BlogHome";
import { BlogPost } from "@/pages/BlogPost";
import { AdminPanel } from "@/pages/AdminPanel";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useAnalytics } from "@/hooks/use-analytics";
import { calculateReadTime } from "@/lib/utils";

interface BlogPostUI {
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

type PageType = 'home' | 'post' | 'admin';

const Index = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [uiPosts, setUiPosts] = useState<BlogPostUI[]>([]);

  const { posts: supabasePosts, loading, savePost, uploadImage } = useBlogPosts();
  const { trackPageView, trackEvent } = useAnalytics();

  // Transform Supabase posts to UI format
  useEffect(() => {
    const transformedPosts = supabasePosts.map(post => {
      return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        category: post.category,
        author: post.author,
        date: new Date(post.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        readTime: post.read_time || calculateReadTime(post.content),
        image: post.image_url || null
      };
    });
    
    setUiPosts(transformedPosts);
  }, [supabasePosts]);

  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentPage('post');
    trackPageView('post');
    trackEvent('post_click', { post_id: postId });
  };

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    trackPageView(page);
    
    if (page === 'home') {
      setSelectedPostId(null);
    }
  };

  const handleSavePost = async (newPost: Omit<BlogPostUI, 'id' | 'date' | 'readTime'>, imageFile?: File) => {
    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const postData = {
        title: newPost.title,
        excerpt: newPost.excerpt,
        content: newPost.content,
        category: newPost.category || 'Uncategorized',
        author: newPost.author,
        read_time: calculateReadTime(newPost.content),
        image_url: imageUrl
      };

      await savePost(postData);
      
      trackEvent('post_created', {
        title: newPost.title,
        category: newPost.category,
        has_image: !!imageUrl
      });
      
      setCurrentPage('home');
    } catch (error) {
      console.error('Save post error:', error);
      alert('Error saving post. Please try again.');
    }
  };

  if (showLoader) {
    return <AuroraLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      
      {loading && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-black px-4 py-2 rounded-lg animate-pulse">
          Loading...
        </div>
      )}
      
      {/* DEBUG DIV REMOVED - NO MORE COUNTER! */}
      
      {currentPage === 'home' && (
        <BlogHome posts={uiPosts} onPostClick={handlePostClick} />
      )}
      
      {currentPage === 'post' && selectedPostId && (
        <BlogPost 
          postId={selectedPostId} 
          posts={uiPosts}
          onBack={() => handleNavigation('home')} 
        />
      )}
      
      {currentPage === 'admin' && (
        <AdminPanel 
          onSavePost={handleSavePost} 
          onPreview={() => handleNavigation('home')} 
        />
      )}
    </div>
  );
};

export default Index;
  