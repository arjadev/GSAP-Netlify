import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { textReveal } from '../utils/gsapUtils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      textReveal('h1 .char', 0.5);
      
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
      });
      
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
      });
      
      // Decorative elements animation
      gsap.from(decorRef.current?.querySelectorAll('.decor-circle'), {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        delay: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
      
      // Floating animation for decorative elements
      gsap.to(decorRef.current?.querySelectorAll('.decor-circle'), {
        y: '+=20',
        x: '+=10',
        rotation: '+=5',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }, heroRef);
    
    // Split text into chars for animation
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = '';
      
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char inline-block';
        span.innerText = char === ' ' ? '\u00A0' : char;
        titleRef.current?.appendChild(span);
      });
    }
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 dark:from-primary-400 dark:via-accent-400 dark:to-secondary-400"
          >
            Create Stunning Animations with GSAP
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Explore the power of GreenSock Animation Platform with interactive examples and code snippets.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#examples" 
              className="btn-primary flex items-center gap-2"
            >
              Explore Examples <ArrowRight size={18} />
            </a>
            <a 
              href="#about" 
              className="btn border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-circle absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary-200/30 dark:bg-primary-900/20"></div>
        <div className="decor-circle absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary-200/20 dark:bg-secondary-900/20"></div>
        <div className="decor-circle absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-accent-200/20 dark:bg-accent-900/20"></div>
      </div>
    </section>
  );
};

export default Hero;