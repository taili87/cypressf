/// <reference types="cypress" />


describe("Cooking Login", () => {
    beforeEach(() => {
     
      cy.visit("/");
    });
  
    it.skip("login with preseve cookies", () => {

      cy.session(email, () => {
      cy.get('[data-cy="login-menu"]').click();
      cy.get('[data-cy="login-email"]').type('mister@gmail.com');
      cy.get('[data-cy="login-password"]').type('abc12345');
      cy.get('[data-cy="login"]').click();

    })

      cy.session(username, () => {
        cy.request({
          method: 'POST',
          url: '/',
          body: { username, password },
        }).then(({ body }) => {
          window.localStorage.setItem('trello_token', body.token)
        })
      })
    });

    it("login with cookies token", () => {
        cy.setCookie('trello_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2ODAxMjYxMzQsImV4cCI6MTY4MDEyOTczNCwic3ViIjoiMiJ9.F64pUwwUvxHDYNm--IMYonWqXEoltswKGTMcUDfGi8M');
        cy.reload();
        cy.get('[data-cy="logged-user"]').should('be.visible');
      });

      it("login with username and password", () => {
        cy.get('[data-cy="login-menu"]').click();
        cy.get('[data-cy="login-email"]').type('mister@gmail.com');
        cy.get('[data-cy="login-password"]').type('abc12345');
        cy.get('[data-cy="login"]').click();
      })
  
    
  });