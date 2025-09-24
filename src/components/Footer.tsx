import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary/10 border-t border-border/50 backdrop-blur-sm mt-6">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-col gap-2">
          
          {/* Top Section - Brand and Description */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            
            {/* Left Side - Content */}
            <div>
              <h3 className="text-base font-bold mb-1">
                Digital <span className="text-primary">Stories</span>
              </h3>
              
              <div className="text-muted-foreground text-xs">
                Illuminating the digital sky with captivating stories, insights, and ideas that inspire.
                <br /><br />
                <span className="text-muted-foreground/50">Where creativity meets technology, and every word builds bridges between minds.</span>
                <br />
                <span className="text-muted-foreground/50">Crafting narratives that transform thoughts into lasting digital legacies.</span>
              </div>
            </div>

            {/* Right Side - Darker Writing Collage */}
            <div className="flex justify-center md:justify-end">
              <div className="w-40 h-20">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 200 100" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Main Book/Journal - Darker */}
                  <rect x="50" y="45" width="100" height="35" rx="2" fill="hsl(var(--primary))" opacity="0.8" />
                  <rect x="52" y="47" width="96" height="31" rx="1.5" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  
                  {/* Writing Lines - Left Page - Darker */}
                  <rect x="56" y="52" width="30" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.9" />
                  <rect x="56" y="56" width="25" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.8" />
                  <rect x="56" y="60" width="28" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.9" />
                  <rect x="56" y="64" width="22" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.8" />
                  <rect x="56" y="68" width="26" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.9" />
                  
                  {/* Writing Lines - Right Page - Darker */}
                  <rect x="105" y="52" width="25" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.8" />
                  <rect x="105" y="56" width="20" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.7" />
                  <rect x="105" y="60" width="18" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.6" />
                  
                  {/* Pen - Darker */}
                  <rect x="155" y="55" width="15" height="2" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.9" />
                  <circle cx="156.5" cy="56" r="1" fill="hsl(var(--primary))" opacity="0.9" />
                  <circle cx="168.5" cy="56" r="0.8" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                  
                  {/* Coffee Cup - Darker */}
                  <rect x="20" y="55" width="12" height="15" rx="6" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                  <rect x="32" y="59" width="4" height="3" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.7" />
                  <ellipse cx="26" cy="57" rx="4" ry="1.5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                  
                  {/* Floating Elements - Darker */}
                  <circle cx="170" cy="20" r="2" fill="hsl(var(--primary))" opacity="0.7" />
                  <circle cx="180" cy="30" r="1.5" fill="hsl(var(--primary))" opacity="0.8" />
                  <circle cx="165" cy="35" r="1.5" fill="hsl(var(--primary))" opacity="0.6" />
                  
                  {/* Small Papers - Darker borders */}
                  <rect x="15" y="25" width="15" height="18" rx="1" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.9" />
                  <rect x="17" y="30" width="11" height="0.8" rx="0.4" fill="hsl(var(--primary))" opacity="0.7" />
                  <rect x="17" y="33" width="9" height="0.8" rx="0.4" fill="hsl(var(--primary))" opacity="0.6" />
                  
                  <rect x="170" y="28" width="12" height="15" rx="1" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.9" />
                  <rect x="172" y="33" width="8" height="0.8" rx="0.4" fill="hsl(var(--primary))" opacity="0.7" />
                  
                  {/* Additional dark elements for better visibility */}
                  <rect x="35" y="35" width="12" height="8" rx="1" fill="hsl(var(--primary))" opacity="0.6" />
                  <rect x="37" y="37" width="8" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />
                  <rect x="37" y="39" width="6" height="1" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />
                  
                  {/* Inkwell */}
                  <rect x="185" y="65" width="8" height="8" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.7" />
                  <ellipse cx="189" cy="67" rx="3" ry="1" fill="hsl(var(--foreground))" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Social Icons on Same Line */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-1 border-t border-border/20">
            
            {/* Copyright on Left */}
            <p className="text-muted-foreground text-xs order-2 sm:order-1">
              © 2025 Digital Stories. Made with <Heart className="w-3 h-3 text-red-500 inline mx-1" fill="currentColor" /> by Samarth
            </p>

            {/* Social Icons on Right with Real Links */}
            <div className="flex gap-3 justify-center sm:justify-end order-1 sm:order-2">
              <a 
                href="https://github.com/SAMARTH-MUKTAMATH"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors border border-primary/40 hover:border-slate-700 bg-background/30"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/samarthmuktamath"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors border border-primary/40 hover:border-slate-700 bg-background/30"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:samarthmise2025@gmail.com"
                className="p-2.5 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors border border-primary/40 hover:border-slate-700 bg-background/30"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
