import emailjs from '@emailjs/browser';

// Configuration - UPDATE THESE WITH YOUR EMAILJS CREDENTIALS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_gwg7dqa', // Your EmailJS service ID
  NEW_POST_TEMPLATE_ID: 'template_l5rnyhj', // Replace with new post template ID
  WELCOME_TEMPLATE_ID: 'template_34a186i', // Your welcome template ID
  PUBLIC_KEY: '_5KdtegclIBElhFWr' // Your EmailJS public key
} as const;

// EXPORTED TypeScript interfaces
export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface PostData {
  id: string | number;
  title: string;
  excerpt?: string;
  description?: string;
  slug?: string;
}

// FIX: EmailData interface with index signature to satisfy Record<string, unknown>
interface EmailData extends Record<string, unknown> {
  to_email: string;
  to_name: string;
  blog_name: string;
  from_name: string;
  blog_url?: string;
  post_title?: string;
  post_excerpt?: string;
  post_url?: string;
}

// Get all subscribers with proper typing
export const getSubscribers = (): Subscriber[] => {
  try {
    const stored = localStorage.getItem('newsletter_subscribers');
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Validate the structure
    if (!Array.isArray(parsed)) return [];
    
    return parsed.filter((item: unknown): item is Subscriber => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        'email' in item &&
        'subscribedAt' in item &&
        'isActive' in item &&
        typeof (item as Subscriber).id === 'number' &&
        typeof (item as Subscriber).email === 'string' &&
        typeof (item as Subscriber).subscribedAt === 'string' &&
        typeof (item as Subscriber).isActive === 'boolean'
      );
    });
  } catch (error) {
    console.error('Error parsing subscribers from localStorage:', error);
    return [];
  }
};

// Add new subscriber and send welcome email
export const addSubscriber = async (email: string): Promise<Subscriber> => {
  const subscribers: Subscriber[] = getSubscribers();
  
  // Check if email already exists
  const existingSubscriber = subscribers.find(sub => sub.email === email);
  if (existingSubscriber) {
    throw new Error('Email already subscribed');
  }
  
  // Create new subscriber
  const newSubscriber: Subscriber = {
    id: Date.now(),
    email,
    subscribedAt: new Date().toISOString(),
    isActive: true
  };

  // Save to localStorage
  const updatedSubscribers: Subscriber[] = [...subscribers, newSubscriber];
  localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));

  // Send welcome email
  try {
    const emailData: EmailData = {
      to_email: email,
      to_name: email.split('@')[0],
      blog_name: 'Blogify',
      from_name: 'Samarth Muktamath',
      blog_url: window.location.origin
    };

    console.log('Sending welcome email with data:', emailData);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.WELCOME_TEMPLATE_ID,
      emailData,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('✅ Welcome email sent successfully:', result);
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    // Don't throw error - subscriber is still added even if email fails
  }

  return newSubscriber;
};

// Send new post notifications to all subscribers
export const sendNewPostNotification = async (postData: PostData): Promise<void> => {
  const subscribers: Subscriber[] = getSubscribers();
  const activeSubscribers: Subscriber[] = subscribers.filter(
    (sub: Subscriber) => sub.isActive
  );

  if (activeSubscribers.length === 0) {
    console.log('No active subscribers found');
    return;
  }

  console.log(`Sending notifications to ${activeSubscribers.length} subscribers`);

  // Send emails to all subscribers
  const emailPromises: Promise<unknown>[] = activeSubscribers.map((subscriber: Subscriber) => {
    const emailData: EmailData = {
      to_email: subscriber.email,
      to_name: subscriber.email.split('@')[0],
      post_title: postData.title,
      post_excerpt: postData.excerpt || postData.description || 'Check out our latest blog post!',
      post_url: `${window.location.origin}/post/${postData.id}`,
      blog_name: 'Blogify',
      from_name: 'Samarth Muktamath'
    };

    return emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.NEW_POST_TEMPLATE_ID,
      emailData,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
  });

  try {
    await Promise.all(emailPromises);
    console.log('✅ All notification emails sent successfully');
  } catch (error) {
    console.error('❌ Error sending some emails:', error);
  }
};

// Remove subscriber with proper typing
export const removeSubscriber = (subscriberId: number): void => {
  const subscribers: Subscriber[] = getSubscribers();
  const updatedSubscribers: Subscriber[] = subscribers.filter(
    (sub: Subscriber) => sub.id !== subscriberId
  );
  localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
};

// Check if email already exists
export const isEmailSubscribed = (email: string): boolean => {
  const subscribers: Subscriber[] = getSubscribers();
  return subscribers.some((sub: Subscriber) => sub.email === email);
};

// Get subscriber count
export const getSubscriberCount = (): number => {
  const subscribers: Subscriber[] = getSubscribers();
  return subscribers.filter((sub: Subscriber) => sub.isActive).length;
};

// Utility function to create email data objects
export const createEmailData = (baseData: {
  to_email: string;
  to_name: string;
  blog_name?: string;
  from_name?: string;
  blog_url?: string;
  post_title?: string;
  post_excerpt?: string;
  post_url?: string;
}): EmailData => {
  return {  
    to_email: baseData.to_email,
    to_name: baseData.to_name,
    blog_name: baseData.blog_name || 'Blogify',
    from_name: baseData.from_name || 'Samarth Muktamath',
    ...(baseData.blog_url && { blog_url: baseData.blog_url }),
    ...(baseData.post_title && { post_title: baseData.post_title }),
    ...(baseData.post_excerpt && { post_excerpt: baseData.post_excerpt }),
    ...(baseData.post_url && { post_url: baseData.post_url })
  };
};
