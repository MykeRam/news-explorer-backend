const { celebrate, Joi } = require('celebrate');

const signupValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const articleBodyValidation = celebrate({
  body: Joi.object({
    keyword: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    text: Joi.string().trim().required(),
    date: Joi.string().required(),
    source: Joi.string().trim().required(),
    link: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object({
    articleId: Joi.string().hex().length(24).required(),
  }),
});

const validateAuthorizationHeader = (req, res, next) => {
  const authorizationSchema = Joi.object({
    authorization: Joi.string().pattern(/^Bearer\s+\S+$/).required(),
  }).unknown(true);
  const { error } = authorizationSchema.validate(req.headers);

  if (error) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  return next();
};

module.exports = {
  articleBodyValidation,
  articleIdValidation,
  signinValidation,
  signupValidation,
  validateAuthorizationHeader,
};
