const express = require('express');
const bodyparser = require('body-parser');
const mountRoutes = require('./routes');

const app = express();
app.use(express.static('dist'));
app.use(bodyparser.json());
app.use(express.json());
mountRoutes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Listening on port ', port, '!');
});
