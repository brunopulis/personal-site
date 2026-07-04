describe('Blog page', () => {
  beforeEach(() => {
    cy.visit('/blog/');
  });

  it('loads successfully', () => {
    cy.contains('h1', 'Blog').should('be.visible');
  });

  it('displays post list', () => {
    cy.get('article').should('have.length.at.least', 1);
  });

  it('each post has a title link', () => {
    cy.get('article a[href*="/blog/"]').should('have.length.at.least', 1);
  });
});
