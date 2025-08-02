import React, { useState } from 'react';

const Navigation = ({ scrolled }) => {
  const [menuActive, setMenuActive] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#terminal', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <div className="logo">&lt;RizkiDev/&gt;</div>
        <ul className="nav-links">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div 
          className="menu-toggle"
          onClick={() => setMenuActive(!menuActive)}
        >
          <i className={menuActive ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;