describe('Contact page', () => {
  beforeEach(() => {
    cy.visit('/contact/');
  });

  it('loads successfully', () => {
    cy.contains('h1', 'Entre em contato').should('be.visible');
  });

  it('has social media links', () => {
    cy.contains('a', 'GitHub').should('be.visible');
    cy.contains('a', 'Mastodon').should('be.visible');
    cy.contains('a', 'LinkedIn').should('be.visible');
  });
});
