describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about/');
  });

  it('loads successfully', () => {
    cy.contains('h1', 'Bruno Pulis').should('be.visible');
  });

  it('contains bio information', () => {
    cy.get('main').should('contain.text', 'Bruno');
  });

  it('has h-card microformat', () => {
    cy.get('.h-card').should('exist');
  });
});
