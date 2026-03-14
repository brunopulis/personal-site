describe('Página do Blog', () => {
  beforeEach(() => {
    cy.visit('/blog/');
  });

  it('deve carregar a página do blog', () => {
    cy.get('body').should('be.visible');
  });

  it('deve listar posts', () => {
    cy.get('article').should('exist');
  });

  it('deve ter link para posts individuais', () => {
    cy.get('article a').first().should('have.attr', 'href');
  });

  it('deve ter paginação ou link para mais posts', () => {
    cy.get('nav').should('exist');
  });
});
