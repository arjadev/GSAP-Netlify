import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TimelineDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const mainTl = useRef<gsap.core.Timeline>();

  // Create and store the animation timeline
  useEffect(() => {
    const shape1 = shape1Ref.current;
    const shape2 = shape2Ref.current;
    const shape3 = shape3Ref.current;
    
    if (shape1 && shape2 && shape3) {
      // Timeline for the first shape
      const tl1 = gsap.timeline();
      tl1.to(shape1, {
        x: 50,
        rotation: 180,
        backgroundColor: "#0EA5E9",
        duration: 1
      });
      
      // Timeline for the second shape
      const tl2 = gsap.timeline();
      tl2.to(shape2, {
        scale: 1.5,
        borderRadius: "50%",
        backgroundColor: "#EC4899",
        duration: 1
      });
      
      // Timeline for the third shape
      const tl3 = gsap.timeline();
      tl3.to(shape3, {
        y: -30,
        rotation: 45,
        backgroundColor: "#22C55E",
        duration: 1
      });
      
      // Create main timeline
      mainTl.current = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        paused: true
      });
      
      // Add all timelines to the main timeline
      mainTl.current
        .add(tl1)
        .add(tl2, "-=0.5") // Start 0.5s before tl1 ends
        .add(tl3, "-=0.5") // Start 0.5s before tl2 ends
        .to([shape1, shape2, shape3], {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          borderRadius: "8px",
          backgroundColor: "#8B5CF6",
          duration: 1,
          delay: 0.5
        });
    }
    
    return () => {
      mainTl.current?.kill();
    };
  }, []);
  
  // Play/pause the animation when the container is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mainTl.current?.play(0);
        } else {
          mainTl.current?.pause();
          gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            borderRadius: "8px",
            backgroundColor: "#8B5CF6"
          });
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
      className="flex justify-center items-center gap-6 min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg w-full"
    >
      <div 
        ref={shape1Ref}
        className="w-12 h-12 bg-primary-600 rounded-lg"
      ></div>
      <div 
        ref={shape2Ref}
        className="w-12 h-12 bg-primary-600 rounded-lg"
      ></div>
      <div 
        ref={shape3Ref}
        className="w-12 h-12 bg-primary-600 rounded-lg"
      ></div>
    </div>
  );
};

export default TimelineDemo;