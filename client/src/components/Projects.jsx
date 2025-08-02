import React from 'react';

const Projects = () => {
  const projectsData = [
    {
      id: 1,
      title: 'Enterprise E-Commerce Platform',
      description: 'Multi-tenant e-commerce solution with advanced inventory management, real-time analytics, and AI-powered recommendations.',
      icon: 'fas fa-shopping-cart',
      tags: ['Laravel 10', 'Vue 3', 'Redis', 'Elasticsearch', 'Docker', 'AWS'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      description: 'High-performance dashboard processing millions of events with WebSocket real-time updates and machine learning insights.',
      icon: 'fas fa-chart-line',
      tags: ['Laravel 10', 'Livewire 3', 'WebSockets', 'ClickHouse', 'Queue'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'AI-Powered CRM System',
      description: 'Intelligent CRM with natural language processing, automated lead scoring, and predictive analytics for sales teams.',
      icon: 'fas fa-robot',
      tags: ['Laravel 10', 'OpenAI API', 'Python ML', 'PostgreSQL', 'Kubernetes'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Microservices API Gateway',
      description: 'Scalable API gateway handling authentication, rate limiting, and service discovery for distributed architecture.',
      icon: 'fas fa-cloud',
      tags: ['Laravel 10', 'Microservices', 'JWT', 'Service Mesh', 'Monitoring'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Healthcare Management Platform',
      description: 'HIPAA-compliant healthcare platform with telemedicine, patient records, and integrated billing system.',
      icon: 'fas fa-heartbeat',
      tags: ['Laravel 10', 'HIPAA Compliance', 'WebRTC', 'Encryption', 'FHIR API'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'AI Learning Management System',
      description: 'Adaptive learning platform with AI-driven personalization, video streaming, and comprehensive progress analytics.',
      icon: 'fas fa-graduation-cap',
      tags: ['Laravel 10', 'Machine Learning', 'Video Processing', 'Analytics', 'CDN'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section className="projects scroll-reveal" id="projects">
      <div className="skills-container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <i className={`${project.icon} project-icon`}></i>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.demoUrl} className="project-link primary">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a href={project.githubUrl} className="project-link secondary">
                    <i className="fab fa-github"></i>
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;