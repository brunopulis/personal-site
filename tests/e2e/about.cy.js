describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about/');
  });

  it('loads successfully', () => {
    cy.contains('h1', 'Sobre mim').should('be.visible');
  });

  it('has h-card microformat', () => {
    cy.get('.h-card').should('exist');
  });
});
