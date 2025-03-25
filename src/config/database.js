import pg from "pg";
const { Client } = pg;

const client = new Client({
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
});

export default client;
