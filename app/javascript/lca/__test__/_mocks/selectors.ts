import { getPoolsAndRatings, getPenalties } from 'selectors'
import { Character } from 'types'

export const mockStateForCharacter = (character: Character) => ({
  entities: {
    current: {
      characters: {
        [0]: {
          id: 0,
          ...character,
          merits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          weapons: [1, 2, 3],
          spells: [1, 2, 3],
        },
      },
      merits: {
        [1]: { merit_name: 'ambidextrous' },
        [2]: { merit_name: 'danger sense' },
        [3]: { merit_name: 'fast reflexes' },
        [4]: { merit_name: 'fleet of foot' },
        [5]: { merit_name: 'mighty thew', rating: 2 },
        [6]: { merit_name: 'pain tolerance' },
        [7]: { merit_name: 'toxin resistance' },
        [8]: { merit_name: 'chameleon' },
        [9]: { merit_name: 'enhanced sense' },
        [10]: { merit_name: 'unusual hide', rating: 2 },
        [11]: { merit_name: 'living spirit cultivation' },
        [12]: { merit_name: 'vital focus cultivation' },
        [13]: { merit_name: 'hideous' },
        [14]: { merit_name: 'well-bred' },
        [15]: { merit_name: 'thin-blooded' },
      },
      spells: {
        [1]: { name: 'invulnerable skin of bronze', control: true },
        [2]: { name: 'impenetrable veil of night', control: true },
        [3]: { name: 'rain of doom', control: true },
      },
      weapons: {
        [1]: {
          name: 'light weapon',
          weight: 'light',
          attr: 'dexterity',
          damage_attr: 'strength',
          ability: 'melee',
          tags: ['melee', 'lethal'],
          character_id: 0,
        },
        [2]: {
          name: 'medium weapon',
          weight: 'medium',
          attr: 'dexterity',
          damage_attr: 'strength',
          ability: 'melee',
          tags: ['melee', 'lethal'],
          character_id: 0,
        },
        [3]: {
          name: 'heavy weapon',
          weight: 'heavy',
          attr: 'dexterity',
          damage_attr: 'strength',
          ability: 'melee',
          tags: ['melee', 'lethal'],
          character_id: 0,
        },
      },
      charms: {
        [1]: { keywords: ['excellency'], ability: 'archery' },
        [2]: { keywords: ['excellency'], ability: 'athletics' },
        [3]: { keywords: ['excellency'], ability: 'awareness' },
        [4]: { keywords: ['excellency'], ability: 'brawl' },
        [5]: { keywords: ['excellency'], ability: 'bureaucracy' },
        [6]: { keywords: ['excellency'], ability: 'craft' },
        [7]: { keywords: ['excellency'], ability: 'dodge' },
        [8]: { keywords: ['excellency'], ability: 'integrity' },
        [9]: { keywords: ['excellency'], ability: 'investigation' },
        [10]: { keywords: ['excellency'], ability: 'larceny' },
        [11]: { keywords: ['excellency'], ability: 'linguistics' },
        [12]: { keywords: ['excellency'], ability: 'lore' },
        [13]: { keywords: ['excellency'], ability: 'medicine' },
        [14]: { keywords: ['excellency'], ability: 'melee' },
        [15]: { keywords: ['excellency'], ability: 'occult' },
        [16]: { keywords: ['excellency'], ability: 'performance' },
        [17]: { keywords: ['excellency'], ability: 'presence' },
        [18]: { keywords: ['excellency'], ability: 'resistance' },
        [19]: { keywords: ['excellency'], ability: 'ride' },
        [20]: { keywords: ['excellency'], ability: 'sail' },
        [21]: { keywords: ['excellency'], ability: 'socialize' },
        [22]: { keywords: ['excellency'], ability: 'stealth' },
        [23]: { keywords: ['excellency'], ability: 'survival' },
        [24]: { keywords: ['excellency'], ability: 'thrown' },
        [25]: { keywords: ['excellency'], ability: 'war' },
        [26]: { charm_type: 'MartialArts' },
      },
    },
  },
})

export const mockGetPoolsAndRatings = (character: Character) =>
  getPoolsAndRatings(mockStateForCharacter(character), 0)

export const mockGetPenalties = (character: Character) =>
  getPenalties(mockStateForCharacter(character), 0)
