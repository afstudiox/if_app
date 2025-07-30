// backend/src/interfaces/CreateUserDTO.ts
// Define o Data Transfer Object (DTO) para a entrada de dados na criação de usuário.

/**
 * @interface CreateUserDTO
 * @description Define a estrutura esperada para o corpo da requisição ao criar um novo usuário.
 * O que faz: Especifica quais campos (e seus tipos) são esperados do cliente (ex: um formulário web ou um aplicativo mobile)
 * ao enviar dados para criar um usuário.
 * Por que existe: Na camada de 'interfaces', DTOs servem para validar e tipar a entrada de dados externos
 * antes que eles sejam passados para as camadas internas da aplicação.
 * Isso garante que a requisição HTTP seja bem estruturada e evita que dados inválidos
 * cheguem à lógica de negócio.
 */
export interface CreateUserDTO {
  email: string;      // O campo 'email' é obrigatório e deve ser uma string.
  name: string | null; // O campo 'name' é opcional (indicado por '?') e pode ser uma string ou nulo.
}