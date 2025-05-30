const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts'
});

client.connect();

/*
const query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
}

query('SELECT * FROM contacts').then(console.log)
*/

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
