require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const routes = require('./routes');
const { MONGODB_URI } = require('./utils/config');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  let statusCode = error.statusCode || error.status || 500;
  let message = statusCode === 500 ? 'Internal server error' : error.message;

  if (isCelebrateError(error)) {
    statusCode = 400;
    message = 'Invalid request data';
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'A user with this email already exists';
  } else if (error.name === 'ValidationError' || error.name === 'CastError') {
    statusCode = 400;
    message = error.message;
  }

  return res.status(statusCode).json({ message });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    process.stderr.write(`Failed to connect to MongoDB: ${error.message}\n`);
    process.exit(1);
  });
