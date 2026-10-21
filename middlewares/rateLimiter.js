const { rateLimit } = require('express-rate-limit');
const { TooManyRequestsError } = require('../utils/errors');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res, next) => next(new TooManyRequestsError()),
});
