// backend/src/domain/User.ts
// Define a interface para a entidade de negócio User.
// O que faz: Garante a consistência dos tipos para objetos User em todas as camadas da aplicação.
// Por que existe: Na Clean Architecture, o 'domain' é o centro, definindo as regras e modelos de negócio puros,
//                   desacoplados de detalhes de infraestrutura (como banco de dados).
export interface User {
  id: string;   // Identificador único do usuário (UUID do Prisma por padrão para @id @default(uuid())).
  email: string; // Endereço de e-mail do usuário (deve ser único).
  name: string | null; // Nome do usuário (pode ser nulo).
}