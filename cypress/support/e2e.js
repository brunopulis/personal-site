import 'cypress-axe';
import './commands';


Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
