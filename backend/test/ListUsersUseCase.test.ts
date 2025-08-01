import { ListUsersUseCase } from '../src/application/ListUsersUseCase';       // Importa a classe que vamos testar.
import { User } from '../src/domain/User';                                    // Importa a interface do domínio.
import { UserRepository } from '../src/infrastructure/PrismaUserRepository';  // Importa a interface do repositório.

/**
 * @description Bloco de testes para a classe ListUsersUseCase.
 * O que faz: Agrupa todos os testes relacionados a este caso de uso.
 * Por que existe: Organiza os testes para facilitar a leitura e manutenção.
 */
describe('ListUsersUseCase', () => {

  // Simulação (Mock) do Repositório de Usuários
  let userRepositoryMock: UserRepository;
  let listUsersUseCase: ListUsersUseCase;

  /**
   * @description Função que roda antes de cada teste (`it`).
   * O que faz: Configura um novo estado para cada teste, garantindo que eles sejam independentes.
   * Por que existe: Evita que um teste afete o resultado de outro.
   */
  beforeEach(() => {
    // Criamos um mock da interface UserRepository usando jest.mock.
    userRepositoryMock = {
      findAll: jest.fn(), // O que faz: Cria uma função falsa (mock function) para o método findAll.
      create: jest.fn(),  // Também criamos um mock para o método create, mesmo que não o usemos neste teste.
      update: jest.fn(), // Agora, o mock também deve ter o método 'update'
    };

    // Instanciamos o caso de uso, INJETANDO o nosso mock em vez da implementação real (PrismaUserRepository).
    // Por que existe: Isso é a Injeção de Dependência na prática, permitindo que a gente teste o caso de uso isoladamente.
    listUsersUseCase = new ListUsersUseCase(userRepositoryMock);
  });

  it('deve chamar o método findAll do repositório e retornar uma lista de usuários', async () => {
    // O que faz: Verifica o comportamento principal do caso de uso.
    // Por que existe: Garante que a lógica do caso de uso esteja correta.

    // 1. Arrange (Preparar)
    // Definimos o que o nosso mock deve retornar quando for chamado.
    const mockUsers: User[] = [
      { id: '1', email: 'test1@example.com', name: 'User 1' },
      { id: '2', email: 'test2@example.com', name: 'User 2' },
    ];
    // O que faz: Prepara dados de exemplo para o teste.
    // Por que existe: O teste precisa de dados de entrada controlados para verificar a saída.

    (userRepositoryMock.findAll as jest.Mock).mockResolvedValue(mockUsers);
    // O que faz: Configura o mock. Dizemos a ele: "Quando você for chamado, retorne a 'mockUsers'".
    // Por que existe: Simula o comportamento do repositório real, mas com um retorno previsível para o teste.

    // 2. Act (Agir)
    // Chamamos o método que queremos testar no caso de uso.
    const result = await listUsersUseCase.execute();
    // O que faz: Executa o código que queremos verificar.

    // 3. Assert (Verificar)
    // Verificamos se o comportamento esperado aconteceu.
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    // O que faz: Verifica se o método `findAll` do mock foi chamado exatamente uma vez.
    // Por que existe: Garante que o caso de uso está chamando a dependência correta.

    expect(result).toEqual(mockUsers);
    // O que faz: Verifica se o resultado retornado pelo caso de uso é exatamente a lista de usuários que preparamos.
    // Por que existe: Garante que o caso de uso está retornando os dados sem modificá-los.
  });

  // NOVO: Adicionar este teste para o caso de um erro
  it('deve lançar um erro se o repositório falhar', async () => {
    // O que faz: Testa o comportamento do caso de uso em caso de falha da dependência.
    // Por que existe: É importante garantir que os erros sejam tratados e propagados corretamente.

    // 1. Arrange (Preparar)
    (userRepositoryMock.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));
    // O que faz: Configura o mock para simular uma falha do repositório (ex: DB offline).
    // Por que existe: Permite testar o caminho de erro do código.

    // 2. Act & Assert (Agir & Verificar)
    // Usamos `expect(...).rejects.toThrow()` para testar se a Promise lança um erro.
    await expect(listUsersUseCase.execute()).rejects.toThrow('Database error');
    // O que faz: Verifica se a chamada do caso de uso resultará em uma exceção.
    // Por que existe: Garante que o caso de uso não "engole" erros da camada de infraestrutura.
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

});