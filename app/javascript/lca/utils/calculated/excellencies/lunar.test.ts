import { baselineCharacter } from '@/testMocks'
import type { Character } from '@/types/character'
import type { Charm } from '@/types/traits/charm'
import type { Ability } from '@/utils/constants.new/abilities'
import type { Attribute } from '@/utils/constants.new/attributes'
import LunarExcellency, { lunarExcellencyAbils } from './lunar'

/* Fangs at the Gate, p. 142 */
test('Caste and Favored Attrs at 3+ or with 1+ Charm', () => {
  const character: Partial<Character> = {
    ...baselineCharacter,
    attr_strength: 4,
    attr_intelligence: 3,
    caste_attributes: ['strength', 'dexterity'],
    favored_attributes: ['intelligence', 'wits'],
  }
  const charms: Partial<Charm>[] = [{ name: 'First Charm', ability: 'wits' }]
  expect(
    lunarExcellencyAbils(character as Character, charms as Charm[]),
  ).toEqual(['strength', 'intelligence', 'wits'])
})

test('Other Attrs at 5 or with 2+ Charms', () => {
  const character: Partial<Character> = {
    ...baselineCharacter,
    attr_stamina: 5,
    caste_attributes: ['strength', 'dexterity'],
    favored_attributes: ['intelligence', 'wits'],
  }
  const charms: Partial<Charm>[] = [
    { name: 'First Charm', ability: 'appearance' },
    { name: 'Second Charm', ability: 'appearance' },
  ]
  expect(
    lunarExcellencyAbils(character as Character, charms as Charm[]),
  ).toEqual(['stamina', 'appearance'])
})

describe('LunarExcellency', () => {
  it('should return correct value', () => {
    const character: Partial<Character> = {
      ...baselineCharacter,
    }
    const attribute: Attribute = 'strength' // Replace with actual attribute
    const ability: Ability = 'archery' // Replace with actual ability
    const staticRating = false // Replace with actual value
    const stunt = false // Replace with actual value
    const result = LunarExcellency(
      character as Character,
      attribute,
      ability,
      staticRating,
      stunt,
    )
    // Replace with expected result
    const expectedResult = 2
    expect(result).toEqual(expectedResult)
  })
})
