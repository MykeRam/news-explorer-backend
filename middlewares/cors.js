const cors = require('cors');
const { CORS_ALLOWED_ORIGINS } = require('../utils/config');

module.exports = cors({
  origin: CORS_ALLOWED_ORIGINS,
  methods: ['GET', 'HEAD', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Retry-After', 'RateLimit', 'RateLimit-Policy'],
  optionsSuccessStatus: 204,
});
