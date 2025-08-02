import React, { useEffect, useState } from 'react';

const Skills = () => {
  const [animated, setAnimated] = useState(false);

  const skillsData = [
    {
      icon: 'fab fa-laravel',
      title: 'Laravel Ecosystem',
      description: 'Advanced Laravel development with Eloquent, Artisan, Queue, Broadcasting, and microservices architecture.',
      progress: 95
    },
    {
      icon: 'fas fa-database',
      title: 'Database Architecture',
      description: 'Expert in MySQL, PostgreSQL, Redis, Elasticsearch with advanced query optimization and indexing strategies.',
      progress: 90
    },
    {
      icon: 'fab fa-aws',
      title: 'Cloud & DevOps',
      description: 'AWS, Docker, Kubernetes, CI/CD pipelines with automated testing and deployment strategies.',
      progress: 85
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'API Development',
      description: 'RESTful APIs, GraphQL, OAuth2, JWT authentication with comprehensive API documentation.',
      progress: 92
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Security & Performance',
      description: 'Advanced security implementations, performance optimization, caching strategies, and load balancing.',
      progress: 88
    },
    {
      icon: 'fas fa-code-branch',
      title: 'Architecture & Design',
      description: 'Clean architecture, SOLID principles, design patterns, domain-driven design, and microservices patterns.',
      progress: 93
    }
  ];

  const techStack = [
    { name: 'Laravel', icon: 'fab fa-laravel', color: '#ff2d20' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e' },
    { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#4fc08d' },
    { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
    { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900' },
    { name: 'MySQL', icon: 'fas fa-database', color: '#4479a1' },
    { name: 'Redis', icon: 'fas fa-memory', color: '#dc382d' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'Linux', icon: 'fab fa-linux', color: '#fcc624' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !animated) {
          setAnimated(true);
          
          // Animate progress bars
          setTimeout(() => {
            const progressBars = document.querySelectorAll('.skill-progress-bar');
            progressBars.forEach((bar, index) => {
              const progress = skillsData[index].progress;
              bar.style.width = progress + '%';
            });
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated, skillsData]);

  return (
    <section className="skills scroll-reveal" id="skills">
      <div className="skills-container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div className="skill-card" key={index}>
              <i className={`${skill.icon} skill-icon`}></i>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-progress">
                <div 
                  className="skill-progress-bar" 
                  data-progress={skill.progress}
                  style={{ width: animated ? `${skill.progress}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tech Stack */}
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <div 
              className="tech-item" 
              key={index}
              data-name={tech.name}
            >
              <i 
                className={tech.icon} 
                style={{ color: tech.color }}
              ></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;