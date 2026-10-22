require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const errorLogger = require('./middlewares/errorLogger');
const normalizeError = require('./middlewares/normalizeError');
const rateLimiter = require('./middlewares/rateLimiter');
const requestLogger = require('./middlewares/requestLogger');
const { MONGODB_URI } = require('./utils/config');
const { NotFoundError } = require('./utils/errors');

const app = express();
const { PORT = 3000 } = process.env;

app.set('trust proxy', 'loopback');
app.use(requestLogger);
app.use(helmet());
app.use(cors);
app.use(rateLimiter);
app.use(express.json());
app.use('/', routes);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(normalizeError);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    process.stderr.write(`Failed to connect to MongoDB: ${error.message}\n`);
    process.exit(1);
  });
