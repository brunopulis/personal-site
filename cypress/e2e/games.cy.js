describe('Jogos', () => {
  beforeEach(() => {
    cy.visit('/jogos');
  });

  it('deve carregar página de games', () => {
    cy.url().should('include', '/jogos');
  });

  it('deve ter título da página', () => {
    cy.get('h1, title').should('not.be.empty');
  });

  it('deve listar jogos', () => {
    cy.get('article, .game-card, .game, ul li').should('have.length.greaterThan', 0);
  });

  it('deve ter imagens dos jogos', () => {
    cy.get('img').should('have.length.greaterThan', 0);
  });

  it('deve ter título dos jogos', () => {
    cy.get('h2, h3, .title').first().should('not.be.empty');
  });

  it('deve ter descrição dos jogos', () => {
    cy.get('p, .description, .excerpt').first().should('exist');
  });

  it('deve navegar para detalhes do jogo', () => {
    cy.get('article a, .game-card a, a[href*="/jogos/"]').first().click();
    cy.get('h1, article').should('exist');
  });
});
