export const STRENGTH = 'strength'
export const DEXTERITY = 'dexterity'
export const STAMINA = 'stamina'
export const CHARISMA = 'charisma'
export const MANIPULATION = 'manipulation'
export const APPEARANCE = 'appearance'
export const PERCEPTION = 'perception'
export const INTELLIGENCE = 'intelligence'
export const WITS = 'wits'

export const ATTRIBUTES = [
  STRENGTH,
  DEXTERITY,
  STAMINA,
  CHARISMA,
  MANIPULATION,
  APPEARANCE,
  PERCEPTION,
  INTELLIGENCE,
  WITS,
] as const

export type Attribute = (typeof ATTRIBUTES)[number]
