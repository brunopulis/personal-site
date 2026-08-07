describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('loads successfully', () => {
    cy.contains('Bruno Pulis').should('be.visible');
  });

  it('No A11Y issues', () => {
    cy.checkA11y();
  });

  it('has working navigation', () => {
    cy.get('nav a').should('have.length.at.least', 3);
  });

  it('links to blog page', () => {
    cy.contains('a', 'Blog').should('be.visible');
  });

  it('links to privacy page', () => {
    cy.contains('a', 'Privacidade').should('be.visible');
  });
});
