const express = require('express');
const { createUser, login } = require('../controllers/auth');
const { signinValidation, signupValidation } = require('../utils/validation');

const router = express.Router();

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

module.exports = router;
