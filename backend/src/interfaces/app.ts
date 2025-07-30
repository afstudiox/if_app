// backend/src/interfaces/app.ts
// Configura o aplicativo Express e define as rotas da API.
// O que faz: Atua como a camada de 'interfaces' (controladores) que recebe requisições HTTP
//                   e as delega para os casos de uso da camada de 'application'.

import express, { Request, Response } from 'express'; // Importa Express e os tipos para requisição/resposta.
// Por que existe: Base para construir a API REST.

import { PrismaClient } from '@prisma/client'; // Temporariamente mantido aqui, mas idealmente instanciado uma vez no index.ts e injetado.
// Por que existe: Necessário para instanciar o repositório agora, será refatorado para injeção centralizada.

import { PrismaUserRepository } from '../infrastructure/PrismaUserRepository'; // Importa a implementação do repositório.
// Por que existe: O controlador precisa de acesso ao repositório (via caso de uso) para interagir com os dados.

import { ListUsersUseCase } from '../application/ListUsersUseCase'; // Importa o caso de uso de listar usuários.
// Por que existe: O controlador delega a lógica de negócio para o caso de uso.

const app = express(); // Cria a instância do aplicativo Express.
// Por que existe: O objeto principal para configuração do servidor web.

// Middlewares
app.use(express.json()); // Middleware para parsear corpos de requisição JSON.
// Por que existe: Permite que a API receba e interprete dados JSON enviados pelos clientes.

// --- Configuração das Dependências (Temporário para Demonstração) ---
// IMPORTANTE: Em uma aplicação maior e mais robusta, estas instâncias (PrismaClient, UserRepository, UseCases)
// seriam gerenciadas por um CONTÊINER DE INJEÇÃO DE DEPENDÊNCIAS
// e passadas para os controladores de forma mais elegante.
// Por enquanto, instanciamos aqui para vermos o fluxo.
const prisma = new PrismaClient(); // Instância do PrismaClient.
// Por que existe: Necessária para construir o repositório.

const userRepository = new PrismaUserRepository(prisma); // Instância do repositório, injetando o prisma.
// Por que existe: Implementação concreta de como os dados do usuário são acessados.

const listUsersUseCase = new ListUsersUseCase(userRepository); // Instância do caso de uso, injetando o repositório.
// Por que existe: Orquestra a lógica de negócio para listar usuários.

// Rota para listar usuários
/**
 * @route GET /users
 * @description Rota para obter todos os usuários.
 * O que faz: Recebe a requisição, delega ao caso de uso e envia a resposta.
 */
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await listUsersUseCase.execute(); // Executa o caso de uso para obter os usuários.
        // Por que existe: O controlador não sabe como os dados são obtidos, apenas que o caso de uso os fornece.
        return res.json(users); // Retorna a lista de usuários como JSON.
    } catch (error: any) {
        console.error('Erro ao buscar usuários na rota /users:', error); // Loga o erro para depuração.
        return res.status(500).json({ error: 'Erro interno do servidor.' }); // Retorna um erro genérico 500.
    }
});

export default app; // Exporta a instância configurada do aplicativo Express.
// Por que existe: Permite que o src/index.ts importe e inicie este aplicativo.