import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BoxAnimationDemo: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  // Create and store the animation timeline
  useEffect(() => {
    const box = boxRef.current;
    
    if (box) {
      tl.current = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5
      });
      
      // Add animations to the timeline
      tl.current.to(box, { 
        rotation: 360, 
        duration: 2, 
        ease: "power2.inOut" 
      })
      .to(box, { 
        x: 100, 
        duration: 1, 
        ease: "back.out(1.7)" 
      })
      .to(box, { 
        backgroundColor: "#EC4899", 
        duration: 1 
      })
      .to(box, { 
        borderRadius: "50%", 
        duration: 0.5 
      })
      .to(box, { 
        scale: 1.5, 
        duration: 1, 
        ease: "elastic.out(1, 0.3)" 
      })
      .to(box, { 
        x: 0, 
        scale: 1, 
        borderRadius: "0%", 
        backgroundColor: "#8B5CF6", 
        duration: 2, 
        ease: "power3.inOut" 
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
      className="flex justify-center items-center min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg w-full"
    >
      <div 
        ref={boxRef}
        className="w-20 h-20 bg-primary-600 rounded"
      ></div>
    </div>
  );
};

export default BoxAnimationDemo;