module.exports = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const { statusCode = 500, message } = error;

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'An error has occurred on the server.' : message,
  });
};
