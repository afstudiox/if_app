// backend/src/index.ts
// Ponto de entrada principal da aplicação.
// Responsável por carregar variáveis de ambiente, conectar ao DB e iniciar o servidor.

import 'dotenv/config'; // Importa e carrega as variáveis de ambiente do .env para process.env
// Por que existe: Garante que as configurações estejam disponíveis desde o início.

import app from './interfaces/app'; // Importa a instância do aplicativo Express configurada em app.ts
// Por que existe: Desacopla a inicialização do servidor da sua configuração de rotas e middlewares.

import { PrismaClient } from '@prisma/client'; // Importa a classe PrismaClient para interação com o DB
// Por que existe: É o ORM que conecta sua aplicação ao banco de dados MySQL.

const prisma = new PrismaClient(); // Cria uma nova instância do PrismaClient
// Por que existe: Essa instância será usada para todas as operações de banco de dados.

const port = process.env.PORT || 3000; // Define a porta do servidor, usando .env ou 3000 como fallback
// Por que existe: Permite flexibilidade na configuração da porta.

/**
 * @function connectPrisma
 * @description Tenta conectar o Prisma ao banco de dados MySQL.
 * @returns {Promise<void>} Uma promessa que resolve se a conexão for bem-sucedida, ou rejeita em caso de erro.
 */
async function connectPrisma(): Promise<void> {
    try {
        await prisma.$connect(); // Tenta estabelecer a conexão com o DB
        console.log('🟢 Prisma conectado ao MySQL com sucesso!'); // Feedback de sucesso
    } catch (error: any) {
        console.error('🔴 Erro ao conectar o Prisma ao MySQL:', error.message); // Loga o erro detalhado
        process.exit(1); // Encerra a aplicação se a conexão crítica falhar
    }
}

/**
 * @function startServer
 * @description Inicia o processo do servidor: conecta ao DB e então inicia o Express.
 * @returns {Promise<void>} Uma promessa que resolve quando o servidor Express está escutando.
 */
async function startServer(): Promise<void> {
    await connectPrisma(); // Garante que o DB esteja conectado antes de iniciar o servidor

    app.listen(port, () => {
        // Inicia o servidor Express na porta especificada
        console.log(`Variável de Ambiente DATABASE_URL: ${process.env.DATABASE_URL}`); // Debug da URL do DB
        console.log(`Servidor rodando na porta ${port}`); // Confirma a porta do servidor
    });
}

startServer(); // Chama a função para iniciar toda a aplicação
// Por que existe: É o ponto de execução principal do script.