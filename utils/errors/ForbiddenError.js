const HttpError = require('./HttpError');

class ForbiddenError extends HttpError {
  constructor(message = 'Access denied') {
    super(403, message);
  }
}

module.exports = ForbiddenError;
