/// <reference types="cypress" />
/*
 Request() command enables you to send  http request and look at the documentation or if
 we do not have  the documentation we can watch http request through the devtool in the browser.
 APIs can help to create test data.
*/
describe("Cooking Login", () => {

    beforeEach(()=>{
        cy.request({
            method:'POST',
            url:'/api/reset'
        })
    })
  it.only("Sending request", () => {
    cy.visit("/");
    cy.request({
      method: "POST",
      url: "/api/boards",
      body: {
        name: "Board create - Football",
      },
    });
  });

  it("Update request body", () => {
    cy.visit("/");
    cy.request({
      method: "PATCH",
      url: "/api/boards/13119207521",
      body: {
        name: "Board create - Tennis",
      },
    });
  });

  it("Update request body", () => {
    cy.visit("/");
    cy.request({
      method: "DELETE",
      url: "/api/boards/13119207521"
    });
  });

});
