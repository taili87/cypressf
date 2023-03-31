/// <reference types="cypress" />

describe("API testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Api testing with Post method", () => {
    cy.request({
      method: "POST",
      url: "/api/boards",
      body: {
        name: "Name one",
      },
    }).then((board) => {
      expect(board.status).to.eq(201);
      expect(board.body.starred).to.be.false;
      assert.isNumber(board.body.id);
    });
  });
  
});
