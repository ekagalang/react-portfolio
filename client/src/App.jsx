import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// API service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

// Portfolio Context
const PortfolioContext = createContext();

const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// Custom Hooks
const useTypingEffect = (phrases, delay = 100) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const timeout = setTimeout(() => {
      const phrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setCurrentPhrase(phrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      } else {
        setCurrentPhrase(phrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex === phrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [phrases, phraseIndex, charIndex, isDeleting, delay]);

  return currentPhrase;
};

const useScrollReveal = () => {
  const [revealed, setRevealed] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return revealed;
};

// Components
const LoadingScreen = ({ isLoading }) => {
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  const loadingMessages = [
    'Initializing React...',
    'Loading components...',
    'Connecting to API...',
    'Fetching portfolio data...',
    'Ready to showcase!'
  ];

  useEffect(() => {
    if (!isLoading) return;
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingText(loadingMessages[messageIndex]);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark flex items-center justify-center z-50"
        >
          <div className="text-center">
            <div className="text-2xl text-primary font-code mb-4">
              {loadingText}
              <span className="animate-pulse">_</span>
            </div>
            <div className="w-64 h-1 bg-dark-lighter rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', updateMousePosition);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-5 h-5 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
};

const ParticlesBackground = () => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;

        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const opacity = (1000 - this.z) / 1000;
        const size = (1000 - this.z) / 1000 * 3;

        ctx.fillStyle = `rgba(245, 158, 11, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

const MatrixRain = () => {
  useEffect(() => {
    const container = document.getElementById('matrix-rain');
    if (!container) return;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${}[]()<>/*+-=&|;:.,?!@#%^&*';
    const codeWords = ['React', 'Express', 'Node.js', 'API', 'JavaScript', 'MongoDB', 'JWT', 'Redux'];

    for (let i = 0; i < 50; i++) {
      const column = document.createElement('div');
      column.className = 'absolute top-0 font-code text-sm opacity-5 text-primary';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      column.style.animationName = 'matrix-fall';
      column.style.animationIterationCount = 'infinite';
      column.style.animationTimingFunction = 'linear';

      let content = '';
      for (let j = 0; j < 20; j++) {
        if (Math.random() < 0.1) {
          content += codeWords[Math.floor(Math.random() * codeWords.length)] + '\n';
        } else {
          content += characters[Math.floor(Math.random() * characters.length)] + '\n';
        }
      }
      column.textContent = content;
      container.appendChild(column);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div id="matrix-rain" className="fixed inset-0 pointer-events-none z-0" />;
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#terminal', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/20 backdrop-blur-md' : 'bg-dark/10 backdrop-blur-md'
      } border border-primary/20 rounded-full px-8 py-4`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}
    >
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          &lt;RizkiDev/&gt;
        </div>
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-primary transition-colors duration-300 px-4 py-2 rounded-full hover:bg-primary/10"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { profile } = usePortfolio();
  const typingText = useTypingEffect(profile?.typingPhrases || [], 100);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-30"
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          >
            {i === 0 && <i className="fab fa-react text-accent" />}
            {i === 1 && <i className="fab fa-node-js text-secondary" />}
            {i === 2 && <i className="fab fa-js-square text-primary" />}
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 max-w-4xl px-8">
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {profile?.title || 'Senior Laravel Architect'}
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-4 opacity-90 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {profile?.subtitle || 'Crafting scalable web solutions with modern architecture'}
        </motion.p>
        
        <motion.div
          className="text-lg text-primary mb-12 h-8 font-code"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {typingText}
          <span className="animate-pulse">_</span>
        </motion.div>
        
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('#projects')}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-rocket" />
            View Projects
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-primary hover:text-dark transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-paper-plane" />
            Let's Talk
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function for scroll to section
const scrollToSection = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function App() {
  const [portfolioData, setPortfolioData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects')
        ]);

        setPortfolioData({
          profile: profileRes.data,
          skills: skillsRes.data.skills,
          techStack: skillsRes.data.techStack,
          projects: projectsRes.data
        });
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio data');
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    };

    fetchPortfolioData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-secondary">Oops! Something went wrong</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-dark px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={portfolioData}>
      <div className="min-h-screen bg-gradient-to-br from-dark-light via-dark to-dark-lighter text-white overflow-x-hidden cursor-none">
        <LoadingScreen isLoading={isLoading} />
        <CustomCursor />
        <ParticlesBackground />
        <MatrixRain />
        
        <Navigation />
        <Hero />
        
        {!isLoading && (
          <>
            <SkillsSection />
            <ProjectsSection />
            <TerminalSection />
            <ContactSection />
          </>
        )}
      </div>
    </PortfolioContext.Provider>
  );
}

// Skills Section Component
const SkillsSection = () => {
  const { skills, techStack } = usePortfolio();
  const revealed = useScrollReveal();

  return (
    <section id="skills" className="py-32 px-8" data-reveal>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={revealed.has('skills') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Technical Expertise
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skills?.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="bg-gradient-to-br from-dark-light/50 to-dark-lighter/30 backdrop-blur-lg border border-primary/10 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 group hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={revealed.has('skills') ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => {
                // Animate progress bar on hover
                const progressBar = document.querySelector(`#progress-${skill.id}`);
                if (progressBar) {
                  progressBar.style.width = `${skill.progress}%`;
                }
              }}
            >
              <div className="text-center">
                <i className={`${skill.icon} text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`} />
                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{skill.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Proficiency</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <motion.div
                      id={`progress-${skill.id}`}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={revealed.has('skills') ? { width: `${skill.progress}%` } : {}}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {skill.technologies?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary hover:text-dark transition-all duration-300 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={revealed.has('skills') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {techStack?.map((tech, index) => (
            <motion.div
              key={index}
              className="aspect-square bg-dark-lighter/30 rounded-2xl flex items-center justify-center text-3xl hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-pointer group relative"
              whileHover={{ rotate: 5, scale: 1.1 }}
              style={{ color: tech.color }}
            >
              <i className={tech.icon} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tech.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const { projects } = usePortfolio();
  const revealed = useScrollReveal();

  return (
    <section id="projects" className="py-32 px-8 bg-gradient-to-br from-dark-light/10 to-dark-lighter/10" data-reveal>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={revealed.has('projects') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gradient-to-br from-dark-light/60 to-dark-lighter/40 backdrop-blur-lg border border-primary/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 group"
              initial={{ opacity: 0, y: 50 }}
              animate={revealed.has('projects') ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -15, rotateX: 5 }}
            >
              <div className="h-64 bg-gradient-to-br from-dark-light to-dark-lighter flex items-center justify-center relative overflow-hidden">
                <motion.i
                  className={`${project.icon} text-6xl text-primary z-10`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary hover:text-dark transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-dark py-3 px-6 rounded-full font-semibold text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-external-link-alt" />
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-primary text-primary py-3 px-6 rounded-full font-semibold text-center hover:bg-primary hover:text-dark transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-github" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Terminal Section Component
const TerminalSection = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const revealed = useScrollReveal();

  const commands = [
    {
      command: 'whoami',
      output: [
        'Senior React & Node.js Developer',
        '8+ years experience in web development',
        'Specialized in full-stack JavaScript applications'
      ]
    },
    {
      command: 'ls -la experience/',
      output: [
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2016 startup-cto/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2018 senior-developer/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2020 tech-lead/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2022 solution-architect/'
      ]
    },
    {
      command: 'cat achievements.txt',
      output: [
        '✓ Built 50+ production React applications',
        '✓ Mentored 20+ junior developers',
        '✓ Optimized systems handling 1M+ daily users',
        '✓ Led development teams of 10+ engineers',
        '✓ Contributed to open-source React packages'
      ]
    },
    {
      command: 'npm run inspire',
      output: [
        '"The best way to predict the future is to create it." - Peter Drucker'
      ]
    }
  ];

  useEffect(() => {
    if (!revealed.has('terminal')) return;

    const executeCommand = (cmdIndex) => {
      if (cmdIndex >= commands.length) return;

      const cmd = commands[cmdIndex];
      
      // Add command line
      setTerminalLines(prev => [
        ...prev,
        { type: 'command', content: `rizki@portfolio:~$ ${cmd.command}` }
      ]);

      // Add output lines with delay
      cmd.output.forEach((line, lineIndex) => {
        setTimeout(() => {
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: line }
          ]);
        }, (lineIndex + 1) * 300);
      });

      // Execute next command
      setTimeout(() => {
        executeCommand(cmdIndex + 1);
      }, (cmd.output.length + 1) * 300 + 1000);
    };

    const timer = setTimeout(() => {
      executeCommand(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [revealed.has('terminal')]);

  return (
    <section id="terminal" className="py-32 px-8 bg-dark/80" data-reveal>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={revealed.has('terminal') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Development Experience
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4" />
        </motion.h2>

        <motion.div
          className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={revealed.has('terminal') ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-6 py-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-300 text-sm font-mono">rizki@portfolio:~</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm min-h-96">
            <AnimatePresence>
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  className={`mb-2 ${
                    line.type === 'command' 
                      ? 'text-green-400' 
                      : line.content.includes('✓') 
                        ? 'text-green-300'
                        : 'text-white'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {line.content}
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.div
              className="text-green-400 flex items-center"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              rizki@portfolio:~$ <span className="ml-2">_</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const { profile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const revealed = useScrollReveal();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/contact', formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-8 bg-gradient-radial from-primary/5 to-transparent" data-reveal>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={revealed.has('contact') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Let's Build Something Amazing
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4" />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={revealed.has('contact') ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Ready to transform your ideas into powerful, scalable web applications? 
              I'm here to help you architect solutions that drive business growth.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-envelope text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Email</h4>
                  <p className="text-gray-400">{profile?.email || 'hello@rizkidev.com'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-phone text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Phone</h4>
                  <p className="text-gray-400">{profile?.phone || '+62 812 3456 7890'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Location</h4>
                  <p className="text-gray-400">{profile?.location || 'Jakarta, Indonesia'}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {profile?.socialLinks && Object.entries(profile.socialLinks).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all duration-300"
                  whileHover={{ y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fab fa-${platform}`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-dark-light/30 backdrop-blur-lg rounded-3xl p-8 border border-primary/10"
            initial={{ opacity: 0, x: 50 }}
            animate={revealed.has('contact') ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-lighter/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-lighter/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-lighter/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-lighter/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Submit Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-green-400 text-center p-4 bg-green-400/10 rounded-lg border border-green-400/20"
                  >
                    <i className="fas fa-check-circle mr-2" />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg border border-red-400/20"
                  >
                    <i className="fas fa-exclamation-triangle mr-2" />
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};