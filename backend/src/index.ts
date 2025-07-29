// backend/src/index.ts
import 'dotenv/config'; // Importa e carrega as variáveis de ambiente
import express, { Request, Response } from 'express'; // Importa express e os tipos Request/Response
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000; // Usa a variável de ambiente PORT do .env

// Middlewares
app.use(express.json()); // Habilita o Express a lidar com JSON no corpo das requisições

// Conexão com o Prisma
async function connectPrisma() {
    try {
        await prisma.$connect();
        console.log('🟢 Prisma conectado ao MySQL com sucesso!');
    } catch (error: any) { // Usamos 'any' aqui para simplificar a tipagem do erro por enquanto
        console.error('🔴 Erro ao conectar o Prisma ao MySQL:', error.message);
        // Opcional: Você pode querer encerrar o processo se a conexão com o DB falhar
        // process.exit(1);
    }
}

// Rota para listar usuários
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error: any) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao buscar usuários.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Variável de Ambiente DATABASE_URL: ${process.env.DATABASE_URL}`);
    console.log(`Servidor rodando na porta ${port}`);
    connectPrisma(); // Tenta conectar o Prisma ao iniciar o servidor
});