///<reference types="Cypress"/>
/*To make autocomplete word we can create a .d.ts definition file to get autocomplete*/
describe("Custom command", () => {
  beforeEach(() => {
    cy.request("POST", "/api/reset");
  });

  it("customer commands test", () => {
    cy.visit("/");
    cy.addBoard("Groceries");
  });

  it("customer commands Bannanas", () => {
    cy.visit("/");
    cy.addBoard("Bannanas");
  });

  it("customer commands Apple", () => {
    cy.visit("/");

    cy.addBoard("Apples");
  });

  it("customer commands customLocator", () => {
    cy.visit("/");
    cy.take("create-board").click();
    cy.take("new-board-input").type("Hello" + "{enter}");
  });
});
