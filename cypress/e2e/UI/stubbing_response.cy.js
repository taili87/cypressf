/// <reference types="cypress" />

/*
1- Intercept can take nother object - which we can use for stubbing response from our server.
For example we can specify a response body, so in our application when we look in to the details
of our GET API request, we see that the response is an array of object.

2- Pass second argument modifoes intercept request - with we were able to change response body by using 
the fixture and pull data from json files.
we can dynamically change just a part of the response data


*/

describe("Stubbing", () => {
  it("Stubbing response with GET", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/boards",
      },
      (req) => {req.reply((res)=>{
        res.body[0].starred = true;
        return res;
      })}
    ).as("boardList");

    cy.visit("/");
  });

  it("Stubbing response with a function() ", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/boards",
      },
      {
        fixture: "boards",
      }
    ).as("boardList");

    cy.visit("/");
  });

  it("Stubbing response with POST", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/boards",
      },
      {
        forceNetworkError: true,
      }
    ).as("createboard");

    cy.visit("/");
    // check network error

    cy.get("[data-cy=create-board]").click();
    cy.get("[data-cy=new-board-input]").type("basketball{enter}");
    cy.get("#errorMessage").should("be.visible");
  });
});
