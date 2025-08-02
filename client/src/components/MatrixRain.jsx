import React, { useEffect } from 'react';

const MatrixRain = () => {
  useEffect(() => {
    const createMatrixRain = () => {
      const container = document.getElementById('matrix-rain');
      if (!container) return;

      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${}[]()<>/*+-=&|;:.,?!@#%^&*';
      const laravel = ['php', 'artisan', 'serve', 'Route::', 'Model::', 'Controller', 'Middleware', 'Auth::', 'DB::', 'Cache::'];
      
      // Clear existing columns
      container.innerHTML = '';
      
      for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let content = '';
        for (let j = 0; j < 20; j++) {
          if (Math.random() < 0.1) {
            content += laravel[Math.floor(Math.random() * laravel.length)] + '<br>';
          } else {
            content += characters[Math.floor(Math.random() * characters.length)] + '<br>';
          }
        }
        column.innerHTML = content;
        container.appendChild(column);
      }
    };

    createMatrixRain();
  }, []);

  return <div id="matrix-rain" className="matrix-rain"></div>;
};

export default MatrixRain;