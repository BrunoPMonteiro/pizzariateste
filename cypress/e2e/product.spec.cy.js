describe('Cadastro de Produto', () => {
  // Função de login reutilizável
  const fazerLogin = () => {
    cy.visit('http://localhost:3000/')
    cy.get('input[placeholder="Digite seu email"]').type('teste@teste.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button').contains('Acessar').click()
    cy.url().should('include', '/dashboard') // Garante que login funcionou
  }

  // Executa antes de cada teste
  beforeEach(() => {
    fazerLogin()
    cy.visit('http://localhost:3000/product')
    cy.contains('h1', 'Novo produto') // Espera o título carregar
  })

  it('CT01 - Verifica carregamento da página', () => {
    cy.get('h1').should('contain', 'Novo produto')
    cy.get('form').should('exist')
  })

  it('CT02 - Valida campos obrigatórios', () => {
    cy.get('button').contains('Cadastrar').click()
    cy.contains('Preencha todos os campos!').should('be.visible')
  })

  it('CT03 - Preenche formulário corretamente', () => {
    // Preenche campos básicos
    cy.get('select').select(0) // Seleciona primeira categoria
    cy.get('input[placeholder*="nome do produto"]').type('Pizza Teste')
    cy.get('input[placeholder*="Preço do produto"]').type('35.90')
    cy.get('textarea').type('Descrição teste')

    // Upload de imagem (simulado)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/pizza.jpg', { force: true })

    // Mock da resposta da API
    cy.intercept('POST', '/product', {
      statusCode: 200,
      body: { success: true }
    }).as('registerProduct')

    cy.get('button').contains('Cadastrar').click()
    cy.contains('Produto cadastrado com sucesso!').should('exist')
  })
  // 6.TESTE 4 - Validação ao não preencher campos individualmente
  it('CT04 - Mensagens de erro por campo não preenchido', () => {
    // Tenta cadastrar sem selecionar categoria
    cy.get('input[placeholder*="nome"]').type('Nome teste')
    cy.get('textarea').type('Descrição teste')
    cy.get('button').contains('Cadastrar').click()
    cy.contains('Preencha todos os campos!').should('exist')

    // Limpa e tenta sem nome
    cy.get('input[placeholder*="nome"]').clear()
    cy.get('select').select(0)
    cy.get('button').contains('Cadastrar').click()
    cy.contains('Preencha todos os campos!').should('exist')
  })

})