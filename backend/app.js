const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books/:bookId/reviews', reviewRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
