import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Building scalable applications...',
    'Optimizing database queries...',
    'Implementing microservices...',
    'Creating RESTful APIs...',
    'Deploying to the cloud...'
  ];

  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setTypingText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setTypingText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        typeSpeed = 500;
      }
      
      setTimeout(typeWriter, typeSpeed);
    };

    const timeout = setTimeout(typeWriter, 2000);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <section className="hero scroll-reveal" id="home">
      <div className="hero-bg"></div>
      
      {/* Floating Elements */}
      <div className="floating-element">
        <i className="fab fa-laravel" style={{ fontSize: '3rem', color: 'var(--primary)', opacity: 0.3 }}></i>
      </div>
      <div className="floating-element">
        <i className="fab fa-php" style={{ fontSize: '2.5rem', color: 'var(--secondary)', opacity: 0.3 }}></i>
      </div>
      <div className="floating-element">
        <i className="fab fa-js-square" style={{ fontSize: '2rem', color: 'var(--accent)', opacity: 0.3 }}></i>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Senior Laravel Architect</h1>
        <p className="hero-subtitle">Crafting scalable web solutions with modern architecture</p>
        <div className="typing-text font-code">{typingText}</div>
        
        <div className="hero-cta">
          <a href="#projects" className="cta-primary">
            <i className="fas fa-rocket"></i>
            View Projects
          </a>
          <a href="#contact" className="cta-secondary">
            <i className="fas fa-paper-plane"></i>
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;