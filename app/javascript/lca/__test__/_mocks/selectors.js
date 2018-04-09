// @flow
import { getPoolsAndRatings, getPenalties } from '../../selectors'
import type { fullChar } from '../../utils/propTypes/flow.js'

export const mockStateForCharacter = (character: fullChar) => ({
  entities: {
    characters: {
      [0]: {
        id: 0,
        ...character,
        weapons: [],
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
      [10]: { merit_name: 'unusual hide' },
      [11]: { merit_name: 'living spirit cultivation' },
      [12]: { merit_name: 'vital focus cultivation' },
      [13]: { merit_name: 'reserved' },
      [14]: { merit_name: 'reserved' },
      [15]: { merit_name: 'reserved' },
    },
    spells: {
      [1]:  { name: 'invulnerable skin of bronze', control: true },
      [2]:  { name: 'invulnerable skin of bronze' },
      [3]:  { name: 'death of obsidian butterflies' },
      [4]:  { name: 'impenetrable veil of night', control: true },
      [5]:  { name: 'rain of doom', control: true },
    },
  }
})

export const mockGetPoolsAndRatings = (character: fullChar) =>
  getPoolsAndRatings(mockStateForCharacter(character), 0)

export const mockGetPenalties = (character: fullChar) =>
  getPenalties(mockStateForCharacter(character), 0)
