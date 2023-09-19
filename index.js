const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getUsers);
app.get('/chars', db.getCharacters);
app.get('/chars/:nome', (req, res) => {
  db.getOneCharacter(req, res, req.params.nome);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
