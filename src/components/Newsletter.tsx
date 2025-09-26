import React, { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles, CheckCircle, Send, Star } from 'lucide-react';
import { addSubscriber, getSubscribers, type Subscriber } from '../utils/emailService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simple confetti effect
  useEffect(() => {
    if (isSubscribed) {
      createConfetti();
    }
  }, [isSubscribed]);

  const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.borderRadius = '2px';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
          {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: 1
          },
          {
            transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
            opacity: 0
          }
        ], {
          duration: 3000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
          document.body.removeChild(confetti);
        };
      }, i * 100);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get subscribers with proper typing
      const subscribers: Subscriber[] = getSubscribers();
      
      // Check if already subscribed with proper type
      const existingSubscriber: Subscriber | undefined = subscribers.find(
        (sub: Subscriber) => sub.email === email
      );
      
      if (existingSubscriber) {
        alert('You\'re already subscribed! 🎉');
        setIsLoading(false);
        return;
      }

      // Add subscriber and send welcome email
      await addSubscriber(email);
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated checkmark */}
        <motion.div
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Success text with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎉 Welcome Aboard!
          </h3>
          <p className="text-muted-foreground text-lg">
            You're now part of our story illumination family! 
          </p>
          <p className="text-muted-foreground/80 text-sm mt-2">
            Check your email for a welcome message ✉️
          </p>
        </motion.div>

        {/* Floating celebration elements */}
        <div className="relative mt-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${Math.random() * 20}px`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                delay: 0.8 + i * 0.1,
                repeat: 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-card/50 to-accent/20 backdrop-blur-sm border border-border/50 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 text-black dark:bg-primary/90 dark:text-white mb-4 font-bold shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-bold">Never Miss a Story</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Join Our Newsletter
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Get the latest stories that illuminate minds delivered straight to your inbox. 
          No spam, just pure inspiration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="pl-11 pr-4 py-3 bg-background/50 border-border/50 backdrop-blur-sm focus:bg-background/80 transition-all duration-300"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 aurora-glow transition-all duration-300 px-8 py-3 font-medium rounded-tl-lg rounded-br-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          <Star className="w-3 h-3 inline-block mr-1 text-yellow-500 fill-current" />
          Free forever. Unsubscribe anytime. No spam, we promise.
        </p>
      </form>
    </motion.div>
  );
};

export default Newsletter;
