const express = require('express');
const auth = require('../middlewares/auth');
const {
  createArticle,
  deleteArticle,
  getArticles,
} = require('../controllers/articles');

const router = express.Router();

router.use(auth);

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
