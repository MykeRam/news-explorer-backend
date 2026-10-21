const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message = 'Resource already exists') {
    super(409, message);
  }
}

module.exports = ConflictError;
