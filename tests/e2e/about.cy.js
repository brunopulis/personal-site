describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about/');
    cy.injectAxe();
  });

  it('loads successfully', () => {
    const titulo = 'Sobre mim';

    cy.contains('h1', titulo);
    cy.get('h1.p-name').should('contain.text', titulo).and('be.visible');
  });

  it('shows the intro paragraph', () => {
    const intro = 'Sou Bruno Pulis, consultor e desenvolvedor focado em acessibilidade.';

    cy.get('.e-content p');
    cy.get('.e-content p').first().should('contain.text', intro).and('be.visible');
  });

  it('has the expected section headings', () => {
    const secoes = ['Minha missão', 'O que eu faço', 'Como cheguei aqui', 'O que me guia', 'Fora da tela'];

    cy.get('.e-content h2');
    secoes.forEach(secao => {
      cy.get('.e-content').contains('h2', secao).should('be.visible');
    });
  });

  it('links to the portfolio', () => {
    const hrefPortfolio = 'https://brunopulis.dev.br';

    cy.get('.e-content');
    cy.get(`.e-content a[href="${hrefPortfolio}"]`).should('be.visible');
  });

  it('lists projects with external links', () => {
    const projetos = [
      {label: 'Awesome A11y', href: 'https://github.com/brunopulis/awesome-a11y-br'},
      {label: 'Awesome Cypress', href: 'https://github.com/brunopulis/awesome-cypress'},
      {label: 'Siglas Corporativas', href: 'https://siglas-corporativas.vercel.app/'},
      {label: 'XPath vs CSS Selectors', href: 'https://github.com/brunopulis/v0-xp-ath-vs-css-selectors'}
    ];

    cy.get('.e-content');
    projetos.forEach(({label, href}) => {
      cy.get(`.e-content a[href="${href}"]`).should('be.visible').and('contain.text', label);
    });
  });

  it('shows the last modified info', () => {
    cy.get('.e-content');

    cy.get('.e-content')
      .contains('p', /Última modificação:/)
      .should('be.visible');
  });

  it('uses the expected microformats', () => {
    cy.get('.h-entry');

    cy.get('article.h-entry').should('be.visible');
    cy.get('h1.p-name').should('be.visible');
    cy.get('header a.u-url').should('have.attr', 'href');
    cy.get('a.u-uid').should('have.attr', 'href');
    cy.get('.p-author.h-card').within(() => {
      cy.get('a.p-name[rel="author"]').should('be.visible');
      cy.get('img.u-photo').should('have.attr', 'src');
    });
  });

  it('has no A11Y issues', () => {
    cy.checkA11y();
  });
});
