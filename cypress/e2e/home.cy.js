const options = {
  viewportHeight: 1336,
  viewportWidth: 1024
};

describe('Home', options, () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should be a title element', () => {
    cy.title();
  })
  describe('Verifica se itens recentes são exibidos', () => {
    it('deve exibir a seção de grid com 3 colunas', () => {
      cy.get('.grid.gap-8.md\\:grid-cols-3.mb-16')
        .should('be.visible')
        .should('have.css', 'display', 'grid');
    });

    it('deve conter exatamente 3 itens de stream', () => {
      cy.get('.grid.gap-8.md\\:grid-cols-3.mb-16 > article.stream-card--book, .grid.gap-8.md\\:grid-cols-3.mb-16 > article.stream-card--music')
        .should('have.length', 3);
    });

    it('deve exibir os 3 itens com classe de card correto', () => {
      cy.get('.grid.gap-8.md\\:grid-cols-3.mb-16 > article')
        .each(($article, index) => {
          cy.wrap($article)
            .should('have.class', 'rounded-2xl')
            .should('have.class', 'bg-gray-50')
            .should('have.class', 'p-8')
            .should('have.class', 'group')
            .should('have.class', 'hover:shadow-xl');
        });
    });
  });

  describe('Verifica se os itens do blog são exibidos', () => {
    it('Título da sessão de blog é exibido', () => {
      cy.contains('Últimos artigos').should('be.visible');
    });

    it('deve exibir a seção de grid com uma coluna', () => {
      cy.get('.grid.gap-6.md\\:grid-cols-1')
        .should('be.visible')
        .should('have.css', 'display', 'grid');
    });

    it('deve conter exatamente 6 itens de blog', () => {
      cy.get('li.py-4').should('have.length', 6);
    });
  })
})