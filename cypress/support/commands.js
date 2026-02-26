Cypress.Commands.add('checkA11yWithReport', (selector = null) => {
  cy.injectAxe();
  cy.checkA11y(selector, null, violations => {
    if (violations.length > 0) {
      cy.log(`⚠️  Encontradas ${violations.length} violações`);
      violations.forEach(v => {
        cy.log(`❌ ${v.id}: ${v.impact}`);
      });
    } else {
      cy.log('✅ Nenhuma violação encontrada');
    }
  });
});
