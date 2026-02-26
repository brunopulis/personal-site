describe('Testes de Acessibilidade - Home', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should be a title element', () => {
    cy.title();
  });
  it('não deve ter violações de acessibilidade na página inicial', () => {
    cy.checkA11y();
  });

  it('deve ter bom contraste de cores', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
  });

  it('deve ter imagens com alt text', () => {
    cy.checkA11y(null, {
      rules: {
        'image-alt': { enabled: true },
      },
    });
  });

  it('deve ter labels para inputs', () => {
    cy.checkA11y(null, {
      rules: {
        label: { enabled: true },
      },
    });
  });
});
