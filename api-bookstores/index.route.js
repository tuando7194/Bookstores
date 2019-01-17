const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const bookRoutes = require('./server/books/book.route');
const uploadRoutes = require('./server/uploads/upload.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount book routes at /books
router.use('/books', bookRoutes);

// mount upload routes at /uploads
router.use('/uploads', uploadRoutes);

module.exports = router;
