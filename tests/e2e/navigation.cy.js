describe('Navegação Principal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve carregar a página inicial', () => {
    cy.get('body').should('be.visible');
    cy.get('h1').should('exist');
  });

  it('deve ter o título correto', () => {
    cy.title().should('not.be.empty');
  });

  it('deve ter menu de navegação', () => {
    cy.get('nav').should('exist');
  });

  it('deve ter link para o blog', () => {
    cy.get('nav').contains('Blog').should('have.attr', 'href', '/blog/');
  });

  it('deve ter link para sobre', () => {
    cy.get('nav').contains('Sobre').should('have.attr', 'href', '/about/');
  });
});
