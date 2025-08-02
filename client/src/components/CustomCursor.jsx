import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animate follower
    const animateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
      requestAnimationFrame(animateFollower);
    };
    
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <>
      <div 
        className="cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10
        }}
      />
      <div 
        className="cursor-follower"
        style={{
          left: followerPosition.x - 4,
          top: followerPosition.y - 4
        }}
      />
    </>
  );
};

export default CustomCursor;