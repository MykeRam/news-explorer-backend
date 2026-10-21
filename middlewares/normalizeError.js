const { BadRequestError, ConflictError } = require('../utils/errors');

module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    return next(new ConflictError('A user with this email already exists'));
  }

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return next(new BadRequestError());
  }

  if (error.type === 'entity.parse.failed') {
    return next(new BadRequestError('Invalid JSON body'));
  }

  return next(error);
};
