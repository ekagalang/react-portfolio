import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    sending: false,
    sent: false,
    error: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, sent: false, error: false });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus({ sending: false, sent: true, error: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus({ sending: false, sent: false, error: false });
      }, 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus({ sending: false, sent: false, error: true });
      
      setTimeout(() => {
        setStatus({ sending: false, sent: false, error: false });
      }, 3000);
    }
  };

  const getButtonContent = () => {
    if (status.sending) {
      return (
        <>
          <i className="fas fa-spinner fa-spin"></i>
          Sending...
        </>
      );
    }
    if (status.sent) {
      return (
        <>
          <i className="fas fa-check"></i>
          Message Sent!
        </>
      );
    }
    if (status.error) {
      return (
        <>
          <i className="fas fa-times"></i>
          Failed to Send
        </>
      );
    }
    return (
      <>
        <i className="fas fa-paper-plane"></i>
        Send Message
      </>
    );
  };

  const socialLinks = [
    { href: 'https://github.com', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://linkedin.com', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { href: 'https://twitter.com', icon: 'fab fa-twitter', label: 'Twitter' },
    { href: 'https://instagram.com', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: 'https://wa.me/6281234567890', icon: 'fab fa-whatsapp', label: 'WhatsApp' }
  ];

  return (
    <section className="contact scroll-reveal" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Let's Build Something Amazing</h2>
          <p>Ready to transform your ideas into powerful, scalable web applications? I'm here to help you architect solutions that drive business growth.</p>
          
          <div className="contact-details">
            <div style={{ margin: '2rem 0' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <i className="fas fa-envelope"></i> Email
              </h4>
              <p>hello@rizkidev.com</p>
            </div>
            
            <div style={{ margin: '2rem 0' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <i className="fas fa-phone"></i> Phone
              </h4>
              <p>+62 812 3456 7890</p>
            </div>
            
            <div style={{ margin: '2rem 0' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <i className="fas fa-map-marker-alt"></i> Location
              </h4>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
          
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="social-link"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="contact-form">
          <h3 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Send Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`btn-primary ${status.sent ? 'success' : status.error ? 'error' : ''}`}
              style={{ 
                width: '100%', 
                justifyContent: 'center',
                backgroundColor: status.sent ? '#10b981' : status.error ? '#ef4444' : undefined
              }}
              disabled={status.sending || status.sent}
            >
              {getButtonContent()}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;