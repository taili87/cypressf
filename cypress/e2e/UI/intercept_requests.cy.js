/// <reference types="cypress" />

/*
  we can combine UI and API test into one single E2E test.
  - We use intercept() to match http request and give it an alias and make sure cypress is excecuting
  command in proper order - so we first wait http to give us response and them we proceed with other options
  that way we reduce the change of flekeness and fault positive test.
  when we have a request intercepted,we can write test for it - we can validate the status code - request body
  or response body.

  Intercept http request can be tested.
*/

describe("Intercepts API", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "/api/reset",
    });
  });

  it("Intercept request", () => {
    // wait for the server to give us response first - add cy.intercept() first to get the api call first
    cy.intercept({
      method: "GET",
      url: "/api/boards",
    }).as("CreateBoard");
    cy.visit("/");
    cy.get("[data-cy=create-board]").click();
    cy.get("[data-cy=new-board-input]").type("Create Board {enter}");
    cy.get('[data-cy="add-list"]').type("MAISON");
    cy.get('[data-cy="save"]').click();

    cy.wait("@CreateBoard").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=board-item]").should("have.length", 0);
  });

  it("Intercept request using then() ", () => {
    // wait for the server to give us response first - add cy.intercept() first to get the api call first
    cy.intercept({
      method: "POST",
      url: "/api/boards",
    }).as("maison");
    cy.visit("/");
    cy.get("[data-cy=create-board]").click();
    cy.get("[data-cy=new-board-input]").type("la maison{enter}");
    //cy.get('[data-cy="add-list"]').type('MAISON');
    //cy.get('[data-cy="save"]').click();

    cy.wait("@maison")
      .then((board) => {
      expect(board.response.statusCode).to.eq(201);
      cy.log(board.request.body.name)
      expect(board.request.body.name).to.eq('la maison');
    });
  });
});
