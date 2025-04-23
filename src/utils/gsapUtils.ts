import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Text reveal animation
export const textReveal = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    duration: 1.5,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    delay,
  });
};

// Fade in animation
export const fadeIn = (element: string, delay: number = 0, duration: number = 1) => {
  return gsap.from(element, {
    duration,
    opacity: 0,
    delay,
    ease: 'power2.out',
  });
};

// Scroll in from side animation
export const scrollInFromSide = (element: string, fromLeft: boolean = true) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    x: fromLeft ? -100 : 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
};

// Staggered reveal for lists
export const staggeredReveal = (element: string) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
  });
};

// Scroll to section animation
export const scrollToSection = (target: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: 70,
    },
    ease: 'power3.inOut',
  });
};

// Parallax effect for background elements
export const parallaxEffect = (element: string, speed: number = 0.5) => {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * (target.dataset.speed || 0.2),
    ease: 'none',
  });
};

// Cleanup function to kill all ScrollTrigger instances
export const cleanupScrollTriggers = () => {
  const triggers = ScrollTrigger.getAll();
  triggers.forEach(trigger => trigger.kill());
};