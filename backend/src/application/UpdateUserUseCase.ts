// backend/src/application/UpdateUserUseCase.ts
// Define o caso de uso para atualizar um usuário.

import { User } from '../domain/User';
import { UserRepository } from '../infrastructure/PrismaUserRepository';
import { UpdateUserDTO } from '../interfaces/UpdateUserDTO';

/**
 * @class UpdateUserUseCase
 * @description Encapsula a lógica de negócio para atualizar um usuário existente.
 * O que faz: Recebe os dados de um usuário a ser atualizado e coordena a operação com o repositório.
 * Por que existe: Na Clean Architecture, os casos de uso definem a funcionalidade da aplicação.
 * Eles orquestram o fluxo de dados entre as camadas, sem se preocuparem com detalhes de implementação (como o DB).
 */
export class UpdateUserUseCase {
  private userRepository: UserRepository; // A dependência do repositório.
  // O que faz: Armazena a referência à implementação do repositório, que será injetada.
  // Por que existe: O caso de uso precisa de uma forma de interagir com os dados (salvar, buscar, atualizar),
  // e a interface UserRepository é a abstração para essa interação.

  /**
   * @constructor
   * @param {UserRepository} userRepository - A implementação do repositório de usuários.
   * O que faz: Inicializa o caso de uso, recebendo a dependência do repositório.
   * Por que existe: Implementa o padrão de Injeção de Dependência, permitindo que o caso de uso
   * seja testado facilmente com mocks e seja independente da tecnologia de persistência.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @method execute
   * @description Executa a lógica de atualização do usuário.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {UpdateUserDTO} userDetails - Os dados a serem atualizados.
   * @returns {Promise<User | null>} Uma promessa que resolve com o usuário atualizado, ou `null` se não for encontrado.
   * O que faz: Delega a operação de atualização para o repositório, garantindo que a lógica de negócio esteja encapsulada.
   * Por que existe: É o método público que o controlador (a casca da cebola) chamará para executar a funcionalidade.
   */
  async execute(id: string, userDetails: UpdateUserDTO): Promise<User | null> {
    const updatedUser = await this.userRepository.update(id, userDetails);
    // O que faz: Chama o método `update` da dependência `userRepository`, passando o ID e os dados.
    // Por que existe: O caso de uso delega a tarefa de persistência para o repositório, que é a camada responsável por isso.

    return updatedUser;
  }
}