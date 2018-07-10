/// <reference types="Cypress" />

context('Creating QCs', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()

    cy.visit('/content')
    cy.get('[data-cy=create-qc]').click()
  })

  it('Is successful', () => {
    cy.get('[name=name]').type('Test QC')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test QC').click()
    cy.contains('Test QC')
  })
})
