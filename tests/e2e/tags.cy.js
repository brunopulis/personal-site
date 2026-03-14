describe('Página de Tags', () => {
  beforeEach(() => {
    cy.visit('/tags/');
  });

  it('deve carregar a página de tags', () => {
    cy.get('body').should('be.visible');
    cy.get('h1').should('contain', 'Tags');
  });

  it('deve listar tags com contagem', () => {
    cy.get('ul').should('exist');
    cy.get('li').should('exist');
  });

  it('deve ter links para páginas de tags individuais', () => {
    cy.get('li a').first().should('have.attr', 'href').and('include', '/tags/');
  });
});
