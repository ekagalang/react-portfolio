import React from 'react';

const About = () => (
    <section id="about">
        <div className="container">
            <h2 className="section-title">Tentang Saya</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Halo! Saya Eka Galang, seorang web developer dengan hasrat untuk membangun aplikasi web yang fungsional dan menarik. Dengan pengalaman di frontend dan backend, saya menikmati proses mengubah ide kompleks menjadi solusi nyata yang dapat digunakan.
                    </p>
                    <p>
                        Saya selalu antusias untuk mempelajari teknologi baru dan menerapkannya dalam proyek-proyek saya untuk memberikan hasil terbaik.
                    </p>
                </div>
                <div className="about-image">
                    {/* Ganti dengan URL gambar Anda */}
                    <img src="https://placehold.co/250x250/1e293b/f59e0b?text=EG" alt="Eka Galang" />
                </div>
            </div>
        </div>
    </section>
);

export default About;