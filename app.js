const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('News Explorer API is running');
});

app.listen(PORT);
