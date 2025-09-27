import { Github, Linkedin, Mail, Heart, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Subscribe",
    "Stay Updated", 
    "Newsletter",
    "Get Notified",
    "Join Us"
  ];

  // Auto-cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNewsletter = () => {
    // Try to find the email input specifically
    const emailInput = document.querySelector('input[type="email"]');
    const newsletterForm = document.querySelector('form');
    const newsletterSection = document.getElementById('newsletter-section');
    
    if (emailInput) {
      // Scroll to email input with some offset
      emailInput.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    } else if (newsletterForm) {
      // Fallback to form
      newsletterForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    } else if (newsletterSection) {
      // Fallback to section but scroll lower
      newsletterSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary/10 border-t border-border/50 backdrop-blur-sm mt-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2">
        <div className="flex flex-col gap-2">
          
          {/* Top Section - Brand and Description */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">
            
            {/* Left Side - Content */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
                Blog<span className="text-primary">ify</span>
              </h3>
              
              <div className="text-foreground/80 text-xs sm:text-sm mb-1">
                <div className="mb-1">
                  Illuminating the digital sky with captivating stories, insights, and ideas that inspire.
                </div>
                <div className="text-foreground/60">
                  Where creativity meets technology, and every word builds bridges between minds.
                </div>
              </div>
            </div>

            {/* Right Side - Illustration and Social Icons */}
            <div className="flex flex-col items-center lg:items-start gap-2">
              
              {/* Main Illustration - Responsive SVG */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-12 sm:h-14 md:h-16">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 480 80" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  {/* Transparent background */}
                  <rect width="480" height="80" fill="transparent"/>
                  
                  {/* LEFT AREA - Tech Developer */}
                  <g transform="translate(10, 5)">
                    <circle cx="15" cy="12" r="6" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="1.2" />
                    <path d="M 9 9 Q 15 4 21 9 Q 19 6 15 5 Q 11 6 9 9" fill="#a5b4fc" stroke="#e0e7ff" strokeWidth="0.8" />
                    <circle cx="12" cy="10" r="0.8" fill="#4c1d95" />
                    <circle cx="18" cy="10" r="0.8" fill="#4c1d95" />
                    <circle cx="12.3" cy="9.7" r="0.3" fill="#ffffff" />
                    <circle cx="18.3" cy="9.7" r="0.3" fill="#ffffff" />
                    <rect x="9" y="18" width="12" height="15" rx="2" fill="#a7f3d0" stroke="#e0e7ff" strokeWidth="0.8" />
                    <rect x="4" y="21" width="5" height="8" rx="2.5" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.6" />
                    <rect x="21" y="21" width="5" height="8" rx="2.5" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.6" />
                    
                    {/* Laptop */}
                    <rect x="7" y="33" width="16" height="10" rx="1" fill="#4c1d95" stroke="#e0e7ff" strokeWidth="0.8" />
                    <rect x="8" y="34" width="14" height="8" rx="0.5" fill="#312e81" />
                    <rect x="9" y="35" width="12" height="5" rx="0.3" fill="#a7f3d0" opacity="0.6" />
                    <rect x="10" y="36" width="4" height="0.6" fill="#34d399" opacity="0.8" />
                    <rect x="10" y="37.5" width="6" height="0.6" fill="#fde68a" opacity="0.8" />
                    <rect x="10" y="39" width="3" height="0.6" fill="#fca5a5" opacity="0.8" />
                    
                    {/* Thought bubble */}
                    <circle cx="30" cy="12" r="6" fill="#f0f9ff" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.9" />
                    <circle cx="26" cy="18" r="2" fill="#f0f9ff" stroke="#a5b4fc" strokeWidth="0.8" opacity="0.7" />
                    <circle cx="24" cy="21" r="1" fill="#f0f9ff" stroke="#a5b4fc" strokeWidth="0.6" opacity="0.5" />
                    <rect x="26" y="9" width="8" height="0.8" fill="#a5b4fc" opacity="0.8" />
                    <rect x="26" y="12" width="6" height="0.8" fill="#a5b4fc" opacity="0.7" />
                    <rect x="26" y="15" width="7" height="0.8" fill="#a5b4fc" opacity="0.6" />
                    
                    {/* WiFi signal */}
                    <path d="M 38 8 Q 42 4 46 8" stroke="#34d399" strokeWidth="1.5" fill="none" />
                    <path d="M 40 10 Q 42 8 44 10" stroke="#34d399" strokeWidth="1.2" fill="none" />
                    <circle cx="42" cy="12" r="0.8" fill="#34d399" />
                  </g>
                  
                  {/* CENTER-LEFT AREA - Blogging Tools */}
                  <g transform="translate(110, 5)">
                    <rect x="0" y="20" width="60" height="20" rx="2" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <rect x="1" y="21" width="58" height="18" rx="1.5" fill="#f0f9ff" stroke="#a5b4fc" strokeWidth="0.5" />
                    <rect x="29" y="21" width="1" height="18" fill="#a5b4fc" opacity="0.6" />
                    
                    {/* Writing Lines - Left Page */}
                    <rect x="3" y="23" width="22" height="1" rx="0.5" fill="#34d399" opacity="0.8" />
                    <rect x="3" y="25.5" width="20" height="1" rx="0.5" fill="#22c55e" opacity="0.7" />
                    <rect x="3" y="28" width="21" height="1" rx="0.5" fill="#34d399" opacity="0.8" />
                    <rect x="3" y="30.5" width="18" height="1" rx="0.5" fill="#22c55e" opacity="0.6" />
                    <rect x="3" y="33" width="20" height="1" rx="0.5" fill="#34d399" opacity="0.7" />
                    <rect x="3" y="35.5" width="21" height="1" rx="0.5" fill="#22c55e" opacity="0.6" />
                    
                    {/* Writing Lines - Right Page */}
                    <rect x="32" y="23" width="20" height="1" rx="0.5" fill="#22c55e" opacity="0.8" />
                    <rect x="32" y="25.5" width="18" height="1" rx="0.5" fill="#34d399" opacity="0.7" />
                    <rect x="32" y="28" width="16" height="1" rx="0.5" fill="#22c55e" opacity="0.7" />
                    <rect x="32" y="30.5" width="19" height="1" rx="0.5" fill="#34d399" opacity="0.7" />
                    <rect x="32" y="33" width="17" height="1" rx="0.5" fill="#22c55e" opacity="0.7" />
                    <rect x="32" y="35.5" width="18" height="1" rx="0.5" fill="#34d399" opacity="0.6" />
                    
                    {/* Coffee cup */}
                    <rect x="8" y="8" width="10" height="12" rx="5" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <rect x="18" y="11" width="4" height="3" rx="1.5" fill="#6b7280" />
                    <ellipse cx="13" cy="9" rx="4" ry="1.5" fill="#312e81" />
                    <ellipse cx="13" cy="9" rx="2.5" ry="1" fill="#a7f3d0" opacity="0.5" />
                    
                    {/* Steam */}
                    <path d="M 11 6 Q 12 2 11 -2" stroke="#a5b4fc" strokeWidth="1" fill="none" opacity="0.6" />
                    <path d="M 15 6 Q 14 2 15 -2" stroke="#a5b4fc" strokeWidth="1" fill="none" opacity="0.6" />
                    
                    {/* Pens */}
                    <rect x="65" y="28" width="12" height="2" rx="1" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.4" />
                    <circle cx="66.5" cy="29" r="1" fill="#34d399" />
                    <rect x="72" y="28.3" width="4" height="1.4" rx="0.7" fill="#6b7280" />
                    <circle cx="76" cy="29" r="0.8" fill="#4c1d95" />
                    
                    <rect x="65" y="35" width="10" height="1.5" rx="0.75" fill="#fde68a" />
                    <rect x="65" y="35.2" width="1.5" height="1.1" rx="0.55" fill="#4c1d95" />
                    <circle cx="73.5" cy="35.75" r="0.6" fill="#fca5a5" />
                  </g>
                  
                  {/* CENTER-RIGHT AREA - Tech Elements */}
                  <g transform="translate(240, 5)">
                    <rect x="0" y="12" width="35" height="20" rx="1.5" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <rect x="1" y="13" width="33" height="18" rx="1" fill="#312e81" />
                    <rect x="2" y="14" width="31" height="14" rx="0.3" fill="#a7f3d0" opacity="0.4" />
                    <rect x="5" y="32" width="26" height="3" rx="1.5" fill="#6b7280" />
                    <circle cx="18" cy="33.5" r="1.2" fill="#a5b4fc" />
                    
                    {/* Code lines */}
                    <rect x="3" y="15" width="10" height="1" fill="#34d399" opacity="0.8" />
                    <rect x="15" y="15" width="8" height="1" fill="#fde68a" opacity="0.8" />
                    <rect x="3" y="17" width="14" height="1" fill="#bfdbfe" opacity="0.8" />
                    <rect x="3" y="19" width="12" height="1" fill="#fca5a5" opacity="0.7" />
                    <rect x="3" y="21" width="16" height="1" fill="#c4b5fd" opacity="0.8" />
                    <rect x="3" y="23" width="14" height="1" fill="#34d399" opacity="0.7" />
                    <rect x="3" y="25" width="10" height="1" fill="#fde68a" opacity="0.7" />
                    <rect x="3" y="27" width="13" height="1" fill="#bfdbfe" opacity="0.8" />
                    
                    {/* Phone */}
                    <rect x="42" y="15" width="10" height="18" rx="3" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.6" />
                    <rect x="43" y="16" width="8" height="16" rx="1.5" fill="#312e81" />
                    <rect x="44" y="18" width="6" height="0.8" fill="#bfdbfe" opacity="0.7" />
                    <rect x="44" y="20" width="4" height="0.8" fill="#a5b4fc" opacity="0.6" />
                    <rect x="44" y="22" width="5" height="0.8" fill="#bfdbfe" opacity="0.7" />
                    <rect x="44" y="24" width="3" height="0.8" fill="#a7f3d0" opacity="0.7" />
                    <circle cx="47" cy="29" r="1.8" fill="#a5b4fc" opacity="0.7" />
                    
                    {/* Tablet */}
                    <rect x="60" y="5" width="20" height="30" rx="3" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <rect x="61" y="6" width="18" height="28" rx="2.5" fill="#312e81" />
                    <rect x="62" y="8" width="16" height="1.5" fill="#bfdbfe" opacity="0.8" />
                    <rect x="62" y="11" width="14" height="1.5" fill="#a5b4fc" opacity="0.7" />
                    <rect x="62" y="14" width="15" height="1.5" fill="#bfdbfe" opacity="0.8" />
                    <rect x="62" y="17" width="13" height="1.5" fill="#a5b4fc" opacity="0.7" />
                    <rect x="62" y="20" width="14" height="1.5" fill="#bfdbfe" opacity="0.8" />
                    <rect x="62" y="23" width="12" height="1.5" fill="#a7f3d0" opacity="0.7" />
                    <rect x="62" y="26" width="13" height="1.5" fill="#fde68a" opacity="0.7" />
                    <circle cx="70" cy="31" r="2.5" fill="#a5b4fc" opacity="0.7" />
                  </g>
                  
                  {/* RIGHT AREA - More Tech Elements */}
                  <g transform="translate(370, 5)">
                    <rect x="0" y="5" width="25" height="18" rx="1.5" fill="#312e81" stroke="#34d399" strokeWidth="1" />
                    <circle cx="3" cy="8" r="0.8" fill="#fca5a5" />
                    <circle cx="6" cy="8" r="0.8" fill="#fde68a" />
                    <circle cx="9" cy="8" r="0.8" fill="#a7f3d0" />
                    <rect x="2" y="11" width="8" height="0.8" fill="#34d399" opacity="0.8" />
                    <rect x="2" y="13" width="12" height="0.8" fill="#34d399" opacity="0.7" />
                    <rect x="2" y="15" width="6" height="0.8" fill="#34d399" opacity="0.8" />
                    <rect x="2" y="17" width="10" height="0.8" fill="#34d399" opacity="0.6" />
                    <rect x="2" y="19" width="5" height="0.8" fill="#34d399" opacity="0.8" />
                    
                    {/* Database */}
                    <ellipse cx="35" cy="15" rx="8" ry="3" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <rect x="27" y="15" width="16" height="12" fill="#4c1d95" />
                    <ellipse cx="35" cy="27" rx="8" ry="3" fill="#5b21b6" />
                    <ellipse cx="35" cy="23" rx="8" ry="3" fill="#6d28d9" />
                    <ellipse cx="35" cy="19" rx="8" ry="3" fill="#a5b4fc" />
                    
                    {/* Cloud */}
                    <ellipse cx="60" cy="25" rx="6" ry="3" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.8" />
                    <ellipse cx="55" cy="27" rx="4" ry="2.5" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.8" />
                    <ellipse cx="65" cy="27" rx="4" ry="2.5" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.8" />
                    <ellipse cx="60" cy="30" rx="7" ry="2.5" fill="#bfdbfe" stroke="#e0e7ff" strokeWidth="0.8" />
                    
                    {/* RSS */}
                    <circle cx="15" cy="40" r="8" fill="#4c1d95" stroke="#a5b4fc" strokeWidth="0.8" />
                    <circle cx="12" cy="43" r="2" fill="#fb923c" />
                    <path d="M 7 37 Q 14 37 21 44" stroke="#fb923c" strokeWidth="2" fill="none" />
                    <path d="M 7 34 Q 17 34 27 44" stroke="#fb923c" strokeWidth="1.8" fill="none" opacity="0.8" />
                    
                    {/* Lightbulb */}
                    <circle cx="60" cy="55" r="5" fill="#fde68a" stroke="#e0e7ff" strokeWidth="1" />
                    <rect x="57" y="60" width="6" height="2.5" rx="1.25" fill="#a5b4fc" stroke="#e0e7ff" strokeWidth="0.8" />
                    
                    {/* Light rays */}
                    <path d="M 53 48 L 54.5 49.5" stroke="#fde68a" strokeWidth="1.5" />
                    <path d="M 60 45 L 60 47" stroke="#fde68a" strokeWidth="1.5" />
                    <path d="M 67 48 L 65.5 49.5" stroke="#fde68a" strokeWidth="1.5" />
                    <path d="M 70 55 L 68 55" stroke="#fde68a" strokeWidth="1.5" />
                  </g>
                  
                  {/* FAR RIGHT - Books */}
                  <g transform="translate(440, 5)" className="hidden sm:block">
                    <rect x="0" y="20" width="6" height="20" rx="1.5" fill="#bfdbfe" opacity="0.9" />
                    <rect x="8" y="18" width="6" height="22" rx="1.5" fill="#a5b4fc" opacity="0.8" />
                    <rect x="16" y="16" width="6" height="24" rx="1.5" fill="#bfdbfe" opacity="0.7" />
                    
                    <rect x="1" y="12" width="4" height="10" rx="0.8" fill="#fca5a5" />
                    <polygon points="1,22 3,19 5,22 5,25 1,25" fill="#ef4444" />
                    <rect x="9" y="10" width="4" height="10" rx="0.8" fill="#a7f3d0" />
                    <polygon points="9,20 11,17 13,20 13,23 9,23" fill="#22c55e" />
                  </g>
                  
                  {/* Particles */}
                  <circle cx="60" cy="8" r="1.5" fill="#c4b5fd" opacity="0.8" />
                  <circle cx="120" cy="5" r="1.2" fill="#bfdbfe" opacity="0.7" />
                  <circle cx="180" cy="8" r="1.3" fill="#a7f3d0" opacity="0.6" />
                  <circle cx="240" cy="5" r="1.1" fill="#fde68a" opacity="0.8" />
                  <circle cx="300" cy="7" r="1.2" fill="#fca5a5" opacity="0.7" />
                  <circle cx="360" cy="8" r="1.5" fill="#c4b5fd" opacity="0.9" />
                  <circle cx="90" cy="65" r="1.5" fill="#c4b5fd" opacity="0.9" />
                  <circle cx="150" cy="70" r="1.2" fill="#bfdbfe" opacity="0.8" />
                  <circle cx="210" cy="60" r="1.1" fill="#a7f3d0" opacity="0.7" />
                  <circle cx="270" cy="67" r="1.3" fill="#fde68a" opacity="0.6" />
                  <circle cx="330" cy="63" r="1.2" fill="#fca5a5" opacity="0.7" />
                  
                  {/* Stars */}
                  <g fill="#f0f9ff" stroke="#a5b4fc" strokeWidth="0.6">
                    <polygon points="45,5 45.5,7 47.5,7 46,8.5 46.5,10.5 45,9.5 43.5,10.5 44,8.5 42.5,7 44.5,7" opacity="0.7" />
                    <polygon points="140,3 140.5,4.5 142,4.5 141,5.5 141.5,7 140,6.5 138.5,7 139,5.5 138,4.5 139.5,4.5" opacity="0.8" />
                    <polygon points="250,8 250.5,9.5 252,9.5 251,10.5 251.5,12 250,11.5 248.5,12 249,10.5 248,9.5 249.5,9.5" opacity="0.6" />
                    <polygon points="75,72 75.5,73.5 77,73.5 76,74.5 76.5,76 75,75.5 73.5,76 74,74.5 73,73.5 74.5,73.5" opacity="0.7" />
                    <polygon points="190,75 190.5,76.5 192,76.5 191,77.5 191.5,79 190,78.5 188.5,79 189,77.5 188,76.5 189.5,76.5" opacity="0.8" />
                  </g>
                </svg>
              </div>
              
              {/* Social Icons and Newsletter - Single Row */}
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start w-full">
                {/* Social Icons */}
                <a 
                  href="https://github.com/SAMARTH-MUKTAMATH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-900 hover:text-slate-100 transition-colors border border-primary/30 hover:border-slate-600 bg-primary/20"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/samarthmuktamath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-900 hover:text-slate-100 transition-colors border border-primary/30 hover:border-slate-600 bg-primary/20"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="mailto:samarthmise2025@gmail.com"
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-900 hover:text-slate-100 transition-colors border border-primary/30 hover:border-slate-600 bg-primary/20"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                {/* Newsletter Button - No scaling, bright colors */}
                <button
                  onClick={scrollToNewsletter}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-primary/40 hover:bg-primary/60 border border-primary/60 hover:border-primary/80 transition-colors duration-300"
                >
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-foreground animate-bounce" />
                  <span 
                    key={currentMessage} 
                    className="text-xs sm:text-sm font-medium text-foreground animate-pulse"
                  >
                    {messages[currentMessage]}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="border-t border-border/20 pt-1">
            <p className="text-foreground/70 text-xs sm:text-sm text-center lg:text-left">
              © 2025 Blogify. Made with <Heart className="w-3 h-3 text-red-500 inline mx-1" fill="currentColor" /> by Samarth
            </p>
          </div>
        </div>
      </div>
    </footer>  
  );
};
