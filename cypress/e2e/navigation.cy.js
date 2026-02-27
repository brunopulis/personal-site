describe('Navegação Global', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve ter menu de navegação', () => {
    cy.get('nav').should('exist');
  });

  it('deve ter skip-link para acessibilidade', () => {
    cy.get('a[href="#main"], a[href="#content"], a.skip-link').first().should('exist');
  });

  it('deve ter logo/link para home', () => {
    cy.get('nav a').first().should('have.attr', 'href', '/');
  });

  it('deve ter links para páginas principais', () => {
    cy.get('nav').should('contain', 'Newsletter').or('contain', 'newsletter');
  });

  it('deve navegar para página newsletter', () => {
    cy.get('nav a[href*="newsletter"], a[href*="/newsletter"]').first().click();
    cy.url().should('include', '/newsletter');
  });

  it('deve navegar para página games', () => {
    cy.get('nav a[href*="games"], a[href*="/games"]').first().click({ force: true });
    cy.url().should('include', '/games');
  });

  it('deve navegar para página talks', () => {
    cy.get('nav a[href*="talks"], a[href*="/talks"]').first().click({ force: true });
    cy.url().should('include', '/talks');
  });

  it('deve ter footer com links', () => {
    cy.get('footer').should('exist');
  });
});
