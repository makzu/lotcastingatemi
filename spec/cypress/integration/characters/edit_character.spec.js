/// <reference types="Cypress" />

context('Editing a Character', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()
  })

  // TODO: replace [type=text] with real data-cy (or other) attributes
  it('Allows adding/editing List Attributes', () => {
    cy.visit('/characters/1/edit')

    cy.get('[data-cy=add-abil_craft]').click()
    cy.get('[data-cy=abil_craft-list-editor] [type=text]')
      .clear()
      .type('Test Craft')

    cy.get('[data-cy=add-abil_martial_arts]').click()
    cy.get('[data-cy=abil_martial_arts-list-editor] [type=text]')
      .clear()
      .type('Test MA Style')

    cy.get('[data-cy=add-principles]').click()
    cy.get('[data-cy=principles-list-editor] [data-cy=intimacy-subject]')
      .clear()
      .type('Test Principle')

    cy.get('[data-cy=add-ties]').click()
    cy.get('[data-cy=ties-list-editor] [data-cy=intimacy-subject]')
      .clear()
      .type('Test Tie')

    cy.get('[data-cy=add-resources]').click()
    cy.get('[data-cy=resources-list-editor] [type=text]')
      .clear()
      .type('Test Resource')
    cy.get('[data-cy=add-specialties]').click()
    cy.get('[data-cy=specialties-list-editor] [type=text]')
      .clear()
      .type('Test Specialty')

    cy.get('#edit-character-button').click()

    cy.contains('Test Craft')
    cy.contains('Test MA Style')
    cy.contains('Test Principle')
    cy.contains('Test Tie')
    cy.contains('Test Resource')
    cy.contains('Test Specialty')
  })
})
