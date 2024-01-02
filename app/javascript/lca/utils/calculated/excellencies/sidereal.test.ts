import { baselineCharacter } from '@/testMocks'
import { Character, Charm } from '@/types'
import { siderealExcellencyAbils } from './sidereal'

describe('siderealExcellencyAbils', () => {
  test('Caste and Fav Abilities with at least one dot, plus Abilities with at least one Charm', () => {
    const character: Partial<Character> = {
      ...baselineCharacter,
      abil_awareness: 4,
      caste_abilities: ['awareness', 'bureaucracy', 'melee'],
      favored_abilities: ['athletics', 'awareness', 'craft'],
    }
    const charms = [
      { name: 'First Charm', ability: 'archery' },
      {
        name: 'Second Charm',
        ability: 'bureaucracy',
      },
      { name: 'Third Charm', ability: 'melee' },
    ]
    const result = siderealExcellencyAbils(
      character as Character,
      charms as Charm[],
    )
    const expectedResult = ['awareness', 'archery', 'bureaucracy', 'melee']
    expect(result).toEqual(expectedResult)
  })
})
