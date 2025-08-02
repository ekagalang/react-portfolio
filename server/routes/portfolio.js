const express = require('express');
const router = express.Router();

// Data portofolio dummy. Nantinya ini bisa diambil dari database.
const portfolioData = [
    {
        _id: '1',
        title: 'Aplikasi E-commerce',
        description: 'Platform e-commerce lengkap dengan manajemen produk, keranjang belanja, dan proses checkout. Dibangun dengan MERN stack.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB'],
        imageUrl: 'https://placehold.co/600x400/1e293b/f59e0b?text=E-commerce'
    },
    {
        _id: '2',
        title: 'Sistem Manajemen Blog',
        description: 'Sebuah CMS untuk membuat dan mengelola postingan blog dengan antarmuka admin yang kaya fitur.',
        tags: ['React', 'TailwindCSS', 'Express'],
        imageUrl: 'https://placehold.co/600x400/1e293b/f59e0b?text=Blog+CMS'
    },
    {
        _id: '3',
        title: 'Aplikasi Chat Real-time',
        description: 'Aplikasi pesan instan yang menggunakan WebSockets untuk komunikasi real-time antar pengguna.',
        tags: ['Node.js', 'Socket.io', 'React'],
        imageUrl: 'https://placehold.co/600x400/1e293b/f59e0b?text=Chat+App'
    }
];

// GET /api/portfolio
router.get('/', (req, res) => {
    res.json(portfolioData);
});

module.exports = router;
