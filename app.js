const express = require('express');
const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.listen(PORT);
