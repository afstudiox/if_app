// backend/src/index.js
require('dotenv').config();

// Importe o PrismaClient que será gerado com o schema.prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Variável de Ambiente DATABASE_URL:', process.env.DATABASE_URL); // Agora vai logar a URL completa

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Teste de conexão do Prisma ao iniciar o servidor
prisma.$connect()
  .then(() => console.log('🟢 Prisma conectado ao MySQL com sucesso!'))
  .catch((err) => {
    console.error('🔴 Erro ao conectar o Prisma ao MySQL:', err.message);
    process.exit(1);
  });

// Exemplo de rota usando o Prisma
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});