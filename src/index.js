const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Impor koneksi mysql2 yang sudah kita buat sebelumnya
const pool = require('./db');

const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // BARU
const orderRoutes = require('./routes/order');
const layananRoutes = require('./routes/layanan');
const teknisiRoutes = require('./routes/teknisi');
const pembayaranRoutes = require('./routes/pembayaran');
const disputeRoutes = require('./routes/dispute');
const ratingRoutes = require('./routes/rating');
const laporanRoutes = require('./routes/laporan');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // BARU
app.use('/api/order', orderRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/teknisi', teknisiRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/dispute', disputeRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/admin/laporan', laporanRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API Marketplace Jasa Servis Panggilan Sempurna!", status: "Active" });
});

// Endpoint tes DB diubah dari Prisma menjadi SQL murni (mysql2)
app.get('/api/tes-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS total FROM User');
        const totalUsers = rows[0].total;
        
        res.json({ 
            success: true, 
            message: "Koneksi SQL Murni (mysql2) ke Google Cloud SQL Berhasil!", 
            total_user_di_database: totalUsers 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 SERVER UTUH AKTIF DI: http://0.0.0.0:${PORT}`);
    console.log(`=======================================================`);
});