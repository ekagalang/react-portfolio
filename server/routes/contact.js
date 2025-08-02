const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    // Validasi sederhana
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Harap isi semua field.' });
    }

    // Di aplikasi nyata, di sini Anda akan mengirim email (misalnya menggunakan Nodemailer)
    // atau menyimpan pesan ke database.
    console.log('--- Pesan Baru Diterima ---');
    console.log(`Nama: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Pesan: ${message}`);
    console.log('---------------------------');

    res.status(200).json({ msg: 'Pesan berhasil diterima! Terima kasih telah menghubungi.' });
});

module.exports = router;
