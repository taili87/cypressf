/// <reference types="cypress" />

describe('UI test with API', ()=>{
beforeEach(()=>{
    cy.visit("/");
})
    it("Intercepts", ()=>{
        
        cy.intercept({
            method:'POST',
            url: '/api/boards'
        }).as('boardCreate')
        cy.get("[data-cy='create-board']").click();
        cy.get('[data-cy=new-board-input]').type('New board{enter}');

        cy.wait('@boardCreate').then(board =>{
            expect(board.response.statusCode).eq(201);
            // verify the request 
            expect(board.request.body.name).eq('New board');
        })

    })

    it('change response body', ()=>{
        // change the response body - intercept commands can take 2 arguments and there are object.
        cy.intercept({
            method:'POST',
            url:'/api/boards'
        },
        {
            body:[]
        }
        ).as('matchedUrl');
        //cy.wait('@matchedUrl')
        

    })

    it('change response status', ()=>{
        //Change response status where server get 500 - give user a good error message
        cy.intercept({
            method:'POST',
            url:'/api/boards'
        },
        {
            forceNetworkError:true 
        }
        ).as('matchedUrl');

        cy.get("[data-cy='create-board']").click();
        cy.get('[data-cy=new-board-input]').type('New board{enter}');

        cy.get('#errorMessage').should('be.visible'); // validate the error message


    })

    it('change response body dynamically', ()=>{

        cy.intercept({
            method:'GET',
            url:'/api/boards'
        },
        (req)=>{
            //change the request dynamicaaly by using reply()
            req.reply(res=>{
                res.body[0].name = "Hello Manila"; // first object of the body and set to string
                return res.body;
            })
        }
        ).as('matchedUrl');

    })

    it.only('change request headers', ()=>{
        // intercept all http request and set the authorize inside the headers
        cy.intercept({
            url:'**'
        },(headers)=>{
            headers['Authorization'] = 'Bearer $2a$10$ND5m3PW6GFMVflrEG4u8CeWD1i3eYqnaqi5URc3DlnFAsfw5iLW2m'
        }).as('matchedUrl');
        //cy.wait('@matchedUrl');

    })

    
})