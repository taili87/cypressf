/// <reference types="cypress" />

/*
 #1: Make multiple assertions using then() to write multiple assertion in one but we need to remember
     then() is not retry, if you need to retry our assertion we need to use should().

     you can customer logic inside your functions: passing argument to our customer command will help
     to write logic, error message or other kind of conditions.
*/

describe("UI test with API", () => {
  beforeEach(() => {
    cy.visit("/board/18303460281");
  });

  it("Assertion in orders from index 0 to N", () => {
    cy.get("[data-cy=task]").then((items) => {
      expect(items[0]).to.contain.text("footballeur");
      expect(items[1]).to.contain("referee");
      expect(items[2]).to.contain("coach");
    });
  });

  it("Assertion in differents order - shuffle", () => {
    cy.get("[data-cy=task]").should((items) => {
      expect(items[0]).to.contain.text("footballeur");
      expect(items[1]).to.contain("referee");
      expect(items[2]).to.contain("coach");
    });
  });

  it("Assertion with the numbers of items", () => {
    cy.get("[data-cy=task]").should((items) => {
      if (items.length !== 2) {
        throw new Error("Not enough elements, please retry again!");
      }
      expect(items[0]).to.contain.text("footballeur");
      expect(items[1]).to.contain("referee");
      expect(items[2]).to.contain("coach");
    });
  });
});
