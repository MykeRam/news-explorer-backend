const express = require('express');
const auth = require('../middlewares/auth');
const { getUserInfo } = require('../controllers/users');

const router = express.Router();

router.get('/me', auth, getUserInfo);

module.exports = router;
