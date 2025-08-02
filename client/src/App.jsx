import React, { useEffect } from 'react';

// Impor komponen
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Impor CSS utama
import './index.css';

function App() {
  // Efek untuk animasi saat scroll
  useEffect(() => {
    const revealOnScroll = () => {
      const sections = document.querySelectorAll('section');
      const windowHeight = window.innerHeight;
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Panggil sekali saat load
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  // Efek untuk particles.js
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        "particles": {
          "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#f59e0b" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.5, "random": true },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": "#f59e0b", "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
          "modes": { "repulse": { "distance": 100 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
    }
  }, []);

  return (
    <>
      <canvas id="matrix-canvas" style={{ display: 'none' }}></canvas> {/* Matrix rain disembunyikan untuk saat ini, fokus pada particles */}
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
