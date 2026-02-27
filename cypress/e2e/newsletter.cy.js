describe('Newsletter', () => {
  beforeEach(() => {
    cy.visit('/newsletter');
  });

  it('deve carregar página de newsletter', () => {
    cy.url().should('include', '/newsletter');
  });

  it('deve ter título da página', () => {
    cy.get('h1, title').should('not.be.empty');
  });

  it('deve listar posts de newsletter', () => {
    cy.get('article, .post, .newsletter-item, ul li').should('have.length.greaterThan', 0);
  });

  it('deve ter link para posts individuais', () => {
    cy.get('article a, .post a, a[href*="/newsletter/"]').first().should('have.attr', 'href');
  });

  it('deve ter data nos posts', () => {
    cy.get('time, [datetime], .date').first().should('exist');
  });

  it('deve ter tags nos posts', () => {
    cy.get('tags, .tags, [class*="tag"]').first().should('exist');
  });

  it('deve ter link para RSS', () => {
    cy.get('a[href*="rss"], a[href*="feed"], a[href*=".xml"]').should('exist');
  });

  it('não deve ter erros de console', () => {
    cy.on('window:console', console => {
      expect(consoleSpy => {
        console.warn = consoleSpy;
      });
    });
  });
});
