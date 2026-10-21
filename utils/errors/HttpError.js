class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
