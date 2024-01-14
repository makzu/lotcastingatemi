import { baselineCharacter } from '@/testMocks'
import type { Character, Charm } from '@/types'
import { dbExcellencyAbils } from './dragonblooded'

const fakeCharms: Partial<Charm>[] = [
  { name: 'First Charm', ability: 'archery', keywords: [] },
  { name: 'Second Charm', ability: 'bureaucracy', keywords: ['excellency'] },
  { name: 'Third Charm', ability: 'melee', keywords: [] },
]

describe('dbExcellencyAbils', () => {
  test('Abilities with a charm with the `excellency` keyword', () => {
    const character: Partial<Character> = {
      ...baselineCharacter,
    }
    const charms: Partial<Charm>[] = fakeCharms // Replace with actual value
    const result = dbExcellencyAbils(character as Character, charms as Charm[])
    // Replace with expected result
    const expectedResult = ['bureaucracy']
    expect(result).toEqual(expectedResult)
  })
})
