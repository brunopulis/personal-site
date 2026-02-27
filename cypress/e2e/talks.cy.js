describe('Talks', () => {
  beforeEach(() => {
    cy.visit('/talks');
  });

  it('deve carregar página de talks', () => {
    cy.url().should('include', '/talks');
  });

  it('deve ter título da página', () => {
    cy.get('h1, title').should('not.be.empty');
  });

  it('deve listar palestras', () => {
    cy.get('article, .talk-card, .talk, ul li').should('have.length.greaterThan', 0);
  });

  it('deve ter título das palestras', () => {
    cy.get('h2, h3, .title').first().should('not.be.empty');
  });

  it('deve ter descrição das palestras', () => {
    cy.get('p, .description, .excerpt').first().should('exist');
  });

  it('deve ter link para eventos/conferências', () => {
    cy.get('a[href*="event"], a[href*="conf"], a[href*="meetup"]').should('exist');
  });

  it('deve ter link do YouTube/Video', () => {
    cy.get('a[href*="youtube"], a[href*="youtu.be"], a[href*="video"]').should('exist');
  });

  it('deve navegar para detalhes da talk', () => {
    cy.get('article a, .talk-card a, a[href*="/talks/"]').first().click();
    cy.get('h1, article').should('exist');
  });
});
