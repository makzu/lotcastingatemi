/// <reference types="Cypress" />

context('Creating Battlegroups', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()

    cy.visit('/content')
    cy.get('[data-cy=create-battlegroup]').click()
  })

  it('Is successful', () => {
    cy.get('[name=name]').type('Test BG')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test BG').click()
    cy.contains('Test BG')
  })
})
