const JWT_SECRET = process.env.JWT_SECRET
  || (process.env.NODE_ENV === 'production' ? null : 'development-secret');
const MONGODB_URI = process.env.MONGODB_URI
  || 'mongodb://127.0.0.1:27017/news-explorer';
const DEFAULT_CORS_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS === undefined
  ? DEFAULT_CORS_ORIGINS
  : process.env.CORS_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);

module.exports = { JWT_SECRET, MONGODB_URI, CORS_ALLOWED_ORIGINS };
