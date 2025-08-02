import React, { useEffect, useState } from 'react';

const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalData = [
    {
      type: 'command',
      prompt: 'rizki@laravel-architect:~$',
      command: 'whoami',
      outputs: [
        'Senior Laravel Architect & Full-Stack Developer',
        '8+ years experience in web development',
        'Specialized in scalable Laravel applications'
      ]
    },
    {
      type: 'command',
      prompt: 'rizki@laravel-architect:~$',
      command: 'ls -la experience/',
      outputs: [
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2016 startup-cto/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2018 senior-developer/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2020 tech-lead/',
        'drwxr-xr-x 2 rizki staff  68 Jan  1 2022 solution-architect/'
      ]
    },
    {
      type: 'command',
      prompt: 'rizki@laravel-architect:~$',
      command: 'cat achievements.txt',
      outputs: [
        '✓ Built 50+ production Laravel applications',
        '✓ Mentored 20+ junior developers',
        '✓ Optimized systems handling 1M+ daily users',
        '✓ Led development teams of 10+ engineers',
        '✓ Contributed to open-source Laravel packages'
      ]
    },
    {
      type: 'command',
      prompt: 'rizki@laravel-architect:~',
      command: 'php artisan inspire',
      outputs: [
        '"The best way to predict the future is to create it." - Peter Drucker'
      ]
    }
  ];

  useEffect(() => {
    const terminalSection = document.getElementById('terminal');
    
    const handleScroll = () => {
      if (terminalSection) {
        const rect = terminalSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Start typing animation
          let totalLines = 0;
          terminalData.forEach(item => {
            totalLines += 1 + item.outputs.length; // command line + outputs
          });
          
          const animateLines = () => {
            if (visibleLines < totalLines) {
              setVisibleLines(prev => prev + 1);
              setTimeout(animateLines, 500);
            }
          };
          
          if (visibleLines === 0) {
            setTimeout(animateLines, 1000);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleLines, terminalData]);

  const renderTerminalLines = () => {
    const lines = [];
    let lineIndex = 0;

    terminalData.forEach((item, itemIndex) => {
      // Command line
      if (lineIndex < visibleLines) {
        lines.push(
          <div className="terminal-line" key={`cmd-${itemIndex}`}>
            <span className="terminal-prompt">{item.prompt}</span>{' '}
            <span className="terminal-command">{item.command}</span>
          </div>
        );
      }
      lineIndex++;

      // Output lines
      item.outputs.forEach((output, outputIndex) => {
        if (lineIndex < visibleLines) {
          lines.push(
            <div className="terminal-line terminal-output" key={`out-${itemIndex}-${outputIndex}`}>
              {output}
            </div>
          );
        }
        lineIndex++;
      });
    });

    // Add cursor if all lines are visible
    if (visibleLines >= lineIndex) {
      lines.push(
        <div className="terminal-line" key="cursor">
          <span className="terminal-prompt">rizki@laravel-architect:~$</span>{' '}
          <span className="terminal-cursor">_</span>
        </div>
      );
    }

    return lines;
  };

  return (
    <section className="terminal-section scroll-reveal" id="terminal">
      <div className="skills-container">
        <h2 className="section-title">Development Experience</h2>
        
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="terminal-title">rizki@laravel-architect:~</span>
          </div>
          <div className="terminal-body">
            {renderTerminalLines()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;