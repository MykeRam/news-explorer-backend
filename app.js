require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { MONGODB_URI } = require('./utils/config');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use(errorHandler);

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    process.stderr.write(`Failed to connect to MongoDB: ${error.message}\n`);
    process.exit(1);
  });
