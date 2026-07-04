describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads successfully', () => {
    cy.contains('Bruno Pulis').should('be.visible');
  });

  it('has working navigation', () => {
    cy.get('nav a').should('have.length.at.least', 3);
  });

  it('links to blog page', () => {
    cy.contains('a', 'Blog').should('be.visible');
  });

  it('links to contact page', () => {
    cy.contains('a', 'Contato').should('be.visible');
  });
});
