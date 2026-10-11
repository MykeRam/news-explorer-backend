const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'Authentication is not configured' });
  }

  try {
    const token = authorization.slice('Bearer '.length);
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload._id) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
