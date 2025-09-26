import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';
import { addSubscriber, getSubscribers, type Subscriber } from '../utils/emailService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(var(--primary), 0.05), rgba(var(--accent), 0.05))",
              "linear-gradient(45deg, rgba(var(--accent), 0.05), rgba(var(--primary), 0.05))",
              "linear-gradient(45deg, rgba(var(--primary), 0.05), rgba(var(--accent), 0.05))"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Aboard! 🎉
          </h3>
          <p className="text-muted-foreground">
            You're now part of our story illumination family! Check your email for a welcome message.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-card/50 to-accent/20 rounded-xl p-8 relative overflow-hidden backdrop-blur-sm border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating elements animation */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Never Miss a Story</span>
          </motion.div>

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
              className="bg-primary hover:bg-primary/90 aurora-glow transition-all duration-300 px-8 py-3 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            ✨ Free forever. Unsubscribe anytime. No spam, we promise.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
