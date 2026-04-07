import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import LearningHub from './components/LearningHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  }, []);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <div className="app-spotlight" aria-hidden="true" />
      <div className="app-backdrop" aria-hidden="true" />
      <div className="app-content">
        <div className="scroll-progress">
          <div
            className="scroll-progress-bar"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
        <Header />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <LearningHub />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
