require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: "connection string",
    ssl: {
      rejectUnauthorized: false
    }
  });

  module.exports = client;
