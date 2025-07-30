// backend/src/application/CreateUserUseCase.ts
// Define o caso de uso para a criação de um novo usuário.

import { User } from '../domain/User';                 // Importa a interface User para tipagem do domínio.
// O que faz: O caso de uso opera e retorna entidades do domínio.
// Por que existe: Garante consistência de tipos, assegurando que o caso de uso manipule objetos User conforme definido no domínio.

import { UserRepository } from '../infrastructure/PrismaUserRepository'; // Importa a INTERFACE do repositório.
// O que faz: O caso de uso depende da abstração do repositório para persistir dados.
// Por que existe: Permite Inversão de Dependência, tornando o caso de uso independente da implementação de DB.
//                   Ele só se preocupa com "o que" o repositório faz (o contrato), não "como" ele faz.

import { CreateUserDTO } from '../interfaces/CreateUserDTO'; // Importa o DTO de entrada.
// O que faz: Define a estrutura dos dados que o caso de uso espera receber para criar um usuário.
// Por que existe: Desacopla a forma como os dados chegam (ex: JSON de uma requisição HTTP)
//                   da forma como o domínio os entende ou do que o caso de uso precisa para operar.

/**
 * @class CreateUserUseCase
 * @description Caso de uso para a funcionalidade de criar um novo usuário.
 * O que faz: Contém a lógica de negócio para a criação de um usuário. Isso pode incluir validações
 * adicionais, regras de negócio complexas, ou coordenação com outros serviços/repositórios.
 * Atualmente, delega diretamente a criação ao repositório.
 * Por que existe: A camada de 'application' define as funcionalidades do sistema em termos de casos de uso.
 * Ela orquestra as interações entre a camada de domínio (entidades) e a camada de infraestrutura (repositórios),
 * sem se preocupar com detalhes de interface (HTTP, CLI) ou detalhes de banco de dados.
 */
export class CreateUserUseCase {
  private userRepository: UserRepository; // Instância privada da interface do repositório.
  // O que faz: Usado para interagir com a camada de persistência para salvar o novo usuário.
  // Por que existe: O caso de uso precisa de um mecanismo para salvar o usuário, e ele faz isso através
  //                   da abstração do repositório.

  /**
   * @constructor
   * @param {UserRepository} userRepository - A implementação do repositório de usuários.
   * O que faz: Inicializa a classe, recebendo a dependência do repositório.
   * Por que existe: Implementa o padrão de Injeção de Dependência. O repositório é "injetado" no caso de uso,
   * o que é crucial para testabilidade (permite injetar um mock de repositório em testes) e flexibilidade.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @method execute
   * @description Executa o caso de uso para criar um usuário.
   * @param {CreateUserDTO} userData - Os dados do novo usuário recebidos para criação (email, name).
   * @returns {Promise<User>} Uma promessa que resolve com o usuário criado (incluindo o ID gerado pelo DB).
   * O que faz: Recebe os dados de entrada, e delega a operação de criação do usuário ao repositório.
   * Se houvesse validações de negócio mais complexas ou interações com outras entidades,
   * elas ocorreriam aqui antes de chamar o repositório.
   * Por que existe: Encapsula a lógica de negócio específica de "criar um usuário",
   * tornando-a reutilizável e isolada dos detalhes de interface e persistência.
   */
  async execute(userData: CreateUserDTO): Promise<User> {
    // --- Exemplo de onde você colocaria validações de negócio adicionais ---
    // if (!userData.email || !/^\S+@\S+\.\S+$/.test(userData.email)) {
    //   throw new Error('Invalid email format');
    // }
    // Se, por exemplo, o email já existisse, a verificação também poderia ser feita aqui:
    // const existingUser = await this.userRepository.findByEmail(userData.email);
    // if (existingUser) {
    //   throw new Error('User with this email already exists');
    // }

    // Delega a criação do usuário ao repositório.
    // O que faz: O caso de uso invoca o método 'create' da instância de UserRepository que ele recebeu.
    // Por que existe: O caso de uso não se preocupa com "como" o usuário é salvo (SQL, NoSQL),
    //                   apenas com "o que" ele precisa para ser salvo (os dados do usuário).
    const newUser = await this.userRepository.create(userData);
    return newUser; // Retorna o usuário criado.
  }
}