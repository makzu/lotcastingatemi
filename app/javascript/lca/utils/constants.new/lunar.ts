// import { Character } from '@/types/character'
// import { LunarCharacter } from './character'
import {
  STRENGTH,
  DEXTERITY,
  STAMINA,
  CHARISMA,
  MANIPULATION,
  APPEARANCE,
  PERCEPTION,
  INTELLIGENCE,
  WITS,
} from './attributes'

export const FULL_MOON = 'full moon'
export const CHANGING_MOON = 'changing moon'
export const NO_MOON = 'no moon'
export const CASTELESS = 'casteless'

export const LUNAR_CASTES = [
  FULL_MOON,
  CHANGING_MOON,
  NO_MOON,
  CASTELESS,
] as const
export type LunarCastes = (typeof LUNAR_CASTES)[number]

const FULL_MOON_ATTRIBUTES = [STRENGTH, DEXTERITY, STAMINA] as const
const CHANGING_MOON_ATTRIBUTES = [CHARISMA, MANIPULATION, APPEARANCE] as const
const NO_MOON_ATTRIBUTES = [PERCEPTION, INTELLIGENCE, WITS] as const

export const LUNAR_CASTE_ATTRIBUTES = {
  FULL_MOON: FULL_MOON_ATTRIBUTES,
  CHANGING_MOON: CHANGING_MOON_ATTRIBUTES,
  NO_MOON: NO_MOON_ATTRIBUTES,
  CASTELESS: [],
} as const

// type LimitedTuple<T> = [] | [T] | [T, T]

// export interface IFullMoon extends LunarCharacterType {
//   caste: typeof FULL_MOON
//   caste_attributes: LimitedTuple<(typeof FULL_MOON_ATTRIBUTES)[number]>
// }

// export interface IChangingMoon extends LunarCharacterType {
//   caste: typeof CHANGING_MOON
//   caste_attributes: LimitedTuple<(typeof CHANGING_MOON_ATTRIBUTES)[number]>
// }

// export interface INoMoon extends LunarCharacterType {
//   caste: typeof NO_MOON
//   caste_attributes: LimitedTuple<(typeof NO_MOON_ATTRIBUTES)[number]>
// }

// export interface LunarCharacterType extends Character {
//   type: typeof LunarCharacter
//   caste: (typeof LUNAR_CASTES)[number]
//   aspect: false
//   exalt_type: 'lunar'
// }
