// Define o caso de uso para listar todos os usuários.

import { User } from '../domain/User';                 // Importa a interface User para tipagem do domínio.
// Por que existe: O caso de uso opera sobre entidades do domínio.

import { UserRepository } from '../infrastructure/PrismaUserRepository'; // Importa a INTERFACE do repositório.
// Por que existe: O caso de uso depende da abstração (interface), e não da implementação concreta do repositório.

/**
 * @class ListUsersUseCase
 * @description Caso de uso para a funcionalidade de listar todos os usuários.
 * O que faz: Contém a lógica de negócio para orquestrar a obtenção de uma lista de usuários.
 * Por que existe: A camada de aplicação define as funcionalidades do sistema em termos de casos de uso,
 * coordenando as interações entre o domínio e a infraestrutura.
 */
export class ListUsersUseCase {
  private userRepository: UserRepository; // Instância privada da interface do repositório.
  // Por que existe: O caso de uso precisa de um repositório para buscar dados.

  /**
   * @constructor
   * @param {UserRepository} userRepository - A implementação do repositório de usuários.
   * O que faz: Recebe a dependência do repositório via Injeção de Dependência.
   * Por que existe: Permite que o caso de uso seja testado independentemente da implementação do repositório (ex: usando um mock em testes).
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @method execute
   * @description Executa o caso de uso, buscando todos os usuários.
   * @returns {Promise<User[]>} Uma promessa que resolve com um array de objetos User.
   */
  async execute(): Promise<User[]> {
    // Delega a busca dos usuários ao repositório.
    // O que faz: O caso de uso não se preocupa com "como" os dados são obtidos (SQL, NoSQL, etc.),
    //            apenas "o que" ele precisa (a lista de usuários).
    const users = await this.userRepository.findAll();
    return users; // Retorna a lista de usuários.
  }
}