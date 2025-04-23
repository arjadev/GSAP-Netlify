import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimationExample from './AnimationExample';
import TextRevealDemo from './demos/TextRevealDemo';
import ScrollTriggerDemo from './demos/ScrollTriggerDemo';
import BoxAnimationDemo from './demos/BoxAnimationDemo';
import TimelineDemo from './demos/TimelineDemo';

const codeExamples = {
  textReveal: {
    javascript: `import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register the TextPlugin
gsap.registerPlugin(TextPlugin);

// Text reveal animation
function textReveal() {
  const tl = gsap.timeline();
  
  // First, set the text to empty
  tl.set(".reveal-text", { text: "" });
  
  // Then animate the text content letter by letter
  tl.to(".reveal-text", {
    duration: 2,
    text: "GSAP Text Animation",
    ease: "none"
  });
  
  return tl;
}

// Start the animation
textReveal();`,
    css: `.reveal-text {
  font-size: 2rem;
  font-weight: bold;
  color: #8B5CF6;
}

.reveal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
}`,
    html: `<div class="reveal-container">
  <h2 class="reveal-text"></h2>
</div>`
  },
  
  boxAnimation: {
    javascript: `import { gsap } from 'gsap';

function animateBox() {
  // Create a timeline
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5
  });
  
  // Add animations to the timeline
  tl.to(".box", { 
    rotation: 360, 
    duration: 2, 
    ease: "power2.inOut" 
  })
  .to(".box", { 
    x: 100, 
    duration: 1, 
    ease: "back.out(1.7)" 
  })
  .to(".box", { 
    backgroundColor: "#EC4899", 
    duration: 1 
  })
  .to(".box", { 
    borderRadius: "50%", 
    duration: 0.5 
  })
  .to(".box", { 
    scale: 1.5, 
    duration: 1, 
    ease: "elastic.out(1, 0.3)" 
  })
  .to(".box", { 
    x: 0, 
    scale: 1, 
    borderRadius: "0%", 
    backgroundColor: "#8B5CF6", 
    duration: 2, 
    ease: "power3.inOut" 
  });
  
  return tl;
}

// Start the animation
animateBox();`,
    css: `.box {
  width: 100px;
  height: 100px;
  background-color: #8B5CF6;
  border-radius: 4px;
}`,
    html: `<div class="box"></div>`
  },
  
  scrollTrigger: {
    javascript: `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function createScrollAnimation() {
  // Animate each card when it enters the viewport
  gsap.utils.toArray('.scroll-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', createScrollAnimation);`,
    css: `.scroll-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.scroll-card {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #8B5CF6;
}`,
    html: `<div class="scroll-container">
  <div class="scroll-card">Card 1</div>
  <div class="scroll-card">Card 2</div>
  <div class="scroll-card">Card 3</div>
</div>`
  },
  
  timeline: {
    javascript: `import { gsap } from 'gsap';

function createSequence() {
  // Create main timeline
  const mainTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
  });
  
  // Timeline for the first shape
  const tl1 = gsap.timeline();
  tl1.to(".shape1", {
    x: 100,
    rotation: 180,
    backgroundColor: "#0EA5E9",
    duration: 1
  });
  
  // Timeline for the second shape
  const tl2 = gsap.timeline();
  tl2.to(".shape2", {
    scale: 1.5,
    borderRadius: "50%",
    backgroundColor: "#EC4899",
    duration: 1
  });
  
  // Timeline for the third shape
  const tl3 = gsap.timeline();
  tl3.to(".shape3", {
    y: -50,
    rotation: 45,
    backgroundColor: "#22C55E",
    duration: 1
  });
  
  // Add all timelines to the main timeline
  mainTl
    .add(tl1)
    .add(tl2, "-=0.5") // Start 0.5s before tl1 ends
    .add(tl3, "-=0.5"); // Start 0.5s before tl2 ends
  
  return mainTl;
}

// Start the animation
createSequence();`,
    css: `.shapes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 200px;
}

.shape {
  width: 50px;
  height: 50px;
  background-color: #8B5CF6;
}

.shape1 {
  border-radius: 4px;
}

.shape2 {
  border-radius: 8px;
}

.shape3 {
  border-radius: 12px;
}`,
    html: `<div class="shapes-container">
  <div class="shape shape1"></div>
  <div class="shape shape2"></div>
  <div class="shape shape3"></div>
</div>`
  }
};

const Examples: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(descRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="examples" ref={sectionRef} className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="mb-4 text-gray-900 dark:text-white">
            Animation Examples
          </h2>
          <p ref={descRef} className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Explore these interactive examples to see GSAP in action. Each demo includes the code you need to implement it in your own projects.
          </p>
        </div>

        <div className="examples-grid">
          <AnimationExample
            title="Text Reveal Animation"
            description="Create engaging text reveal animations with GSAP's TextPlugin."
            code={codeExamples.textReveal}
            demoComponent={<TextRevealDemo />}
          />

          <AnimationExample
            title="Box Animation Sequence"
            description="Create complex animation sequences by chaining multiple properties."
            code={codeExamples.boxAnimation}
            demoComponent={<BoxAnimationDemo />}
          />
          
          <AnimationExample
            title="ScrollTrigger Animation"
            description="Trigger animations based on scroll position with ScrollTrigger."
            code={codeExamples.scrollTrigger}
            demoComponent={<ScrollTriggerDemo />}
          />
          
          <AnimationExample
            title="Timeline Sequencing"
            description="Coordinate multiple animations with precise timing using GSAP timelines."
            code={codeExamples.timeline}
            demoComponent={<TimelineDemo />}
          />
        </div>
      </div>
    </section>
  );
};

export default Examples;