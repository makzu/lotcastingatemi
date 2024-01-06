/// <reference types="Cypress" />

context('Home Page', () => {
  // beforeEach(() => {
  //   cy.appScenario('basic')
  //   cy.login()
  // })

  it('Visits the home page', () => {
    cy.visit('/')
    cy.contains('Lot-Casting Atemi')
  })
})
