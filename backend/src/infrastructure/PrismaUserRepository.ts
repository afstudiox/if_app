// backend/src/infrastructure/PrismaUserRepository.ts
// Implementa o contrato do repositório de usuários usando o PrismaClient.

import { PrismaClient } from '@prisma/client'; // Importa o cliente gerado pelo Prisma para interagir com o DB.
// O que faz: Fornece a interface para todas as operações de banco de dados definidas no seu `schema.prisma`.
// Por que existe: O PrismaClient é a ferramenta principal para o acesso e manipulação de dados no seu MySQL.

import { User } from '../domain/User';         // Importa a interface User para garantir a tipagem do domínio.
// O que faz: Define a estrutura esperada para objetos User, conforme as regras de negócio do domínio.
// Por que existe: Garante que os dados retornados e manipulados pelo repositório estejam em conformidade
//                   com o modelo de entidade puro, desacoplando o domínio da implementação do DB.

/**
 * @interface UserRepository
 * @description Define o contrato (interface) que qualquer repositório de usuários deve seguir.
 * O que faz: Abstrai a forma como os dados do usuário são persistidos ou recuperados.
 * Por que existe: É um princípio fundamental da Clean Architecture e POO (Programação Orientada a Objetos).
 * Permite que a camada de 'application' (casos de uso) dependa de uma abstração (`UserRepository`),
 * e não de uma implementação específica (ex: `PrismaUserRepository`). Isso facilita
 * testes unitários (mockando o repositório) e permite trocar a tecnologia de persistência
 * (ex: de MySQL para PostgreSQL, ou de Prisma para TypeORM) sem alterar a lógica de negócio.
 */
export interface UserRepository {
  findAll(): Promise<User[]>; // Método para buscar todos os usuários. Retorna uma Promise de um array de User.
  // O que faz: Declara que todo repositório de usuário deve ser capaz de fornecer uma lista de usuários.
  // Por que existe: Define o comportamento essencial de um repositório de leitura para a entidade User.
  // Futuramente, outros métodos como findById, create, update, delete seriam adicionados aqui para expandir o CRUD.
}

/**
 * @class PrismaUserRepository
 * @description Implementação concreta da interface UserRepository utilizando o Prisma ORM.
 * O que faz: Traduz as operações de domínio (ex: buscar todos os usuários) em operações de banco de dados
 * reais usando o PrismaClient.
 * Por que existe: A camada de 'infrastructure' é responsável por lidar com detalhes técnicos e externos,
 * como o acesso ao banco de dados. Esta classe atua como a ponte entre a lógica
 * de negócio (definida nos casos de uso e domínio) e o armazenamento de dados.
 */
export class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient; // Propriedade privada para armazenar a instância do PrismaClient.
  // O que faz: Armazena a referência ao cliente do Prisma que será usado para interagir com o DB.
  // Por que existe: O repositório precisa de acesso ao ORM para realizar as operações de persistência.

  /**
   * @constructor
   * @param {PrismaClient} prisma - A instância do PrismaClient a ser utilizada por este repositório.
   * O que faz: Inicializa a classe, recebendo a instância do PrismaClient.
   * Por que existe: Implementa o padrão de Injeção de Dependência (DI). Em vez de a classe criar
   * sua própria instância de `PrismaClient` (o que a tornaria rigidamente acoplada
   * e difícil de testar), ela a recebe de fora. Isso permite que em testes,
   * você possa 'injetar' um mock ou uma versão falsa do PrismaClient.
   */
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * @method findAll
   * @description Implementação do método 'findAll' da interface UserRepository.
   * O que faz: Busca todos os registros de usuário no banco de dados através do Prisma.
   * Por que existe: É a lógica concreta para satisfazer o contrato `findAll()` definido na interface.
   */
  async findAll(): Promise<User[]> {
    // Busca os usuários do banco de dados usando o Prisma.
    const users = await this.prisma.user.findMany();
    // O que faz: Executa uma consulta SQL (via Prisma) que retorna todos os registros da tabela 'User'.

    // Mapeia os resultados do Prisma para o formato da interface 'User' do domínio.
    // O que faz: Assegura que o tipo 'id' (e outras propriedades, se houver) esteja
    //                   exatamente como definido na interface 'User' (ex: 'string'),
    //                   mesmo que o Prisma o retorne de forma ligeiramente diferente (ex: Buffer).
    // Por que existe: Garante a conformidade de tipos entre a camada de infraestrutura
    //                   e a camada de domínio, evitando erros de tipagem.
    return users.map(user => ({
      ...user, // Copia todas as outras propriedades do objeto 'user'
      id: user.id.toString(), // Converte explicitamente o ID para string
    }));
  }
}