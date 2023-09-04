const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const { client } = require('./database');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.get('/teste', async (req, res) => {
  try {
    await client.connect();
    const query = {
      text: 'INSERT INTO jogadores (nivel, player, nome) VALUES ($1, $2, $3)',
      values: [1, 'César', 'Rafael'],
    };

    const result = await client.query(query);

    if (result.rowCount === 1) {
      console.log('Dados inseridos com sucesso!');
      res.send('Dados inseridos com sucesso!');
    } else {
      console.log('Erro ao inserir dados.');
      res.status(500).send('Erro ao inserir dados.');
    }
  } catch (error) {
    console.log('Erro ao conectar ao banco de dados: ', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
  } finally {
    await client.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
