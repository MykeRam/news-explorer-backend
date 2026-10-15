const { isCelebrateError } = require('celebrate');

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

  return res.status(statusCode).json({ message });
};
