import React, { useEffect, useRef } from 'react';
import { Code, GitBranch, Play, Zap } from 'lucide-react';
import gsap from 'gsap';
import { scrollInFromSide, staggeredReveal } from '../utils/gsapUtils';

const features = [
  {
    icon: <Play className="text-primary-500" size={32} />,
    title: 'Seamless Animations',
    description: 'Create smooth, high-performance animations with precise control over timing and easing.'
  },
  {
    icon: <Zap className="text-secondary-500" size={32} />,
    title: 'Powerful Timeline',
    description: 'Sequence complex animation timelines with precise timing control and nested animations.'
  },
  {
    icon: <Code className="text-accent-500" size={32} />,
    title: 'Clean API',
    description: 'Intuitive JavaScript API that makes complex animations simple to create and maintain.'
  },
  {
    icon: <GitBranch className="text-success-500" size={32} />,
    title: 'ScrollTrigger',
    description: 'Create scroll-based animations that respond to user scrolling with precise control.'
  }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll-triggered animations
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
      });

      // Animate features
      gsap.from(featuresRef.current?.querySelectorAll('.feature-card'), {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
      });

      // Animate image
      scrollInFromSide('.about-image', false);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="mb-4 text-gray-900 dark:text-white">
            Why GSAP?
          </h2>
          <p ref={textRef} className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            GreenSock Animation Platform (GSAP) is a robust JavaScript toolset that turns developers into animation superheroes. Let's explore what makes it special.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div ref={imageRef} className="about-image rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Developer creating animations" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;