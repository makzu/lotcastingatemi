declare var gen: Record<string, $TSFixMe>
declare var check: $TSFixMeFunction

require('jasmine-check').install()

import { genSolar } from '../../_mocks/'
import { mockGetPoolsAndRatings } from '../../_mocks/selectors'
import type { Character } from 'utils/flow-types'
const mockCharacter = gen.object(genSolar)
describe('ratings', () => {
  describe('evasion', () => {
    check.it(
      'works',
      {
        times: 10,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).evasion
        expect(pool.attributeRating).toEqual(character.attr_dexterity)
        expect(pool.abilityRating).toEqual(character.abil_dodge)
        expect(pool.raw).toBeGreaterThanOrEqual(1)
        expect(pool.total).toBeGreaterThanOrEqual(0)
        expect(pool.specialties).toBeDefined()
        expect(pool.excellency).toBeDefined()
        expect(pool.excellencyCost).toBeDefined()
      },
    )

    check.it(
      'includes names correctly',
      {
        times: 1,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).evasion
        expect(pool.name).toEqual('Evasion')
        expect(pool.attribute).toEqual('dexterity')
        expect(pool.ability).toEqual('dodge')
        expect(pool.rating).toBe(true)
      },
    )
  })

  describe('resolve', () => {
    check.it(
      'works',
      {
        times: 10,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).resolve
        expect(pool.attributeRating).toEqual(character.attr_wits)
        expect(pool.abilityRating).toEqual(character.abil_integrity)
        expect(pool.raw).toBeGreaterThanOrEqual(1)
        expect(pool.total).toBeGreaterThanOrEqual(0)
        expect(pool.specialties).toBeDefined()
        expect(pool.excellency).toBeDefined()
        expect(pool.excellencyCost).toBeDefined()
      },
    )

    check.it(
      'includes names correctly',
      {
        times: 1,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).resolve
        expect(pool.name).toEqual('Resolve')
        expect(pool.attribute).toEqual('wits')
        expect(pool.ability).toEqual('integrity')
        expect(pool.rating).toBe(true)
      },
    )
  })

  describe('guile', () => {
    check.it(
      'works',
      {
        times: 10,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).guile
        expect(pool.attributeRating).toEqual(character.attr_manipulation)
        expect(pool.abilityRating).toEqual(character.abil_socialize)
        expect(pool.raw).toBeGreaterThanOrEqual(1)
        expect(pool.total).toBeGreaterThanOrEqual(0)
        expect(pool.specialties).toBeDefined()
        expect(pool.excellency).toBeDefined()
        expect(pool.excellencyCost).toBeDefined()
      },
    )

    check.it(
      'includes names correctly',
      {
        times: 1,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).guile
        expect(pool.name).toEqual('Guile')
        expect(pool.attribute).toEqual('manipulation')
        expect(pool.ability).toEqual('socialize')
        expect(pool.rating).toBe(true)
      },
    )
  })

  describe('appearanceRating', () => {
    check.it(
      'works',
      {
        times: 10,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).appearance
        expect(pool.attributeRating).toEqual(character.attr_appearance)
        expect(pool.total).toEqual(character.attr_appearance)
        expect(pool.bonus).toBeDefined()
      },
    )

    check.it(
      'includes names correctly',
      {
        times: 1,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).appearance
        expect(pool.name).toEqual('Appearance')
        expect(pool.attribute).toEqual('Appearance')
        expect(pool.bonus).toEqual([
          {
            label: 'hideous',
            bonus: 0,
          },
        ])
      },
    )
  })

  describe('soak', () => {
    check.it(
      'works',
      {
        times: 10,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).soak
        expect(pool.name).toEqual('Soak')
        expect(pool.soak).toBe(true)
        expect(pool.natural).toEqual(character.attr_stamina)
        expect(pool.armored).toBeGreaterThanOrEqual(0)
        expect(pool.armored).toBeLessThanOrEqual(11)
        expect(pool.total).toBeGreaterThanOrEqual(character.attr_stamina)
        expect(pool.bonus).toBeDefined()
      },
    )

    check.it(
      'includes names correctly',
      {
        times: 1,
      },
      mockCharacter,
      (character: Character) => {
        const pool = mockGetPoolsAndRatings(character).soak
        expect(pool.name).toEqual('Soak')
        expect(pool.soak).toBe(true)
      },
    )
  })
})
