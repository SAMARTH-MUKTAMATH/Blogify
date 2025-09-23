import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { generateSessionId, getBrowserInfo } from '@/lib/utils';

// Define proper types for event data
interface EventData {
  [key: string]: string | number | boolean | null | undefined;
  post_id?: number;
  title?: string;
  category?: string;
  has_image?: boolean;
  page_name?: string;
  user_agent?: string;
  referrer?: string;
  time_spent?: number;
}

// Type for location API response
interface LocationResponse {
  country_name?: string;
  city?: string;
  ip?: string;
}

export const useAnalytics = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    let stored_session_id = localStorage.getItem('visitor_session_id');
    
    if (!stored_session_id) {
      stored_session_id = generateSessionId();
      localStorage.setItem('visitor_session_id', stored_session_id);
    }
    
    setSessionId(stored_session_id);
    setStartTime(Date.now());

    trackUserLocation(stored_session_id);

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) {
        navigator.sendBeacon(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/visitor_stats`,
          JSON.stringify({
            session_id: stored_session_id,
            time_spent: timeSpent,
            page_visited: window.location.pathname
          })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const trackUserLocation = async (sessionId: string) => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const location: LocationResponse = await response.json();
      
      await supabase.from('visitor_stats').upsert({
        session_id: sessionId,
        country: location.country_name || null,
        city: location.city || null,
        ip_address: location.ip || null
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const trackPageView = useCallback(async (page: string) => {
    if (!sessionId) return;

    const { browser, device } = getBrowserInfo();

    try {
      await supabase.from('visitor_stats').insert({
        session_id: sessionId,
        page_visited: page,
        referrer: document.referrer || 'Direct',
        user_agent: navigator.userAgent,
        device_type: device,
        browser: browser
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [sessionId]);

  const trackEvent = useCallback(async (eventName: string, eventData?: EventData) => {
    if (!sessionId) return;

    try {
      await supabase.from('visitor_events').insert({
        session_id: sessionId,
        event_name: eventName,
        event_data: eventData || {},
        page_url: window.location.href
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, [sessionId]);

  return { trackPageView, trackEvent, sessionId };
};
