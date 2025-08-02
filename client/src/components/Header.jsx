import React, { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <div className="logo">Eka<span>G</span></div>
            <nav>
                <div className="menu-toggle" onClick={() => setMenuActive(!menuActive)}>
                    <i className={menuActive ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={menuActive ? 'active' : ''}>
                    <li><a href="#hero" className="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;