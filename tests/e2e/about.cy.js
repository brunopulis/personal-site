describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about/');
    cy.injectAxe();
  });

  it('loads successfully', () => {
    cy.contains('h1', 'Sobre mim').should('be.visible');
  });

  it('No A11Y issues', () => {
    cy.checkA11y();
  });

  it('has h-card microformat', () => {
    cy.get('.h-card').should('exist');
  });
});
