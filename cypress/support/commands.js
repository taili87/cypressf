// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.get('[data-cy="login-menu"]').click();
      cy.get('[data-cy="login-email"]').type(username);
      cy.get('[data-cy="login-password"]').type(password);
      cy.get('[data-cy="login"]').click();
      cy.url().should("contain", "/");
    },
    {
      validate() {
        cy.request("/").its("status").should("eq", 200);
      },
    }
  );
});

Cypress.Commands.add("addBoard", (input) => {
  cy.get("[data-cy=create-board]").click();
  cy.get("[data-cy=new-board-input]").type(input + "{enter}");
});

Cypress.Commands.add("take", (input) => {
  cy.get(`[data-cy=${input}]`);
});

Cypress.Commands.add("take", { prevSubject: "optional" }, (sybject, input) => {
  if (subject) {
    cy.wrap(subject).find(`[data-cy=${input}]`);
  } else {
    cy.get(`[data-cy=${input}]`);
  }
  cy.get(`[data-cy=${input}]`);
});
