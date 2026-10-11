const JWT_SECRET = process.env.JWT_SECRET
  || (process.env.NODE_ENV === 'production' ? null : 'development-secret');
const MONGODB_URI = process.env.MONGODB_URI
  || 'mongodb://127.0.0.1:27017/news-explorer';

module.exports = { JWT_SECRET, MONGODB_URI };
