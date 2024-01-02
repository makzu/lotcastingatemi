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

export const LUNAR_CASTE_ATTRIBUTES = {
  FULL_MOON: [STRENGTH, DEXTERITY, STAMINA],
  CHANGING_MOON: [CHARISMA, MANIPULATION, APPEARANCE],
  NO_MOON: [PERCEPTION, INTELLIGENCE, WITS],
  CASTELESS: [],
} as const

export type FullMoonCasteAttributes = typeof LUNAR_CASTE_ATTRIBUTES.FULL_MOON
