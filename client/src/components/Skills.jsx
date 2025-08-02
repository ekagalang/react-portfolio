import React from 'react';

const skillsData = [
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fab fa-node-js', name: 'Node.js' },
    { icon: 'fab fa-js-square', name: 'JavaScript' },
    { icon: 'fab fa-html5', name: 'HTML5' },
    { icon: 'fab fa-css3-alt', name: 'CSS3' },
    { icon: 'fas fa-database', name: 'MongoDB' },
    { icon: 'fas fa-server', name: 'Express' },
    { icon: 'fab fa-git-alt', name: 'Git' },
];

const Skills = () => (
    <section id="skills">
        <div className="container">
            <h2 className="section-title">Keahlian</h2>
            <div className="skills-grid">
                {skillsData.map(skill => (
                    <div className="skill-item" key={skill.name}>
                        <i className={skill.icon}></i>
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;