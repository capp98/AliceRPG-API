const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const getJogadores = (request, response) => {
  pool.query('SELECT * FROM jogadores ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReliquias = (request, response) => {
  pool.query('SELECT * FROM reliquias ORDER BY nome', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPersonagens = (request, response) => {
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

const getOnePersonagem = (request, response, nome) => {
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

const getDiarios = (request, response, personagem_id) => {
  pool.query(
    'select * from diarios where personagem_id = $1',
    [personagem_id],
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

module.exports = {
  getJogadores,
  getPersonagens,
  getOnePersonagem,
  getReliquias,
  getDiarios,
};
