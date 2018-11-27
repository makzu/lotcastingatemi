/// <reference types="Cypress" />

context('Creating Battlegroups', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()
  })

  it('works from scratch', () => {
    cy.visit('/content')
    cy.get('[data-cy=create-battlegroup]').click()
    cy.get('[name=name]').type('Test BG')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test BG').click()
    cy.contains('Test BG')
  })

  it('works when duplicating', () => {
    cy.appFactories([
      ['create', 'battlegroup', { player_id: 1, name: 'McTesterson Family' }],
    ])

    cy.visit('/battlegroups/1')
    cy.get('[data-cy=character-menu]').click()
    cy.contains('Duplicate').click()

    cy.url().should('include', '/battlegroups/2')
    cy.contains('McTesterson Family (Duplicate)')
  })

  it('works when creating from QCs', () => {
    cy.appFactories([
      ['create', 'qc', { player_id: 1, name: 'Testy McTesterson' }],
    ])

    cy.visit('/qcs/1')
    cy.get('[data-cy=character-menu]').click()
    cy.contains('Create Battlegroup').click()

    cy.url().should('include', '/battlegroups/')
    cy.contains('Testy McTesterson (Battlegroup)')
  })
})
