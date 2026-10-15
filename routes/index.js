const express = require('express');
const authRoutes = require('./auth');
const articleRoutes = require('./articles');
const userRoutes = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'News Explorer API is running' });
});

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
