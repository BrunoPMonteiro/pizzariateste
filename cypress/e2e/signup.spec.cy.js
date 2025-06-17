describe('Fluxo de Cadastro e Autenticação', () => {
  // URLs conforme especificado
  const URL_INICIAL = 'http://localhost:3000/';
  const URL_CADASTRO = 'http://localhost:3000/signup';
  const URL_DASHBOARD = 'http://localhost:3000/dashboard';

  beforeEach(() => {
    cy.visit(URL_CADASTRO, { timeout: 10000 });
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });

  // 1. Teste: Cadastro válido
  it('CT001 - Cadastro bem-sucedido redireciona para login', () => {
    cy.intercept('POST', '**/users', {
      statusCode: 201,
      body: { message: 'Usuário criado' }
    }).as('signupRequest');

    // Preenche e submete o formulário
    cy.fillSignupForm('Usuário Teste', 'teste@teste.com', '123456');
    cy.submitForm();

    // Verificações
    cy.wait('@signupRequest', { timeout: 10000 });
    cy.url({ timeout: 10000 }).should('eq', URL_INICIAL);
    cy.get('.Toastify__toast--success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Conta criada com sucesso!');
  });

  // 2. Teste: Campos obrigatórios
  it('CT002 - Exibe erro ao submeter com campos vazios', () => {
    cy.submitForm();
    cy.get('.Toastify__toast--error', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'PREENCHA TODOS OS CAMPOS');
    cy.url().should('eq', URL_CADASTRO);
  });

  // 3. Teste: Fluxo completo (Cadastro -> Login)
  it('CT003 - Cadastro seguido de login bem-sucedido', () => {
    // Mock do cadastro
    cy.intercept('POST', '**/users', {
      statusCode: 201,
      body: { message: 'Usuário criado' }
    }).as('signup');

    // Mock do login
    cy.intercept('POST', '**/sessions', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' }
    }).as('dashboard');

    // 1. Cadastro
    cy.fillSignupForm('Usuário Teste', 'teste@teste.com', '123456');
    cy.submitForm();

    // 2. Verifica redirecionamento para login
    cy.url({ timeout: 10000 }).should('eq', URL_INICIAL);
    cy.get('.Toastify__toast--success', { timeout: 10000 })
      .should('contain', 'Conta criada com sucesso!');

    // 3. Login manual
    cy.get('input[placeholder="Digite seu email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[placeholder="Digite sua senha"]').type('123456');
    cy.get('button[type="submit"]').click();

  });

  // 4. Teste: E-mail inválido no cadastro
  it('CT004 - Exibe erro para e-mail inválido', () => {
    cy.intercept('POST', '**/users', {
      statusCode: 400,
      body: { error: 'Erro ao cadastrar!' }
    }).as('invalidRequest');

    cy.fillSignupForm('Usuário', 'email-invalido', '123456');
    cy.submitForm();

    cy.wait('@invalidRequest', { timeout: 10000 });
    cy.get('.Toastify__toast--error', { timeout: 10000 })
      .should('contain', 'Erro ao cadastrar!');
  });
});