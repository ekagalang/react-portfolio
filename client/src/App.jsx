import React, { useEffect, useState } from 'react';

// Import komponen
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import MatrixRain from './components/MatrixRain';
import Particles from './components/Particles';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Contact from './components/Contact';

// Import CSS utama
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Loading effect
  useEffect(() => {
    const loadingTexts = [
      'Initializing Laravel...',
      'Loading Artisan commands...',
      'Connecting to database...',
      'Optimizing performance...',
      'Ready to code!'
    ];
    
    let currentText = 0;
    const textInterval = setInterval(() => {
      if (currentText < loadingTexts.length - 1) {
        currentText++;
      } else {
        clearInterval(textInterval);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }, 500);

    return () => clearInterval(textInterval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Reveal sections on scroll
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach(section => {
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          section.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CustomCursor />
      <MatrixRain />
      <Particles />
      <Navigation scrolled={scrolled} />
      
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
    </>
  );
}

export default App;