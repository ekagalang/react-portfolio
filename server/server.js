const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Ini pengganti body-parser untuk JSON

// API Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Serve frontend di production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
