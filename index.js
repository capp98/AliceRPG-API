const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getJogadores);
app.get('/chars', db.getPersonagens);
app.get('/reliquias', db.getReliquias);
app.get('/chars/:nome', (req, res) => {
  db.getOnePersonagem(req, res, req.params.nome);
});
app.get('/reliquias/:personagem_id', (req, res) => {
  db.getReliquiasPersonagem(req, res, req.params.personagem_id);
});
app.get('/diario/:personagem_id', (req, res) => {
  db.getDiarios(req, res, req.params.personagem_id);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
