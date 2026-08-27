const PAGES = [
  {path: '/accessibility/', heading: 'Declaração de Acessibilidade'},
  {path: '/archive/', heading: 'Arquivo'},
  {path: '/blogroll/', heading: 'Blogroll'},
  {path: '/bookshelf/', heading: 'Meus livros'},
  {path: '/colophon/', heading: 'Colophon'},
  {path: '/disability/', heading: 'Minhas deficiências'},
  {path: '/donate/', heading: 'Apoie meu trabalho'},
  {path: '/explore/', heading: 'Explorar'},
  {path: '/feeds/', heading: 'Feeds'},
  {path: '/giving/', heading: 'Causas que eu apoio'},
  {path: '/likes/', heading: 'Likes'},
  {path: '/links/', heading: 'Links'},
  {path: '/newsletters/', heading: 'Newsletters'},
  {path: '/notes/', heading: 'Notas'},
  {path: '/now/', heading: 'Agora'},
  {path: '/poetry/', heading: 'Poemas'},
  {path: '/portfolio/', heading: 'Portfolio'},
  {path: '/posse/', heading: 'Estratégia POSSE'},
  {path: '/privacy/', heading: 'Privacidade'},
  {path: '/projects/', heading: 'Projetos'},
  {path: '/resume/', heading: null},
  {path: '/search/', heading: 'Busca'},
  {path: '/stats/', heading: null},
  {path: '/tags/', heading: 'Tags'},
  {path: '/uses/', heading: 'O que eu uso'},
  {path: '/values/', heading: 'Meus valores'},
  {path: '/watching/', heading: 'Filmes e Séries'},
  {path: '/watching/movies/', heading: 'Filmes'},
  {path: '/watching/shows/', heading: 'Séries'},
  {path: '/why/', heading: 'Por que esse site existe?'}
];

const SPECIAL_ASSERTIONS = {
  '/resume/': () => {
    cy.contains('p', 'Engenheiro de Acessibilidade').should('be.visible');
  },
  '/stats/': () => {
    cy.contains('h1', 'Estatísticas Gerais').should('be.visible');
  }
};

describe('Site pages', () => {
  PAGES.forEach(({path, heading}) => {
    describe(`${path}`, () => {
      beforeEach(() => {
        cy.visit(path);
        cy.injectAxe();
      });

      it('renders the expected heading', () => {
        if (heading) {
          cy.contains('h1', heading).should('be.visible');
        } else {
          SPECIAL_ASSERTIONS[path]();
        }
      });

      it('has no accessibility violations', () => {
        cy.checkA11y();
      });
    });
  });
});
