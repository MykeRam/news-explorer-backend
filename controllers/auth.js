const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const { UnauthorizedError } = require('../utils/errors');

const createUser = (req, res, next) => User.create(req.body)
  .then((user) => {
    const userData = user.toObject({ versionKey: false });
    Reflect.deleteProperty(userData, 'password');
    return res.status(201).json(userData);
  })
  .catch(next);

const login = (req, res, next) => User.findOne({ email: req.body.email.toLowerCase() })
  .select('+password')
  .then((user) => {
    if (!user) {
      return next(new UnauthorizedError('Incorrect email or password'));
    }

    return bcrypt.compare(req.body.password, user.password)
      .then((passwordMatches) => {
        if (!passwordMatches) {
          return next(new UnauthorizedError('Incorrect email or password'));
        }

        if (!JWT_SECRET) {
          return next(new Error('Authentication is not configured'));
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ token });
      });
  })
  .catch(next);

module.exports = { createUser, login };
