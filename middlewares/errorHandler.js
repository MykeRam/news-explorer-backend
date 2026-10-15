const { isCelebrateError } = require('celebrate');
const { errorLogger } = require('../utils/logger');

module.exports = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  let statusCode = 500;
  let message = 'Internal server error';

  if (isCelebrateError(error)) {
    statusCode = 400;
    message = 'Invalid request data';
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'A user with this email already exists';
  } else if (error.name === 'ValidationError' || error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid request data';
  } else if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    statusCode = error.statusCode;
    message = error.message;
  }

  errorLogger.error({
    event: 'request_error',
    method: req.method,
    path: req.path,
    statusCode,
    errorType: error.name || 'Error',
  });

  return res.status(statusCode).json({ message });
};
