// @flow
import { getPoolsAndRatings, getPenalties } from '../../selectors'
import type { fullChar } from '../../utils/propTypes/flow.js'

export const mockStateForCharacter = (character: fullChar) => ({ entities: {
  current: {
    characters: {
      [0]: {
        id: 0,
        ...character,
        merits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        weapons: [1, 2, 3],
        spells: [1, 2, 3],
      }
    },
    merits: {
      [1]:  { merit_name: 'ambidextrous' },
      [2]:  { merit_name: 'danger sense' },
      [3]:  { merit_name: 'fast reflexes' },
      [4]:  { merit_name: 'fleet of foot' },
      [5]:  { merit_name: 'mighty thew', rating: 2 },
      [6]:  { merit_name: 'pain tolerance' },
      [7]:  { merit_name: 'toxin resistance' },
      [8]:  { merit_name: 'chameleon' },
      [9]:  { merit_name: 'enhanced sense' },
      [10]: { merit_name: 'unusual hide', rating: 2 },
      [11]: { merit_name: 'living spirit cultivation' },
      [12]: { merit_name: 'vital focus cultivation' },
      [13]: { merit_name: 'hideous' },
    },
    spells: {
      [1]:  { name: 'invulnerable skin of bronze', control: true },
      [2]:  { name: 'impenetrable veil of night', control: true },
      [3]:  { name: 'rain of doom', control: true },
    },
    weapons: {
      [1]:  { name: 'light weapon',  weight: 'light',  attr: 'dexterity', damage_attr: 'strength', ability: 'melee', tags: ['melee', 'lethal'], character_id: 0,  },
      [2]:  { name: 'medium weapon', weight: 'medium', attr: 'dexterity', damage_attr: 'strength', ability: 'melee', tags: ['melee', 'lethal'], character_id: 0,  },
      [3]:  { name: 'heavy weapon',  weight: 'heavy',  attr: 'dexterity', damage_attr: 'strength', ability: 'melee', tags: ['melee', 'lethal'], character_id: 0,  },
    },
    charms: {
      [1]:  { ability: 'archery',       keywords: ['excellency'] },
      [2]:  { ability: 'athletics',     keywords: ['excellency'] },
      [3]:  { ability: 'awareness',     keywords: ['excellency'] },
      [4]:  { ability: 'brawl',         keywords: ['excellency'] },
      [5]:  { ability: 'bureaucracy',   keywords: ['excellency'] },
      [6]:  { ability: 'craft',         keywords: ['excellency'] },
      [7]:  { ability: 'dodge',         keywords: ['excellency'] },
      [8]:  { ability: 'integrity',     keywords: ['excellency'] },
      [9]:  { ability: 'investigation', keywords: ['excellency'] },
      [10]: { ability: 'larceny',       keywords: ['excellency'] },
      [11]: { ability: 'linguistics',   keywords: ['excellency'] },
      [12]: { ability: 'lore',          keywords: ['excellency'] },
      [13]: { ability: 'medicine',      keywords: ['excellency'] },
      [14]: { ability: 'melee',         keywords: ['excellency'] },
      [15]: { ability: 'occult',        keywords: ['excellency'] },
      [16]: { ability: 'performance',   keywords: ['excellency'] },
      [17]: { ability: 'presence',      keywords: ['excellency'] },
      [18]: { ability: 'resistance',    keywords: ['excellency'] },
      [19]: { ability: 'ride',          keywords: ['excellency'] },
      [20]: { ability: 'sail',          keywords: ['excellency'] },
      [21]: { ability: 'socialize',     keywords: ['excellency'] },
      [22]: { ability: 'stealth',       keywords: ['excellency'] },
      [23]: { ability: 'survival',      keywords: ['excellency'] },
      [24]: { ability: 'thrown',        keywords: ['excellency'] },
      [25]: { ability: 'war',           keywords: ['excellency'] },
      [26]: { charm_type: 'MartialArts' },
    }
  }
}})

export const mockGetPoolsAndRatings = (character: fullChar) =>
  getPoolsAndRatings(mockStateForCharacter(character), 0)

export const mockGetPenalties = (character: fullChar) =>
  getPenalties(mockStateForCharacter(character), 0)
