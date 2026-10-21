const express = require('express');
const auth = require('../middlewares/auth');
const {
  articleBodyValidation,
  articleIdValidation,
  validateAuthorizationHeader,
} = require('../utils/validation');
const {
  createArticle,
  deleteArticle,
  getArticles,
} = require('../controllers/articles');

const router = express.Router();

router.use(validateAuthorizationHeader, auth);

router.get('/', getArticles);
router.post('/', articleBodyValidation, createArticle);
router.delete('/:articleId', articleIdValidation, deleteArticle);

module.exports = router;
