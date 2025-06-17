describe('Fluxo Completo: Login -> Dashboard', () => {
  // URLs da aplicação
  const LOGIN_URL = 'http://localhost:3000/'
  const DASHBOARD_URL = 'http://localhost:3000/dashboard'

  // Função para login convencional
  const fazerLogin = () => {
    cy.visit(LOGIN_URL)
    cy.get('input[placeholder*="Digite seu email" i]').type('teste@teste.com')
    cy.get('input[placeholder*="Digite sua senha" i]').type('123456')
    cy.get('button').contains('Acessar').click()
  }

  it('CT01 - Login com credenciais válidas', () => {
    fazerLogin()
    
    // Verificações
    cy.url().should('eq', DASHBOARD_URL)
    cy.contains('h1', 'Últimos pedidos').should('be.visible')
  })

  it('CT02 - Verificação da lista de pedidos', () => {
    fazerLogin()

    // Verifica se existe lista
    cy.get('body').then(($body) => {
      if ($body.find('[class*="order"]').length > 0) {
        cy.log('Pedidos encontrados')
      } else {
        cy.contains('Não há pedidos abertos').should('exist')
      }
    })
  })

  it('CT03 - Atualização da lista', () => {
    fazerLogin()
    
    // Solução alternativa para clicar no botão de atualização
    cy.get('button').then(($buttons) => {
      const refreshButton = $buttons.filter((_, el) => 
        el.innerHTML.includes('Atualizar') || 
        el.querySelector('svg') !== null
      )
      
      if (refreshButton.length) {
        cy.wrap(refreshButton).click()
        cy.contains('Carregando...').should('not.exist')
      } else {
        throw new Error('Botão de atualização não encontrado')
      }
    })
  })
})