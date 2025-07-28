// backend/src/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  // Use process.env para carregar do .env
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('🟢 Pool de conexões MySQL conectado com sucesso!');
    connection.release();
  })
  .catch(err => {
    console.error('🔴 Erro ao conectar ao pool de conexões MySQL:', err.message);
    process.exit(1);
  });

module.exports = pool;