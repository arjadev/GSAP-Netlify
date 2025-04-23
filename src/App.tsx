import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Examples from './components/Examples';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { cleanupScrollTriggers } from './utils/gsapUtils';

function App() {
  // Cleanup all GSAP animations when component unmounts
  useEffect(() => {
    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Examples />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;