require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  const { statusCode = 500 } = error;
  const message = statusCode === 500 ? 'Internal server error' : error.message;

  return res.status(statusCode).json({ message });
});

app.listen(PORT);
