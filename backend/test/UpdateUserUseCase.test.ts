// test/UpdateUserUseCase.test.ts

import { UpdateUserUseCase } from '../src/application/UpdateUserUseCase';
import { User } from '../src/domain/User';
import { UserRepository } from '../src/infrastructure/PrismaUserRepository';
import { UpdateUserDTO } from '../src/interfaces/UpdateUserDTO';

/**
 * @description Bloco de testes para a classe UpdateUserUseCase.
 * O que faz: Agrupa todos os testes relacionados a este caso de uso.
 * Por que existe: Organiza os testes para facilitar a leitura e manutenção.
 */
describe('UpdateUserUseCase', () => {

  let userRepositoryMock: UserRepository;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    // Cria um novo mock para o repositório e injeta no caso de uso antes de cada teste.
    userRepositoryMock = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(), // Agora, o mock também deve ter o método 'update'
    };

    updateUserUseCase = new UpdateUserUseCase(userRepositoryMock);
  });

  it('deve chamar o método update do repositório com os dados corretos e retornar o usuário atualizado', async () => {
    // 1. Arrange (Preparar)
    const userId = 'user-123';
    const userDetails: UpdateUserDTO = { name: 'Updated Name' };
    const updatedUser: User = {
      id: userId,
      email: 'test@example.com',
      name: 'Updated Name',
    };

    (userRepositoryMock.update as jest.Mock).mockResolvedValue(updatedUser);

    // 2. Act (Agir)
    const result = await updateUserUseCase.execute(userId, userDetails);

    // 3. Assert (Verificar)
    expect(userRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.update).toHaveBeenCalledWith(userId, userDetails);
    expect(result).toEqual(updatedUser);
  });

  it('deve retornar null se o usuário a ser atualizado não for encontrado', async () => {
    // 1. Arrange (Preparar)
    const userId = 'non-existent-user';
    const userDetails: UpdateUserDTO = { name: 'Updated Name' };

    (userRepositoryMock.update as jest.Mock).mockResolvedValue(null);

    // 2. Act (Agir)
    const result = await updateUserUseCase.execute(userId, userDetails);

    // 3. Assert (Verificar)
    expect(userRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});