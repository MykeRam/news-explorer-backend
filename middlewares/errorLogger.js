const { errorLogger } = require('../utils/logger');

module.exports = (error, req, res, next) => {
  res.once('finish', () => {
    errorLogger.error({
      event: 'request_error',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      errorType: error.name || 'Error',
    });
  });

  next(error);
};
