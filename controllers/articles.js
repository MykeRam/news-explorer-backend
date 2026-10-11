const mongoose = require('mongoose');
const Article = require('../models/article');

const getArticles = (req, res, next) => Article.find({ owner: req.user._id })
  .then((articles) => res.status(200).json(articles))
  .catch(next);

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      const articleData = article.toObject();
      Reflect.deleteProperty(articleData, 'owner');
      return res.status(201).json(articleData);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  if (!mongoose.isValidObjectId(articleId)) {
    return res.status(400).json({ message: 'Article ID is invalid' });
  }

  return Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      if (article.owner.toString() !== String(req.user._id)) {
        return res.status(403).json({ message: 'You cannot delete another user\'s article' });
      }

      return Article.findOneAndDelete({ _id: articleId, owner: req.user._id })
        .then((deletedArticle) => {
          if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
          }

          return res.status(200).json({ message: 'Article deleted' });
        });
    })
    .catch(next);
};

module.exports = { createArticle, deleteArticle, getArticles };
