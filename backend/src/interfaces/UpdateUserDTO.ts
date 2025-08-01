// backend/src/interfaces/UpdateUserDTO.ts
// Define o Data Transfer Object (DTO) para a entrada de dados na atualização de usuário.

/**
 * @interface UpdateUserDTO
 * @description Define a estrutura esperada para o corpo da requisição ao atualizar um usuário.
 * O que faz: Especifica quais campos (e seus tipos) são esperados do cliente para a atualização.
 * Por que existe: Na camada de 'interfaces', DTOs servem para validar e tipar a entrada de dados.
 * A atualização é um caso especial, pois os campos podem ser opcionais.
 */
export interface UpdateUserDTO {
  email?: string;      // O campo 'email' é opcional.
  name?: string | null;  // O campo 'name' também é opcional e pode ser uma string ou nulo.
}