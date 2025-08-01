/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // O que faz: Configurações padrão do Jest para um projeto TypeScript.
  // Por que existe: Permite que o Jest entenda e compile arquivos TypeScript (.ts) para rodar os testes.
  preset: 'ts-jest',

  // O que faz: Especifica o ambiente de execução dos testes.
  // Por que existe: O ambiente 'node' é o correto para testes de backend (que não usam navegador).
  testEnvironment: 'node',

  // O que faz: Define os diretórios onde o Jest deve procurar os arquivos de teste.
  // Por que existe: O padrão 'testMatch' é mais moderno e claro que 'testRegex'.
  testMatch: ['**/test/**/*.test.ts'],

  // O que faz: Adiciona o mapeamento para resolver os módulos a partir da raiz do projeto.
  // Por que existe: Permite que os testes importem arquivos da pasta 'src' usando caminhos relativos
  //                   sem ter que subir muitos diretórios (ex: `../../src/...`).
  moduleDirectories: ['node_modules', '<rootDir>/src'],

  // O que faz: Define os diretórios onde o Jest deve procurar pelos arquivos de teste.
  // Por que existe: Foca a busca apenas na pasta 'test' e na 'src', para maior clareza e performance.
  roots: ['<rootDir>/src', '<rootDir>/test'],

  // O que faz: Define quais arquivos devem ser ignorados.
  // Por que existe: Impede que o Jest tente rodar testes em arquivos que não são de teste, como os gerados pelo Prisma.
  testPathIgnorePatterns: ['/node_modules/', '/prisma/'],
};