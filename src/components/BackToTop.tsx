import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import gsap from 'gsap';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        '.back-to-top',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to('.back-to-top', { opacity: 0, y: 20, duration: 0.3, ease: 'power3.in' });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <button
      className={`back-to-top fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50 ${
        isVisible ? 'flex' : 'hidden'
      } items-center justify-center hover:bg-primary-700 transition-colors`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTop;