import { useState } from "react";
import { AuroraLoader } from "@/components/AuroraLoader";
import { Navigation } from "@/components/Navigation";
import { BlogHome } from "@/pages/BlogHome";
import { BlogPost } from "@/pages/BlogPost";
import { AdminPanel } from "@/pages/AdminPanel";

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

type PageType = 'home' | 'post' | 'admin';

const Index = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentPage('post');
  };

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedPostId(null);
    }
  };

  const handleSavePost = (newPost: Omit<BlogPost, 'id' | 'date' | 'readTime'>) => {
    const postWithId: BlogPost = {
      ...newPost,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min read`
    };
    
    setPosts(prevPosts => [postWithId, ...prevPosts]);
    setCurrentPage('home');
  };

  if (showLoader) {
    return <AuroraLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      
      {currentPage === 'home' && (
        <BlogHome posts={posts} onPostClick={handlePostClick} />
      )}
      
      {currentPage === 'post' && selectedPostId && (
        <BlogPost 
          postId={selectedPostId} 
          posts={posts}
          onBack={() => handleNavigation('home')} 
        />
      )}
      
      {currentPage === 'admin' && (
        <AdminPanel onSavePost={handleSavePost} onPreview={() => handleNavigation('home')} />
      )}
    </div>
  );
};

export default Index;
