describe('Blog page', () => {
  beforeEach(() => {
    cy.visit('/blog/');
    cy.injectAxe();
  });

  it('loads successfully', () => {
    const titulo = 'Blog';

    cy.contains('h1', titulo);
    cy.get('.blog-title').should('contain.text', titulo).and('be.visible');
  });

  it('shows the lede description', () => {
    const lede =
      'Artigos e conteúdos longos sobre acessibilidade, desenvolvimento web e a vida por trás da tela.';

    cy.get('.blog-lede');
    cy.get('.blog-lede').should('contain.text', lede).and('be.visible');
  });

  it('shows the total number of published posts', () => {
    cy.get('.blog-header .blog-count').invoke('text');

    cy.get('.blog-header .blog-count')
      .invoke('text')
      .then(texto => {
        const esperado = Number(texto.match(/(\d+)\s+artigos/)[1]);
        cy.get('.blog__post').should('have.length', esperado);
      });
  });

  it('links to the RSS feed', () => {
    const hrefFeed = '/feeds/blog/rss.xml';

    cy.get('.blog-rss');
    cy.get(`.blog-rss a[href="${hrefFeed}"]`).should('be.visible');
  });

  it('has archive sub-navigation', () => {
    const subnav = ['Categorias', 'Tags'];

    cy.get('.blog-subnav');

    cy.get('.blog-subnav-current')
      .should('have.attr', 'aria-current', 'true')
      .and('contain.text', 'Todas as postagens')
      .and('be.visible');
    subnav.forEach(label => {
      cy.get('.blog-subnav').contains('a', label).should('be.visible');
    });
  });

  it('shows the archive info', () => {
    cy.get('.blog-header .blog-count');

    cy.get('.blog-header .blog-count').should('contain.text', 'Arquivo completo').and('be.visible');
    cy.get('.blog-header .blog-count')
      .invoke('text')
      .should('match', /artigos publicados desde \d{4}/);
  });

  it('has jump-to-year links for each year section', () => {
    cy.get('.blog-jump-list a');

    cy.get('.blog-jump-list a')
      .its('length')
      .then(jumps => {
        cy.get('.blog-year').should('have.length', jumps);
      });
    cy.get('.blog-jump-list a').each($link => {
      const alvo = $link.attr('href');
      cy.get(alvo).should('exist');
    });
  });

  it('groups posts by year', () => {
    cy.get('.blog-year');

    cy.get('.blog-year').each($section => {
      cy.wrap($section).within(() => {
        cy.get('h2.blog-year-title').should('be.visible');
        cy.get('.blog__post').should('be.visible');
      });
    });
  });

  it('renders each post entry with date, title and link', () => {
    cy.get('.blog__post');

    cy.get('.blog__post').should('have.length.at.least', 1);
    cy.get('.blog__post').each($entry => {
      cy.wrap($entry).within(() => {
        cy.get('time.dt-published').should('be.visible');
        cy.get('h3.home-post-title a.u-url')
          .should('be.visible')
          .invoke('attr', 'href')
          .should('match', /^\/blog\//);
      });
    });
  });

  it('uses the expected microformats', () => {
    cy.get('.h-feed');

    cy.get('.h-feed').should('be.visible');
    cy.get('h1.blog-title.p-name').should('be.visible');
    cy.get('header a.u-url[aria-label="Blog"]').should('have.attr', 'href');
  });

  it('has no A11Y issues', () => {
    cy.checkA11y();
  });
});
