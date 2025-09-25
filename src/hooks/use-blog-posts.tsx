import { useState, useEffect } from 'react';
import { supabase, BlogPost } from '@/lib/supabase';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface PostInsertData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  image_url?: string | null;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (postData: PostInsertData) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select();

      if (error) {
        throw error;
      }
      
      // Immediately add to local state for instant display
      if (data && data[0]) {
        setPosts(prev => [data[0], ...prev]);
      }
      
      return data[0];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File must be less than 10MB');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 9);
      const fileName = `blog-${timestamp}-${randomString}.${fileExt}`;

      // Upload file with better options
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      return publicUrl;

    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    loadPosts();

    const channel = supabase
      .channel('blog-posts-realtime')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'blog_posts' 
        }, 
        (payload: RealtimePostgresChangesPayload<BlogPost>) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setPosts(prev => {
              const exists = prev.find(post => post.id === payload.new.id);
              if (exists) {
                return prev;
              }
              const newPosts = [payload.new, ...prev];
              return newPosts;
            });
          } 
          else if (payload.eventType === 'UPDATE' && payload.new) {
            setPosts(prev => prev.map(post => 
              post.id === payload.new.id ? payload.new : post
            ));
          } 
          else if (payload.eventType === 'DELETE' && payload.old) {
            setPosts(prev => prev.filter(post => post.id !== payload.old.id));
          }
        }
      )
      .subscribe((status, err) => {
        // Status tracking kept but no console logs
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    posts,
    loading,
    error,
    loadPosts,
    savePost,
    uploadImage
  };
};
