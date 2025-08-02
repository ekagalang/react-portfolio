import React, { useState, useEffect } from 'react';
import { getPortfolio } from '../services/api'; // Kita akan buat ini nanti

const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await getPortfolio();
                setProjects(data);
            } catch (error) {
                console.error("Gagal mengambil data portofolio:", error);
                // Set data statis jika API gagal
                setProjects([
                    { _id: '1', title: 'Project Alpha', description: 'Deskripsi singkat tentang Project Alpha.', tags: ['React', 'Node.js'], imageUrl: 'https://placehold.co/600x400/334155/f59e0b?text=Project+Alpha' },
                    { _id: '2', title: 'Project Beta', description: 'Deskripsi singkat tentang Project Beta.', tags: ['Vue', 'Express'], imageUrl: 'https://placehold.co/600x400/334155/f59e0b?text=Project+Beta' }
                ]);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="portfolio">
            <div className="container">
                <h2 className="section-title">Portofolio</h2>
                <div className="portfolio-grid">
                    {projects.map(project => (
                        <div className="portfolio-item" key={project._id}>
                            <div className="portfolio-image" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
                            <div className="portfolio-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="portfolio-tags">
                                    {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;