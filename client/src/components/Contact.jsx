import React, { useState } from 'react';
import { sendContactMessage } from '../services/api'; // Kita akan buat ini nanti

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ sending: false, sent: false, error: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ sending: true, sent: false, error: false });
        try {
            await sendContactMessage(formData);
            setStatus({ sending: false, sent: true, error: false });
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus({ sending: false, sent: false, error: false }), 3000);
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            setStatus({ sending: false, sent: false, error: true });
            setTimeout(() => setStatus({ sending: false, sent: false, error: false }), 3000);
        }
    };

    const getButtonText = () => {
        if (status.sending) return 'Mengirim...';
        if (status.sent) return <><i className="fas fa-check"></i> Terkirim!</>;
        if (status.error) return <><i className="fas fa-times"></i> Gagal!</>;
        return 'Kirim Pesan';
    };

    return (
        <section id="contact">
            <div className="container">
                <h2 className="section-title">Hubungi Saya</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Nama Anda" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Anda" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" rows="5" placeholder="Pesan Anda" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn submit-btn" disabled={status.sending || status.sent}>
                        {getButtonText()}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;