/// <reference types="Cypress" />

context('Creating Characters', () => {
  beforeEach(() => {
    cy.appScenario('basic')
    cy.login()

    cy.visit('/content')
    cy.get('[data-cy=create-character]').click()
  })

  it('Is able to create Mortals', () => {
    cy.get('[name=name]').type('Test Mortal')
    cy.get('[data-cy=select-exalt-type]').click()
    cy.get('[data-value=Character]').click()
    cy.get('[data-cy=submit]').click()

    cy.contains('Test Mortal').click()
    cy.contains('Essence 1 Mortal')
  })

  it('Is able to create Solars', () => {
    cy.get('[name=name]').type('Test Solar')

    cy.get('[data-cy=select-solar-caste]').click()
    cy.get('[data-value=twilight]').click()

    cy.get('[data-cy=submit]').click()

    cy.contains('Test Solar').click()
    cy.contains('Essence 1 Twilight Caste Solar')
  })

  it('Is able to create DBs', () => {
    cy.get('[name=name]').type('Test DB')
    cy.get('[data-cy=select-exalt-type]').click()
    cy.get('[data-value=DragonbloodCharacter]').click()
    cy.get('[data-cy=select-db-aspect]').click()
    cy.get('[data-value=air]').click()
    cy.get('[data-cy=submit]').click()

    cy.contains('Test DB').click()
    cy.contains('Essence 2 Air Aspect Dragon-Blooded')
  })

  it('Is able to create Custom Ability Exalts', () => {
    cy.get('[name=name]').type('Test Ability Exigent')
    cy.get('[data-cy=select-exalt-type]').click()
    cy.get('[data-value=CustomAbilityCharacter]').click()
    cy.get('[name=caste]').type('Exemplar')
    cy.get('[name=exalt_type]')
      .clear()
      .type('Ability Exigent')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test Ability Exigent').click()
    cy.contains('Essence 1 Exemplar Caste Ability Exigent')
  })

  it('Is able to create Custom Attribute Exalts', () => {
    cy.get('[name=name]').type('Test Attribute Exigent')
    cy.get('[data-cy=select-exalt-type]').click()
    cy.get('[data-value=CustomAttributeCharacter]').click()
    cy.get('[name=caste]').type('Exemplar')
    cy.get('[name=exalt_type]')
      .clear()
      .type('Attribute Exigent')
    cy.get('[data-cy=submit]').click()

    cy.contains('Test Attribute Exigent').click()
    cy.contains('Essence 1 Exemplar Caste Attribute Exigent')
  })
})
