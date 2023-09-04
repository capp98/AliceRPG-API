const { Client } = require('pg');

const client = new Client({
  user: 'tbhtdswn',
  host: 'berry.db.elephantsql.com',
  database: 'tbhtdswn',
  password: '1S-KjkdW9oqCKZ_E4qW-LG7a3Vv1hIfj',
  port: 5432,
});

module.exports = { client };
