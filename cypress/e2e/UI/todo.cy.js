/// <reference types="cypress" />

describe("UI test with API", () => {
  beforeEach(() => {
    cy.visit("/board/48395630673");
  });

  it("Chaining commands", () => {
    cy.contains('I am going to buy milk first and letter breads');
   // cy.get('[data-cy=list]').eq(1).contains('I am going to buy milk first and letter breads')
  });
  
});
