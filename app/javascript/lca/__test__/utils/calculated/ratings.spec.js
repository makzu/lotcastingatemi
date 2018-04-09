// @flow
declare var gen: Object
declare var check: Function

require('jasmine-check').install()

import { genCharacter } from '../../_mocks/'
import {
  evasion, /*resolve, guile,*/ appearanceRating, soak,
} from '../../../utils/calculated/_ratings.js'
import type { fullChar } from '../../../utils/propTypes/flow.js'

const mockCharacter = gen.object(genCharacter)
const mockMerits = gen.array(gen.string)
const mockPenalties = gen.object({ mobility: gen.posInt, wound: gen.posInt, onslaught: gen.posInt })

describe('ratings', () => {
  describe('evasion', () => {
    check.it('works', { times: 10 }, mockCharacter, mockMerits, mockPenalties, mockMerits,
      (character: fullChar, merits: Array<string>, penalties: Object, charmAbils: Array<string>) => {
        const pool = evasion(character, merits, penalties, charmAbils)
        expect(pool.attributeRating).toEqual(character.attr_dexterity)
        expect(pool.abilityRating).toEqual(character.abil_dodge)
        expect(pool.raw).toBeGreaterThanOrEqual(1)
        expect(pool.total).toBeGreaterThanOrEqual(0)
        expect(pool.specialties).toBeDefined()
        expect(pool.excellency).toBeDefined()
        expect(pool.excellencyCost).toBeDefined()
      })

    check.it('includes names correctly', { times: 1 }, mockCharacter, mockMerits, mockPenalties, mockMerits,
      (character: fullChar, merits: Array<string>, penalties: Object, charmAbils: Array<string>) => {
        const pool = evasion(character, merits, penalties, charmAbils)
        expect(pool.name).toEqual('Evasion')
        expect(pool.attribute).toEqual('dexterity')
        expect(pool.ability).toEqual('dodge')
        expect(pool.rating).toBe(true)
      })
  })
  describe('appearanceRating', () => {
    check.it('works', { times: 10 }, mockCharacter, mockMerits,
      (character: fullChar, merits: Array<string>) => {
        const pool = appearanceRating(character, merits)
        expect(pool.attributeRating).toEqual(character.attr_appearance)
        expect(pool.total).toEqual(character.attr_appearance)
        expect(pool.meritBonus).toBeDefined()
      })

    check.it('includes names correctly', { times: 1 }, mockCharacter, mockMerits,
      (character: fullChar, merits: Array<string>) => {
        const pool = appearanceRating(character, merits)
        expect(pool.name).toEqual('Appearance')
        expect(pool.attribute).toEqual('Appearance')
      })

    check.it('includes Hideous', { times: 2 }, mockCharacter, mockMerits,
      (character: fullChar, merits: Array<string>) => {
        const pool = appearanceRating(character, merits.concat('hideous0'))
        expect(pool.meritBonus).toEqual([{ label: 'hideous', bonus: 0 }])
      })
  })

  describe('soak', () => {
    check.it('works', { times: 10 }, mockCharacter, mockMerits, gen.array(gen.string),
      (character: fullChar, merits: Array<string>, spells: Array<string>) => {
        const pool = soak(character, merits, spells)
        expect(pool.name).toEqual('Soak')
        expect(pool.soak).toBe(true)
        expect(pool.natural).toEqual(character.attr_stamina)
        expect(pool.armored).toBeGreaterThanOrEqual(0)
        expect(pool.armored).toBeLessThanOrEqual(11)
        expect(pool.total).toBeGreaterThanOrEqual(character.attr_stamina)
        expect(pool.meritBonus).toBeDefined()
      })

    check.it('includes names correctly', { times: 1 }, mockCharacter, mockMerits, gen.array(gen.string),
      (character: fullChar, merits: Array<string>, spells: Array<string>) => {
        const pool = soak(character, merits, spells)
        expect(pool.name).toEqual('Soak')
        expect(pool.soak).toBe(true)
      })
  })
})
