const JWT_SECRET = process.env.JWT_SECRET
  || (process.env.NODE_ENV === 'production' ? null : 'development-secret');

module.exports = { JWT_SECRET };
