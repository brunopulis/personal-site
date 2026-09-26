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
    const descricao = 'Compartilhando pensamentos e conversas longe do ruído das redes sociais.';

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
    cy.get('.h-feed');

    cy.get('.h-feed.home').should('be.visible');
    cy.get('h1.home-greeting').should('be.visible');
    cy.get('.home-lede-copy.p-summary').should('be.visible');
    cy.get('.home-post.h-entry').should('have.length.at.least', 1);
    cy.get('.home-post.h-entry').each($post => {
      cy.wrap($post).within(() => {
        cy.get('time.dt-published').should('have.attr', 'datetime');
        cy.get('h3.home-post-title.p-name a.u-url').should('have.attr', 'href');
      });
    });
  });

  it('has no A11Y issues', () => {
    cy.checkA11y();
  });
});
