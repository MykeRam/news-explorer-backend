const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(message = 'Authorization required') {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
