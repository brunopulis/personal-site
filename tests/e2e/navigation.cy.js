describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to Blog', () => {
    cy.contains('a', 'Blog').click();
    cy.url().should('include', '/blog/');
    cy.contains('h1', 'Blog').should('be.visible');
  });

  it('navigates to Notas', () => {
    cy.contains('a', 'Notas').click();
    cy.url().should('include', '/notes/');
    cy.contains('h1', 'Notas').should('be.visible');
  });

  it('navigates to Contato', () => {
    cy.contains('a', 'Contato').click();
    cy.url().should('include', '/contact/');
    cy.contains('h1', 'Entre em contato').should('be.visible');
  });
});
