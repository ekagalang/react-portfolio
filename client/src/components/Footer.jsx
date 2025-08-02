import React from 'react';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="social-links">
                <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
            <p className="copyright">&copy; {new Date().getFullYear()} Eka Galang. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;