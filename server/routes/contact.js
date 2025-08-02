const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
    
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
    
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// Send contact form email
router.post('/', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: true,
        message: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      return res.status(500).json({
        error: true,
        message: 'Email service is currently unavailable'
      });
    }

    // Email to yourself (notification)
    const notificationEmailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">New Portfolio Contact</h2>
          </div>
          
          <div style="padding: 20px; background: #f8fafc;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #0f172a; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #0f172a; margin-top: 0;">Message</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">
            <p>This email was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        New Portfolio Contact
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Sent at: ${new Date().toLocaleString()}
      `
    };

    // Auto-reply email to the sender
    const autoReplyEmailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">Thank You!</h2>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <p style="font-size: 16px; color: #0f172a;">Hi ${name},</p>
            
            <p style="color: #334155; line-height: 1.6;">
              Thank you for reaching out through my portfolio website! I've received your message and appreciate you taking the time to contact me.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #f59e0b; margin-top: 0;">Your Message Summary:</h4>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="color: #64748b; font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
            </div>
            
            <p style="color: #334155; line-height: 1.6;">
              I typically respond to messages within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at 
              <a href="mailto:${process.env.EMAIL_FROM}" style="color: #f59e0b;">${process.env.EMAIL_FROM}</a>
            </p>
            
            <p style="color: #334155;">
              Best regards,<br>
              <strong style="color: #f59e0b;">Rizki Ahmad</strong><br>
              Senior Laravel Architect
            </p>
          </div>
          
          <div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
        Hi ${name},
        
        Thank you for reaching out through my portfolio website! I've received your message about "${subject}" and appreciate you taking the time to contact me.
        
        I typically respond to messages within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at ${process.env.EMAIL_FROM}
        
        Best regards,
        Rizki Ahmad
        Senior Laravel Architect
        
        ---
        This is an automated response. Please do not reply to this email.
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationEmailOptions),
      transporter.sendMail(autoReplyEmailOptions)
    ]);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.',
      data: {
        name,
        email,
        subject,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle specific email errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        error: true,
        message: 'Email authentication failed. Please try again later.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        error: true,
        message: 'Unable to connect to email server. Please try again later.'
      });
    }

    res.status(500).json({
      error: true,
      message: 'Failed to send message. Please try again later.',
      ...(process.env.NODE_ENV !== 'production' && { details: error.message })
    });
  }
});

// Test email configuration endpoint (development only)
if (process.env.NODE_ENV !== 'production') {
  router.get('/test-email', async (req, res) => {
    try {
      const transporter = createTransporter();
      await transporter.verify();
      
      res.status(200).json({
        success: true,
        message: 'Email configuration is working correctly',
        config: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          user: process.env.EMAIL_USER,
          from: process.env.EMAIL_FROM
        }
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: 'Email configuration test failed',
        details: error.message
      });
    }
  });
}

module.exports = router;