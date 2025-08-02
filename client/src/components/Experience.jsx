import React from 'react';

const experienceData = [
    { side: 'left', title: 'Frontend Developer', company: 'Tech Corp', date: '2022 - Sekarang', desc: 'Mengembangkan antarmuka pengguna yang interaktif menggunakan React dan Redux.' },
    { side: 'right', title: 'Junior Web Developer', company: 'Web Solutions', date: '2020 - 2022', desc: 'Membantu dalam pengembangan dan pemeliharaan situs web klien menggunakan HTML, CSS, dan JavaScript.' },
];

const Experience = () => (
    <section id="experience">
        <div className="container">
            <h2 className="section-title">Pengalaman</h2>
            <div className="timeline">
                {experienceData.map((item, index) => (
                    <div className={`timeline-item ${item.side}`} key={index}>
                        <div className="timeline-content">
                            <h3>{item.title}</h3>
                            <h4>{item.company}</h4>
                            <span className="date">{item.date}</span>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Experience;