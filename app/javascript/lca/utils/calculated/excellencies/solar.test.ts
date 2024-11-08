import { baselineCharacter } from '@/testMocks'
import type { Character, Charm } from '@/types'
import { solarExcellencyAbils } from './solar'

describe('solarExcellencyAbils', () => {
  test('Caste and Fav Abilities with at least one dot, plus Abilities with at least one Charm', () => {
    const character: Partial<Character> = {
      ...baselineCharacter,
      abil_awareness: 4,
      caste_abilities: ['awareness', 'bureaucracy', 'melee'],
      favored_abilities: ['athletics', 'craft'],
    }
    const charms = [
      { name: 'First Charm', ability: 'archery' },
      {
        name: 'Second Charm',
        ability: 'bureaucracy',
      },
      { name: 'Third Charm', ability: 'melee' },
    ]
    const result = solarExcellencyAbils(
      character as Character,
      charms as Charm[],
    )
    const expectedResult = ['awareness', 'archery', 'bureaucracy', 'melee']
    expect(result).toEqual(expectedResult)
  })
})