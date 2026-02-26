describe('Acessibilidade - Múltiplas Páginas', () => {
  const pages = ['/', '/blog', '/fluxo', '/livros', '/inscreva'];

  pages.forEach(page => {
    it(`${page} não deve ter violações de acessibilidade`, () => {
      cy.visit(page);
      cy.injectAxe();
      cy.checkA11y();
    });
  });
});
