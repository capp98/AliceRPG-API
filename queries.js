const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM jogadores ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCharacters = (request, response) => {
  pool.query('SELECT * FROM personagem', (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      response.status(404).send('<h1>Não encontrado</h1>');
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getOneCharacter = (request, response, nome) => {
  pool.query(
    'SELECT * FROM personagem where nome = $1',
    [nome],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        response.status(404).send('<h1>Não encontrado</h1>');
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = { getUsers, getCharacters, getOneCharacter };
