///<reference types="Cypress"/>

declare namespace Cypress {
    interface Chainable{
        //js doc
        /**
         * Create a anew board via UI
         * @example
         * cy.addBoard('board name)
         */
        addBoard()
    }
}