Este README explica como executar os testes automatizados para o sistema Santana Pizzaria, tanto com Jest (testes unitários) quanto com Cypress (testes E2E).

Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

Aplicação rodando localmente em http://localhost:3000

API rodando localmente em http://localhost:3333

Instalação
Clone o repositório

Instale as dependências:

bash
npm install
# ou
yarn install
Testes com Jest (Unitários)
Executando todos os testes
bash
npm test
# ou
yarn test
Executando testes específicos
bash
npm test caminho/para/o/arquivo.test.js
# ou
yarn test caminho/para/o/arquivo.test.js
Opções úteis
--watch: Executa em modo watch

--coverage: Gera relatório de cobertura

bash
npm test -- --coverage
Testes com Cypress (E2E)
Executando no modo interativo
bash
npm run cypress:open
# ou
yarn cypress:open
Isso abrirá a interface do Cypress onde você pode selecionar os testes para executar.

Executando no modo headless
bash
npm run cypress:run
# ou
yarn cypress:run
Executando testes específicos
bash
npx cypress run --spec "cypress/e2e/dashboard.spec.cy.js"
Estrutura de Testes
text
tests/
├── unit/               # Testes unitários com Jest
│   ├── utils/          # Utilitários
│   ├── services/       # Testes de serviços
│   └── components/     # Testes de componentes
└── e2e/                # Testes E2E com Cypress
    ├── login/          # Fluxo de login
    ├── dashboard/      # Painel principal
    └── products/       # Cadastro de produtos
Configuração de Ambiente
Crie um arquivo .env.test na raiz do projeto com as variáveis de ambiente para testes:

text
TEST_API_URL=http://localhost:3333
TEST_EMAIL=teste@teste.com
TEST_PASSWORD=123456
Dicas para Desenvolvimento
Para testes com Jest, utilize mocks para serviços externos

No Cypress, use cy.intercept() para mockar chamadas API

Execute npm run test:ci para rodar todos os testes em modo CI

Solução de Problemas
Se encontrar erros:

Verifique se todos os serviços estão rodando

Confira se as credenciais de teste estão corretas

Limpe o cache do Jest com npm test -- --clearCache

Contribuição
Para adicionar novos testes:

Crie um arquivo .spec.js ou .test.js para testes unitários

Crie um arquivo .spec.cy.js para testes E2E

Siga os padrões existentes na estrutura de pastas
