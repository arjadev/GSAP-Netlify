import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const TextRevealDemo: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  // Create and store the animation timeline
  useEffect(() => {
    const textElement = textRef.current;
    
    if (textElement) {
      tl.current = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // First, set the text to empty
      tl.current.set(textElement, { text: "" });
      
      // Then animate the text content letter by letter
      tl.current.to(textElement, {
        duration: 2,
        text: "GSAP Text Animation",
        ease: "none"
      });
      
      // Pause at the beginning
      tl.current.pause(0);
    }
    
    return () => {
      tl.current?.kill();
    };
  }, []);
  
  // Play/pause the animation when the container is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tl.current?.play(0);
        } else {
          tl.current?.pause();
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="reveal-container flex justify-center items-center min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg w-full"
    >
      <h2 
        ref={textRef}
        className="text-3xl font-bold text-primary-600 dark:text-primary-400"
      ></h2>
    </div>
  );
};

export default TextRevealDemo;