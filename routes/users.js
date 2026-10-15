const express = require('express');
const auth = require('../middlewares/auth');
const { getUserInfo } = require('../controllers/users');
const { validateAuthorizationHeader } = require('../utils/validation');

const router = express.Router();

router.get('/me', validateAuthorizationHeader, auth, getUserInfo);

module.exports = router;
