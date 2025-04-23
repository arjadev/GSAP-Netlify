import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollTriggerDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline>();
  
  // Reset animation on visibility change
  useEffect(() => {
    const resetAnimation = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { y: 30, opacity: 0 });
        }
      });
    };
    
    resetAnimation();
    
    // Create demo animation that simulates ScrollTrigger
    tl.current = gsap.timeline({ paused: true });
    
    cardsRef.current.forEach((card, i) => {
      if (card) {
        tl.current?.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out"
        }, i * 0.1);
      }
    });
    
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
          tl.current?.pause(0);
          cardsRef.current.forEach((card) => {
            if (card) {
              gsap.set(card, { y: 30, opacity: 0 });
            }
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
      className="flex flex-col gap-4 w-full py-4"
    >
      {[1, 2, 3].map((num, i) => (
        <div 
          key={num}
          ref={el => cardsRef.current[i] = el}
          className="p-5 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-primary-500"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <p className="font-medium">Card {num}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This card appears with a scroll animation.
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScrollTriggerDemo;