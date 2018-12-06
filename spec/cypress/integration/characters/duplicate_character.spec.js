/// <reference types="Cypress" />

const visitAndDupe = () => {
  cy.visit('/characters/1')
  cy.get('[data-cy=character-menu]').click()
  cy.contains('Duplicate').click()
  cy.url().should('include', '/characters/2')
}

context('Duplicating Characters', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()
  })

  it('works for Mortals', () => {
    cy.appFactories([
      ['create', 'character', { player_id: 1, name: 'Test Mortal' }],
    ])
    visitAndDupe()
    cy.contains('Test Mortal (Duplicate)')
  })

  it('works for Solars', () => {
    cy.appFactories([
      ['create', 'solar_character', { player_id: 1, name: 'Test Solar' }],
    ])
    visitAndDupe()
    cy.contains('Test Solar (Duplicate)')
  })

  it('works for DBs', () => {
    cy.appFactories([
      ['create', 'dragonblood_character', { player_id: 1, name: 'Test Deeb' }],
    ])
    visitAndDupe()
    cy.contains('Test Deeb (Duplicate)')
  })

  it('works for Custom Ability Exalts', () => {
    cy.appFactories([
      [
        'create',
        'custom_ability_character',
        { player_id: 1, name: 'Test Ability' },
      ],
    ])
    visitAndDupe()
    cy.contains('Test Ability (Duplicate)')
  })

  it('works for Custom Attribute Exalts', () => {
    cy.appFactories([
      [
        'create',
        'custom_attribute_character',
        { player_id: 1, name: 'Test Attribute' },
      ],
    ])
    visitAndDupe()
    cy.contains('Test Attribute (Duplicate)')
  })

  it('works for Custom Essence Exalts', () => {
    cy.appFactories([
      [
        'create',
        'custom_essence_character',
        { player_id: 1, name: 'Test Essence' },
      ],
    ])
    visitAndDupe()
    cy.contains('Test Essence (Duplicate)')
  })
})
