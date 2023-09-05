const { Pool } = require('pg');

const pool = new Pool({
  user: 'tbhtdswn',
  host: 'berry.db.elephantsql.com',
  database: 'tbhtdswn',
  password: '1S-KjkdW9oqCKZ_E4qW-LG7a3Vv1hIfj',
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

module.exports = { getUsers };
