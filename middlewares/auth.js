const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  if (!JWT_SECRET) {
    return next(new Error('Authentication is not configured'));
  }

  try {
    const token = authorization.slice('Bearer '.length);
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload._id) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }

    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
};
