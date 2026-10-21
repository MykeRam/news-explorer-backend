const User = require('../models/user');
const { NotFoundError } = require('../utils/errors');

const getUserInfo = (req, res, next) => User.findById(req.user._id)
  .select('email name -_id')
  .lean()
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.status(200).json(user);
  })
  .catch(next);

module.exports = { getUserInfo };
