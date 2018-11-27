/// <reference types="Cypress" />

context('Creating QCs', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()
  })

  it('Works from scratch', () => {
    cy.visit('/content')
    cy.get('[data-cy=create-qc]').click()

    cy.get('[name=name]').type('Test QC')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test QC').click()
    cy.contains('Test QC')
  })

  it('works when duplicating', () => {
    cy.appFactories([
      ['create', 'qc', { player_id: 1, name: 'Testy McTesterson' }],
    ])

    cy.visit('/qcs/1')
    cy.get('[data-cy=character-menu]').click()
    cy.contains('Duplicate').click()

    cy.url().should('include', '/qcs/2')
    cy.contains('Testy McTesterson (Duplicate)')
  })
})
