const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const ConnectPostgreSql = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL.");
  } catch (error) {
    console.log("Error connecting to PostgreSQL.");
    console.log(error);
  }
};

module.exports = {ConnectPostgreSql, pool};
