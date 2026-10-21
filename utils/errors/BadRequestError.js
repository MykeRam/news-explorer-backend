const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
  constructor(message = 'Invalid request data') {
    super(400, message);
  }
}

module.exports = BadRequestError;
