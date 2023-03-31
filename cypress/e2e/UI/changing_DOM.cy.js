/// <reference types="cypress" />

/*
 when we want to interact with our application, cypress will actual check whether the element
 we want to interact is actually actionable, if we want to by passe this check, we can , we just need
 to force the action or we can change the DOM elements by using invoke() functions
 we can reveal hided element or change different attributes suchs classes.
 -we can trigger different type of events by using trigger().

*/

describe("changing DOM", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("changing the DOM", () => {
    cy.get('[data-cy=star]').eq(0).invoke('show').click()// or .click({ force: true });
    //cy.get('[data-cy="task"]').eq(1).invoke('addClass', "nameof the class we need to add");
   // visibility of the elements display = none
    cy.get('[data-cy="board-item"]').trigger('mouseover');
    cy.get('[data-cy=star]').should('be.visible');

    cy.get('[data-cy="board-item"]').trigger('mouseout');
    cy.get('[data-cy=star]').should('not.be.visible');
  });
});
