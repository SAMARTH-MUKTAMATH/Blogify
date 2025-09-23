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
      console.log('📚 LOADING POSTS FROM DATABASE...');
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log('✅ LOADED POSTS:', data?.length || 0, 'posts found');
      console.log('📄 POSTS DATA:', data);
      
      setPosts(data || []);
    } catch (err) {
      console.error('❌ ERROR LOADING POSTS:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (postData: PostInsertData) => {
    try {
      console.log('💾 SAVING POST TO DATABASE...');
      console.log('📝 POST DATA:', postData);
      
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select();

      if (error) {
        console.error('❌ SAVE ERROR:', error);
        throw error;
      }
      
      console.log('✅ POST SAVED SUCCESSFULLY!');
      console.log('🆔 NEW POST ID:', data[0]?.id);
      console.log('📄 SAVED POST:', data[0]);
      
      // Immediately add to local state for instant display
      if (data && data[0]) {
        console.log('⚡ ADDING NEW POST TO STATE IMMEDIATELY');
        setPosts(prev => [data[0], ...prev]);
      }
      
      return data[0];
    } catch (err) {
      console.error('💥 SAVE FAILED:', err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('📸 STARTING IMAGE UPLOAD...');
      console.log('📄 File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });

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
      
      console.log('📝 Generated filename:', fileName);

      // Upload file with better options
      console.log('⬆️ Uploading to Supabase Storage...');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('❌ UPLOAD ERROR DETAILS:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('✅ UPLOAD SUCCESS:', uploadData);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      console.log('🌐 PUBLIC URL GENERATED:', publicUrl);

      return publicUrl;

    } catch (error) {
      console.error('💥 IMAGE UPLOAD COMPLETELY FAILED:');
      console.error('Error details:', error);
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      
      return null;
    }
  };

  useEffect(() => {
    console.log('🚀 INITIALIZING BLOG POSTS HOOK...');
    loadPosts();

    console.log('🔌 SETTING UP REALTIME SUBSCRIPTION...');
    console.log('📡 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

    const channel = supabase
      .channel('blog-posts-realtime')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'blog_posts' 
        }, 
        (payload: RealtimePostgresChangesPayload<BlogPost>) => {
          console.log('🔥 REALTIME UPDATE RECEIVED!');
          console.log('📊 Payload:', payload);
          console.log('🎯 Event Type:', payload.eventType);
          console.log('📄 New Data:', payload.new);
          console.log('📄 Old Data:', payload.old);
          
          if (payload.eventType === 'INSERT' && payload.new) {
            console.log('➕ PROCESSING INSERT EVENT...');
            setPosts(prev => {
              const exists = prev.find(post => post.id === payload.new.id);
              if (exists) {
                console.log('⚠️ POST ALREADY EXISTS IN STATE, SKIPPING');
                return prev;
              }
              console.log('✅ ADDING NEW POST TO STATE');
              const newPosts = [payload.new, ...prev];
              console.log('📊 NEW POSTS COUNT:', newPosts.length);
              return newPosts;
            });
          } 
          else if (payload.eventType === 'UPDATE' && payload.new) {
            console.log('✏️ PROCESSING UPDATE EVENT...');
            setPosts(prev => prev.map(post => 
              post.id === payload.new.id ? payload.new : post
            ));
          } 
          else if (payload.eventType === 'DELETE' && payload.old) {
            console.log('🗑️ PROCESSING DELETE EVENT...');
            setPosts(prev => prev.filter(post => post.id !== payload.old.id));
          }
        }
      )
      .subscribe((status, err) => {
        console.log('📡 REALTIME STATUS CHANGED:', status);
        
        if (status === 'SUBSCRIBED') {
          console.log('✅ REALTIME CONNECTED SUCCESSFULLY!');
        } else if (status === 'CLOSED') {
          console.log('❌ REALTIME CONNECTION CLOSED!');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('💥 REALTIME ERROR:', err);
        } else {
          console.log('🔄 REALTIME STATUS:', status);
        }
      });

    return () => {
      console.log('🔌 CLEANING UP REALTIME SUBSCRIPTION...');
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
