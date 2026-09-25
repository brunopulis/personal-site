describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('loads successfully', () => {
    const nomeDoSite = 'Bruno Pulis';

    cy.contains(nomeDoSite);
    cy.get('.home-greeting').should('contain.text', nomeDoSite).and('be.visible');
  });

  it('has working navigation', () => {
    const menuLinks = ['Sobre', 'Blog', 'Notas', 'Livros', 'Filmes e Séries', 'Cursos', 'Busca'];

    cy.get('nav');
    menuLinks.forEach(label => {
      cy.get('nav').contains('a', label).should('be.visible');
    });
  });

  it('links to blog page from navigation', () => {
    const hrefBlog = '/blog/';

    cy.get('nav').contains('a', 'Blog');
    cy.get(`nav a[href="${hrefBlog}"]`).should('be.visible');
  });

  it('links to privacy page in footer', () => {
    const hrefPrivacidade = '/privacy/';

    cy.get('footer').contains('a', 'Privacidade');
    cy.get(`footer a[href="${hrefPrivacidade}"]`).should('be.visible');
  });

  it('shows the hero greeting with author description', () => {
    const descricao =
      'Aqui compartilho pensamentos, descobertas e conversas longe do ruído das redes sociais.';

    cy.get('[aria-labelledby="hero-title"]');
    cy.get('.home-lede-copy').should('contain.text', descricao).and('be.visible');
  });

  it('has follow links in the lede', () => {
    const hrefs = ['/about/', '/colophon/', '/uses/'];

    cy.get('.home-follow');
    hrefs.forEach(href => {
      cy.get(`.home-follow a[href="${href}"]`).should('be.visible');
    });
  });

  it('shows the content index section', () => {
    const itens = [
      {href: '/blog/', nome: 'Artigos', desc: 'reflexões longas, sem pressa'},
      {href: '/notes/', nome: 'Notas', desc: 'registros curtos do cotidiano'},
      {href: '/poetry/', nome: 'Poesia', desc: 'versos e silêncios'},
      {href: '/bookshelf/', nome: 'Livros', desc: 'a estante aberta'},
      {href: '/watching/', nome: 'Filmes e séries', desc: 'o que assisti e ficou'},
      {href: '/likes/', nome: 'Favoritos', desc: 'links guardados com carinho'}
    ];

    cy.get('.home-index-list');

    cy.contains('h2', 'O que mora aqui').should('be.visible');
    cy.get('.home-index-row').should('have.length', itens.length);
    itens.forEach(({href, nome, desc}) => {
      cy.get(`a.home-index-row[href="${href}"]`)
        .should('be.visible')
        .within(() => {
          cy.contains('.home-index-name', nome);
          cy.contains('.home-index-desc', desc);
          cy.get('.home-index-count')
            .invoke('text')
            .then(txt => {
              expect(txt).to.match(/\d+/);
            });
        });
    });
  });

  it('shows recent posts section with up to five articles', () => {
    const maxPosts = 5;

    cy.contains('h2', 'Últimos artigos');

    cy.get('.home-post').should('have.length.at.most', maxPosts);
    cy.get('.home-post').each($post => {
      cy.wrap($post).within(() => {
        cy.get('time.dt-published').should('be.visible');
        cy.get('.home-post-title a').should('be.visible');
      });
    });
    cy.contains('a', 'Ver todos os artigos').should('be.visible');
  });

  it('exposes skip link to main content on focus', () => {
    cy.get('.skip-link').focus();

    cy.get('.skip-link').should('be.visible').and('have.attr', 'href', '#main-content');
  });

  it('uses the expected microformats', () => {
    const arrowCount = 6;

    cy.get('.h-feed');

    cy.get('.h-feed.home').should('be.visible');
    cy.get('.home-index-arrow').should('have.length', arrowCount);
    cy.get('.home-index-arrow').each($arrow => {
      expect($arrow).to.have.attr('aria-hidden', 'true');
    });
  });

  it('has no A11Y issues', () => {
    cy.checkA11y();
  });
});
