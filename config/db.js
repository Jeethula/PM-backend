require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://presidioDB_owner:syRB0kz6SWin@ep-tiny-lab-a1hpddwc-pooler.ap-southeast-1.aws.neon.tech/presidioDB?sslmode=require",
    ssl: {
      rejectUnauthorized: false
    }
  });

  module.exports = client;