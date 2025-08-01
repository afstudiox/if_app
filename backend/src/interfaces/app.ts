// backend/src/interfaces/app.ts
// Configura o servidor Express, rotas e dependências.

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../infrastructure/PrismaUserRepository';

// Importa os Casos de Uso
import { ListUsersUseCase } from '../application/ListUsersUseCase';
import { CreateUserUseCase } from '../application/CreateUserUseCase';
import { UpdateUserUseCase } from '../application/UpdateUserUseCase'; // NOVO IMPORT

// Importa os DTOs
import { CreateUserDTO } from './CreateUserDTO';
import { UpdateUserDTO } from './UpdateUserDTO'; // NOVO IMPORT

// O que faz: Inicializa o servidor Express, o Prisma e as dependências da aplicação.
// Por que existe: É a camada de 'interfaces', responsável por coordenar o fluxo entre as requisições HTTP
// e a lógica de negócio (casos de uso).

// Inicializa o Express e o PrismaClient
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

// Injeção de Dependências
// O que faz: Instancia as classes concretas do repositório e injeta-as nos casos de uso.
// Por que existe: Garante que os casos de uso sejam independentes da tecnologia de persistência.
const userRepository = new PrismaUserRepository(prisma);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository); // NOVO: Instancia o caso de uso de atualização

// Rota GET para listar todos os usuários
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await listUsersUseCase.execute();
    return res.status(200).json(users);
  } catch (error) {
    // Lidar com erros de forma mais elegante no futuro.
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota POST para criar um novo usuário
app.post('/users', async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDTO = req.body;
    const newUser = await createUserUseCase.execute(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    // Lidar com erros de forma mais elegante no futuro.
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// NOVO: Rota PUT para atualizar um usuário existente
app.put('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id; // Pega o ID do usuário na URL
  const userData: UpdateUserDTO = req.body; // Pega os dados a serem atualizados do corpo da requisição

  // O que faz: Rota para atualizar um usuário.
  // Por que existe: Expõe a funcionalidade de atualização para o cliente HTTP.
  try {
    const updatedUser = await updateUserUseCase.execute(id, userData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // Lidar com erros de forma mais elegante no futuro.
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Exporta a instância do aplicativo Express
export default app;