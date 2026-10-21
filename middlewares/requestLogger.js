const { requestLogger } = require('../utils/logger');

module.exports = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    requestLogger.info({
      event: 'request_complete',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
};
