import React, { useEffect, useRef } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

type NavItem = {
  title: string;
  target: string;
};

const navItems: NavItem[] = [
  { title: 'Home', target: '#hero' },
  { title: 'About', target: '#about' },
  { title: 'Examples', target: '#examples' },
  { title: 'Contact', target: '#contact' },
];

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add shadow and background when scrolled
      if (currentScrollY > 50) {
        header.classList.add('bg-white/90', 'dark:bg-gray-900/90', 'shadow-md', 'backdrop-blur-md');
      } else {
        header.classList.remove('bg-white/90', 'dark:bg-gray-900/90', 'shadow-md', 'backdrop-blur-md');
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power3.out' });
      } else {
        gsap.to(header, { yPercent: 0, duration: 0.3, ease: 'power3.out' });
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileMenuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.3, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      gsap.to(menu, {
        opacity: 0,
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
      });
      document.body.style.overflow = ''; // Restore scrolling
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
    // Scroll to target
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: 70,
        },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="#" 
            className="font-bold text-xl text-primary-600 dark:text-primary-400 flex items-center"
          >
            <span className="mr-2">GSAP</span>
            <span className="text-accent-500">Arjay</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.target}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.target);
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.title}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-xl transform transition-transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-50`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                className="text-gray-700 dark:text-gray-200 text-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;