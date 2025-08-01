// test/CreateUserUseCase.test.ts

import { CreateUserUseCase } from '../src/application/CreateUserUseCase';
import { User } from '../src/domain/User';
import { UserRepository } from '../src/infrastructure/PrismaUserRepository';
import { CreateUserDTO } from '../src/interfaces/CreateUserDTO';

/**
 * @description Bloco de testes para a classe CreateUserUseCase.
 * O que faz: Agrupa todos os testes relacionados a este caso de uso.
 * Por que existe: Organiza os testes para facilitar a leitura e manutenção.
 */
describe('CreateUserUseCase', () => {

  let userRepositoryMock: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    // Criamos um mock da interface UserRepository para o beforeEach
    userRepositoryMock = {
      findAll: jest.fn(), 
      create: jest.fn(),
    };

    // Instanciamos o caso de uso, INJETANDO o nosso mock
    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('deve chamar o método create do repositório com os dados corretos e retornar o novo usuário', async () => {
    // 1. Arrange (Preparar)
    const userData: CreateUserDTO = {
      email: 'newuser@example.com',
      name: 'New User'
    };

    const createdUser: User = {
      ...userData,
      id: 'generated-uuid-123'
    };

    (userRepositoryMock.create as jest.Mock).mockResolvedValue(createdUser);

    // 2. Act (Agir)
    const result = await createUserUseCase.execute(userData);

    // 3. Assert (Verificar)
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(createdUser);
  });

  it('deve lançar um erro se o repositório falhar na criação do usuário', async () => {
    // 1. Arrange (Preparar)
    const userData: CreateUserDTO = {
      email: 'fail@example.com',
      name: 'Fail User'
    };

    (userRepositoryMock.create as jest.Mock).mockRejectedValue(new Error('Database creation error'));

    // 2. Act & Assert (Agir & Verificar)
    await expect(createUserUseCase.execute(userData)).rejects.toThrow('Database creation error');
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

});