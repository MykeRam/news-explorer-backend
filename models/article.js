const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Article link must be a valid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Article image must be a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
