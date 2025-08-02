const express = require('express');
const router = express.Router();

// Portfolio data
const portfolioData = {
  profile: {
    name: 'Rizki Ahmad',
    title: 'Senior Laravel Architect',
    subtitle: 'Crafting scalable web solutions with modern architecture',
    location: 'Jakarta, Indonesia',
    email: 'hello@rizkidev.com',
    phone: '+62 812 3456 7890',
    bio: 'Passionate Laravel architect with 8+ years of experience building scalable web applications. Specialized in microservices architecture, API development, and cloud deployment strategies.',
    socialLinks: {
      github: 'https://github.com/rizkiahmad',
      linkedin: 'https://linkedin.com/in/rizkiahmad',
      twitter: 'https://twitter.com/rizkiahmad',
      instagram: 'https://instagram.com/rizkiahmad',
      whatsapp: 'https://wa.me/6281234567890'
    },
    typingPhrases: [
      'Building scalable applications...',
      'Optimizing database queries...',
      'Implementing microservices...',
      'Creating RESTful APIs...',
      'Deploying to the cloud...'
    ]
  },

  skills: [
    {
      id: 1,
      category: 'Laravel Ecosystem',
      description: 'Advanced Laravel development with Eloquent, Artisan, Queue, Broadcasting, and microservices architecture.',
      icon: 'fab fa-laravel',
      progress: 95,
      technologies: ['Laravel 10', 'Eloquent ORM', 'Artisan CLI', 'Queue System', 'Broadcasting', 'Nova Admin'],
      experience: '8+ years'
    },
    {
      id: 2,
      category: 'Database Architecture',
      description: 'Expert in MySQL, PostgreSQL, Redis, Elasticsearch with advanced query optimization and indexing strategies.',
      icon: 'fas fa-database',
      progress: 90,
      technologies: ['MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch', 'MongoDB', 'ClickHouse'],
      experience: '7+ years'
    },
    {
      id: 3,
      category: 'Cloud & DevOps',
      description: 'AWS, Docker, Kubernetes, CI/CD pipelines with automated testing and deployment strategies.',
      icon: 'fab fa-aws',
      progress: 85,
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
      experience: '5+ years'
    },
    {
      id: 4,
      category: 'API Development',
      description: 'RESTful APIs, GraphQL, OAuth2, JWT authentication with comprehensive API documentation.',
      icon: 'fas fa-mobile-alt',
      progress: 92,
      technologies: ['REST API', 'GraphQL', 'OAuth2', 'JWT', 'Swagger', 'Postman'],
      experience: '8+ years'
    },
    {
      id: 5,
      category: 'Security & Performance',
      description: 'Advanced security implementations, performance optimization, caching strategies, and load balancing.',
      icon: 'fas fa-shield-alt',
      progress: 88,
      technologies: ['Security Headers', 'SSL/TLS', 'Caching', 'Load Balancing', 'Performance Tuning'],
      experience: '6+ years'
    },
    {
      id: 6,
      category: 'Architecture & Design',
      description: 'Clean architecture, SOLID principles, design patterns, domain-driven design, and microservices patterns.',
      icon: 'fas fa-code-branch',
      progress: 93,
      technologies: ['Clean Architecture', 'SOLID Principles', 'Design Patterns', 'DDD', 'Microservices'],
      experience: '7+ years'
    }
  ],

  techStack: [
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
  ],

  projects: [
    {
      id: 1,
      title: 'Enterprise E-Commerce Platform',
      description: 'Multi-tenant e-commerce solution with advanced inventory management, real-time analytics, and AI-powered recommendations.',
      icon: 'fas fa-shopping-cart',
      image: '/images/projects/ecommerce.jpg',
      technologies: ['Laravel 10', 'Vue 3', 'Redis', 'Elasticsearch', 'Docker', 'AWS'],
      features: [
        'Multi-tenant architecture',
        'Real-time inventory management',
        'AI-powered product recommendations',
        'Advanced analytics dashboard',
        'Payment gateway integration',
        'Mobile-responsive design'
      ],
      demoUrl: 'https://demo-ecommerce.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/enterprise-ecommerce',
      status: 'Live',
      year: '2024'
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      description: 'High-performance dashboard processing millions of events with WebSocket real-time updates and machine learning insights.',
      icon: 'fas fa-chart-line',
      image: '/images/projects/analytics.jpg',
      technologies: ['Laravel 10', 'Livewire 3', 'WebSockets', 'ClickHouse', 'Queue'],
      features: [
        'Real-time data visualization',
        'WebSocket live updates',
        'Machine learning insights',
        'Custom dashboard builder',
        'Data export capabilities',
        'Performance monitoring'
      ],
      demoUrl: 'https://demo-analytics.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/analytics-dashboard',
      status: 'Live',
      year: '2024'
    },
    {
      id: 3,
      title: 'AI-Powered CRM System',
      description: 'Intelligent CRM with natural language processing, automated lead scoring, and predictive analytics for sales teams.',
      icon: 'fas fa-robot',
      image: '/images/projects/crm.jpg',
      technologies: ['Laravel 10', 'OpenAI API', 'Python ML', 'PostgreSQL', 'Kubernetes'],
      features: [
        'AI-powered lead scoring',
        'Natural language processing',
        'Predictive sales analytics',
        'Automated follow-up system',
        'Customer behavior analysis',
        'Integration with major platforms'
      ],
      demoUrl: 'https://demo-crm.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/ai-crm-system',
      status: 'Live',
      year: '2023'
    },
    {
      id: 4,
      title: 'Microservices API Gateway',
      description: 'Scalable API gateway handling authentication, rate limiting, and service discovery for distributed architecture.',
      icon: 'fas fa-cloud',
      image: '/images/projects/gateway.jpg',
      technologies: ['Laravel 10', 'Microservices', 'JWT', 'Service Mesh', 'Monitoring'],
      features: [
        'Service discovery',
        'Load balancing',
        'Rate limiting',
        'Authentication & authorization',
        'API monitoring',
        'Auto-scaling capabilities'
      ],
      demoUrl: 'https://demo-gateway.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/api-gateway',
      status: 'Live',
      year: '2023'
    },
    {
      id: 5,
      title: 'Healthcare Management Platform',
      description: 'HIPAA-compliant healthcare platform with telemedicine, patient records, and integrated billing system.',
      icon: 'fas fa-heartbeat',
      image: '/images/projects/healthcare.jpg',
      technologies: ['Laravel 10', 'HIPAA Compliance', 'WebRTC', 'Encryption', 'FHIR API'],
      features: [
        'HIPAA compliance',
        'Telemedicine integration',
        'Electronic health records',
        'Appointment scheduling',
        'Billing & insurance',
        'Patient portal'
      ],
      demoUrl: 'https://demo-healthcare.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/healthcare-platform',
      status: 'Live',
      year: '2023'
    },
    {
      id: 6,
      title: 'AI Learning Management System',
      description: 'Adaptive learning platform with AI-driven personalization, video streaming, and comprehensive progress analytics.',
      icon: 'fas fa-graduation-cap',
      image: '/images/projects/lms.jpg',
      technologies: ['Laravel 10', 'Machine Learning', 'Video Processing', 'Analytics', 'CDN'],
      features: [
        'AI-driven personalization',
        'Video streaming platform',
        'Progress analytics',
        'Interactive assessments',
        'Certificate generation',
        'Mobile learning app'
      ],
      demoUrl: 'https://demo-lms.rizkidev.com',
      githubUrl: 'https://github.com/rizkiahmad/ai-learning-system',
      status: 'Live',
      year: '2022'
    }
  ],

  experience: [
    {
      id: 1,
      company: 'Tech Startup',
      position: 'Chief Technology Officer',
      period: '2022 - Present',
      location: 'Jakarta, Indonesia',
      description: 'Leading technology strategy and development teams in a fast-growing fintech startup.',
      achievements: [
        'Scaled system to handle 1M+ daily users',
        'Reduced infrastructure costs by 40%',
        'Built high-performing development team of 15+ engineers',
        'Implemented microservices architecture',
        'Led digital transformation initiatives'
      ],
      technologies: ['Laravel', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis', 'Vue.js']
    },
    {
      id: 2,
      company: 'Digital Agency',
      position: 'Senior Laravel Developer',
      period: '2020 - 2022',
      location: 'Jakarta, Indonesia',
      description: 'Developing enterprise-level web applications for various clients across different industries.',
      achievements: [
        'Delivered 20+ successful projects',
        'Mentored 10+ junior developers',
        'Improved code quality and testing practices',
        'Implemented CI/CD pipelines',
        'Led technical architecture decisions'
      ],
      technologies: ['Laravel', 'MySQL', 'Vue.js', 'Docker', 'Jenkins', 'AWS']
    },
    {
      id: 3,
      company: 'Software Company',
      position: 'Full Stack Developer',
      period: '2018 - 2020',
      location: 'Jakarta, Indonesia',
      description: 'Building web applications with Laravel and Vue.js for small to medium enterprises.',
      achievements: [
        'Built 15+ production applications',
        'Optimized database performance by 60%',
        'Implemented security best practices',
        'Led code review processes',
        'Collaborated with cross-functional teams'
      ],
      technologies: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'Bootstrap', 'jQuery']
    },
    {
      id: 4,
      company: 'Freelance Developer',
      position: 'Full Stack Developer',
      period: '2016 - 2018',
      location: 'Jakarta, Indonesia',
      description: 'Providing web development services to small businesses and startups.',
      achievements: [
        'Completed 30+ freelance projects',
        'Built custom CMS and e-commerce solutions',
        'Established long-term client relationships',
        'Delivered projects on time and within budget'
      ],
      technologies: ['PHP', 'Laravel', 'WordPress', 'MySQL', 'HTML/CSS', 'JavaScript']
    }
  ],

  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SA-12345',
      validUntil: '2026',
      image: '/images/certs/aws-sa.png'
    },
    {
      id: 2,
      name: 'Laravel Certified Developer',
      issuer: 'Laravel',
      date: '2022',
      credentialId: 'LRV-DEV-67890',
      validUntil: '2025',
      image: '/images/certs/laravel-cert.png'
    },
    {
      id: 3,
      name: 'Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: '2023',
      credentialId: 'CKA-98765',
      validUntil: '2026',
      image: '/images/certs/cka.png'
    }
  ],

  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      company: 'TechCorp',
      avatar: '/images/testimonials/sarah.jpg',
      rating: 5,
      text: 'Rizki delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
      project: 'Enterprise E-Commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CEO',
      company: 'StartupXYZ',
      avatar: '/images/testimonials/michael.jpg',
      rating: 5,
      text: 'Working with Rizki was a game-changer for our startup. He built a scalable architecture that grows with our business.',
      project: 'Microservices API Gateway'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      position: 'Medical Director',
      company: 'HealthPlus',
      avatar: '/images/testimonials/emily.jpg',
      rating: 5,
      text: 'The healthcare platform Rizki developed is secure, compliant, and user-friendly. Highly recommended for complex projects.',
      project: 'Healthcare Management Platform'
    }
  ],

  terminalCommands: [
    {
      command: 'whoami',
      output: [
        'Senior Laravel Architect & Full-Stack Developer',
        '8+ years experience in web development',
        'Specialized in scalable Laravel applications'
      ]
    },
    {
      command: 'ls -la experience/',
      output: [
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2016 freelance-developer/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2018 fullstack-developer/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2020 senior-developer/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2022 chief-technology-officer/'
      ]
    },
    {
      command: 'cat achievements.txt',
      output: [
        '✓ Built 50+ production Laravel applications',
        '✓ Mentored 20+ junior developers',
        '✓ Optimized systems handling 1M+ daily users',
        '✓ Led development teams of 15+ engineers',
        '✓ Contributed to open-source Laravel packages',
        '✓ AWS Certified Solutions Architect',
        '✓ Laravel Certified Developer'
      ]
    },
    {
      command: 'php artisan inspire',
      output: [
        '"The best way to predict the future is to create it." - Peter Drucker'
      ]
    },
    {
      command: 'git log --oneline --graph',
      output: [
        '* a1b2c3d (HEAD -> main) feat: implement AI-powered recommendations',
        '* d4e5f6g feat: add microservices architecture',
        '* g7h8i9j feat: optimize database performance',
        '* j1k2l3m feat: implement caching strategies',
        '* m4n5o6p initial commit: Laravel application setup'
      ]
    }
  ]
};

// Middleware for API responses
const sendResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, message = 'Internal Server Error', statusCode = 500, error = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || null,
    timestamp: new Date().toISOString()
  });
};

// Get portfolio profile
router.get('/profile', (req, res) => {
  try {
    sendResponse(res, portfolioData.profile, 'Profile data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch profile data', 500, error);
  }
});

// Get skills data
router.get('/skills', (req, res) => {
  try {
    const data = {
      skills: portfolioData.skills,
      techStack: portfolioData.techStack
    };
    sendResponse(res, data, 'Skills data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch skills data', 500, error);
  }
});

// Get projects data with filtering and pagination
router.get('/projects', (req, res) => {
  try {
    const { limit, status, year, technology, page = 1 } = req.query;
    let projects = [...portfolioData.projects];

    // Filter by status
    if (status) {
      projects = projects.filter(project => 
        project.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by year
    if (year) {
      projects = projects.filter(project => project.year === year);
    }

    // Filter by technology
    if (technology) {
      projects = projects.filter(project =>
        project.technologies.some(tech =>
          tech.toLowerCase().includes(technology.toLowerCase())
        )
      );
    }

    // Pagination
    const pageSize = limit ? parseInt(limit) : 10;
    const offset = (parseInt(page) - 1) * pageSize;
    const paginatedProjects = projects.slice(offset, offset + pageSize);

    const meta = {
      total: portfolioData.projects.length,
      filtered: projects.length,
      page: parseInt(page),
      pageSize,
      totalPages: Math.ceil(projects.length / pageSize),
      filters: { status, year, technology, limit }
    };

    sendResponse(res, paginatedProjects, 'Projects data retrieved successfully');
    
    // Add meta information to response
    res.json({
      ...res.locals.responseData,
      meta
    });
  } catch (error) {
    sendError(res, 'Failed to fetch projects data', 500, error);
  }
});

// Get single project
router.get('/projects/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = portfolioData.projects.find(p => p.id === projectId);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    sendResponse(res, project, 'Project data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch project data', 500, error);
  }
});

// Get experience data
router.get('/experience', (req, res) => {
  try {
    sendResponse(res, portfolioData.experience, 'Experience data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch experience data', 500, error);
  }
});

// Get single experience
router.get('/experience/:id', (req, res) => {
  try {
    const expId = parseInt(req.params.id);
    const experience = portfolioData.experience.find(exp => exp.id === expId);

    if (!experience) {
      return sendError(res, 'Experience not found', 404);
    }

    sendResponse(res, experience, 'Experience data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch experience data', 500, error);
  }
});

// Get certifications
router.get('/certifications', (req, res) => {
  try {
    sendResponse(res, portfolioData.certifications, 'Certifications data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch certifications data', 500, error);
  }
});

// Get testimonials
router.get('/testimonials', (req, res) => {
  try {
    const { limit } = req.query;
    let testimonials = [...portfolioData.testimonials];

    if (limit && !isNaN(limit)) {
      testimonials = testimonials.slice(0, parseInt(limit));
    }

    sendResponse(res, testimonials, 'Testimonials data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch testimonials data', 500, error);
  }
});

// Get terminal commands
router.get('/terminal', (req, res) => {
  try {
    sendResponse(res, portfolioData.terminalCommands, 'Terminal data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch terminal data', 500, error);
  }
});

// Execute terminal command
router.post('/terminal/execute', (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return sendError(res, 'Command is required', 400);
    }

    const terminalCommand = portfolioData.terminalCommands.find(
      cmd => cmd.command === command
    );

    if (!terminalCommand) {
      return sendResponse(res, {
        command,
        output: [`bash: ${command}: command not found`]
      }, 'Command executed');
    }

    sendResponse(res, terminalCommand, 'Command executed successfully');
  } catch (error) {
    sendError(res, 'Failed to execute command', 500, error);
  }
});

// Get complete portfolio data
router.get('/portfolio', (req, res) => {
  try {
    sendResponse(res, portfolioData, 'Complete portfolio data retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch portfolio data', 500, error);
  }
});

// Get portfolio statistics
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalProjects: portfolioData.projects.length,
      liveProjects: portfolioData.projects.filter(p => p.status === 'Live').length,
      skillCategories: portfolioData.skills.length,
      techStackCount: portfolioData.techStack.length,
      yearsExperience: 8,
      companiesWorked: portfolioData.experience.length,
      certifications: portfolioData.certifications.length,
      testimonials: portfolioData.testimonials.length,
      averageSkillProgress: Math.round(
        portfolioData.skills.reduce((sum, skill) => sum + skill.progress, 0) / 
        portfolioData.skills.length
      ),
      averageTestimonialRating: Math.round(
        portfolioData.testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / 
        portfolioData.testimonials.length * 10
      ) / 10
    };

    sendResponse(res, stats, 'Statistics retrieved successfully');
  } catch (error) {
    sendError(res, 'Failed to fetch statistics', 500, error);
  }
});

// Search portfolio content
router.get('/search', (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q) {
      return sendError(res, 'Search query is required', 400);
    }

    const query = q.toLowerCase();
    const results = {
      projects: [],
      skills: [],
      experience: [],
      technologies: []
    };

    // Search in projects
    if (!type || type === 'projects') {
      results.projects = portfolioData.projects.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        project.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Search in skills
    if (!type || type === 'skills') {
      results.skills = portfolioData.skills.filter(skill =>
        skill.category.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Search in experience
    if (!type || type === 'experience') {
      results.experience = portfolioData.experience.filter(exp =>
        exp.company.toLowerCase().includes(query) ||
        exp.position.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        exp.achievements.some(achievement => achievement.toLowerCase().includes(query))
      );
    }

    // Search in tech stack
    if (!type || type === 'technologies') {
      results.technologies = portfolioData.techStack.filter(tech =>
        tech.name.toLowerCase().includes(query)
      );
    }

    const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

    sendResponse(res, {
      query: q,
      type: type || 'all',
      totalResults,
      results
    }, `Found ${totalResults} results`);
  } catch (error) {
    sendError(res, 'Search failed', 500, error);
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  sendResponse(res, {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }, 'API is healthy');
});

// Handle 404 for undefined routes
router.use('*', (req, res) => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
});

module.exports = router;