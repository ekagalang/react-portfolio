import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const loadingTexts = [
    'Initializing Laravel...',
    'Loading Artisan commands...',
    'Connecting to database...',
    'Optimizing performance...',
    'Ready to code!'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-text">
        <span>{loadingTexts[currentText]}</span>
        <span className="cursor">_</span>
      </div>
    </div>
  );
};

export default LoadingScreen;