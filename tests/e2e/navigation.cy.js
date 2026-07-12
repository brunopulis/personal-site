describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to Agora', () => {
    cy.contains('a', 'Agora').click();
    cy.url().should('include', '/now/');
    cy.contains('h1', 'O que estou fazendo agora').should('be.visible');
  });

  it('navigates to Sobre', () => {
    cy.contains('a', 'Sobre').click();
    cy.url().should('include', '/about/');
    cy.contains('h1', 'Sobre mim').should('be.visible');
  });

  it('navigates to Contato', () => {
    cy.contains('a', 'Contato').click();
    cy.url().should('include', '/contact/');
    cy.contains('h1', 'Entre em contato').should('be.visible');
  });

  it('navigates to Blog', () => {
    cy.contains('a', 'Blog').click();
    cy.url().should('include', '/blog/');
    cy.contains('h1', 'Blog').should('be.visible');
  });
});
