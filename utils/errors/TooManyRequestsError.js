const HttpError = require('./HttpError');

class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests, please try again later') {
    super(429, message);
  }
}

module.exports = TooManyRequestsError;
