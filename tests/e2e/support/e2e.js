import 'cypress-axe';

let axeSource = null;

Cypress.Commands.overwrite('injectAxe', () => {
  const inject = source => cy.window({log: false}).then(win => win.eval(source));

  if (axeSource) {
    return inject(axeSource);
  }

  const fileName = require.resolve('axe-core/axe.min.js');
  return cy.readFile(fileName, {timeout: 15000}).then(source => {
    axeSource = source;
    return inject(axeSource);
  });
});
