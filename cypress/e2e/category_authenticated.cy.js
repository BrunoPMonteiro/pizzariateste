describe('Login + Cadastro de Categoria', () => {
  it('Deve fazer login e cadastrar uma nova categoria', () => {
    cy.visit('http://localhost:3000');

    // Preenche as credenciais
    cy.get('input[placeholder="Digite seu email"]').type('teste@teste.com');
    cy.get('input[placeholder="Digite sua senha"]').type('123456');

    // Clica em Entrar
    cy.contains('button', 'Acessar').click();

    // Aguardamos redirecionamento para dashboard ou rota principal
    cy.url().should('include', '/dashboard');

    // Acessa a página de categoria autenticado
    cy.visit('http://localhost:3000/category');

    // Cadastra uma nova categoria
    cy.get('input[placeholder="Digite o nome da categoria"]')
      .type('Bebidas');

    cy.contains('button', 'Cadastrar').click();

    cy.contains('Categoria cadastrada com sucesso!').should('be.visible');

    cy.get('input[placeholder="Digite o nome da categoria"]').should('have.value', '');
  });
});
