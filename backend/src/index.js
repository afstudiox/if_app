// backend/src/index.js
require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas primeiro

console.log('Variável de Ambiente DB_HOST:', process.env.DB_HOST); // Mantenha para verificação

const express = require('express');
const db = require('./db'); // Importa o pool de conexões do seu db.js

const app = express();
const port = process.env.PORT || 3000; // Define a porta, pode adicionar no .env se quiser

// Middleware para JSON (se for uma API REST)
app.use(express.json());

// Exemplo de rota usando o pool de conexões
// Esta rota vai usar o pool que você configurou em db.js
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Conexão com o banco de dados bem-sucedida!', solution: rows[0].solution });
  } catch (err) {
    console.error('Erro na rota /test-db:', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});