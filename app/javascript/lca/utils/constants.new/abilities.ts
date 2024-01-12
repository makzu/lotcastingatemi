export const ARCHERY = 'archery'
export const ATHLETICS = 'athletics'
export const AWARENESS = 'awareness'
export const BRAWL = 'brawl'
export const BUREAUCRACY = 'bureaucracy'
export const CRAFT = 'craft'
export const DODGE = 'dodge'
export const INTEGRITY = 'integrity'
export const INVESTIGATION = 'investigation'
export const LARCENY = 'larceny'
export const LINGUISTICS = 'linguistics'
export const LORE = 'lore'
export const MARTIAL_ARTS = 'martial_arts'
export const MEDICINE = 'medicine'
export const MELEE = 'melee'
export const OCCULT = 'occult'
export const PERFORMANCE = 'performance'
export const PRESENCE = 'presence'
export const RESISTANCE = 'resistance'
export const RIDE = 'ride'
export const SAIL = 'sail'
export const SOCIALIZE = 'socialize'
export const STEALTH = 'stealth'
export const SURVIVAL = 'survival'
export const THROWN = 'thrown'
export const WAR = 'war'

export const ABILITIES = [
  ARCHERY,
  ATHLETICS,
  AWARENESS,
  BRAWL,
  BUREAUCRACY,
  CRAFT,
  DODGE,
  INTEGRITY,
  INVESTIGATION,
  LARCENY,
  LINGUISTICS,
  LORE,
  MARTIAL_ARTS,
  MEDICINE,
  MELEE,
  OCCULT,
  PERFORMANCE,
  PRESENCE,
  RESISTANCE,
  RIDE,
  SAIL,
  SOCIALIZE,
  STEALTH,
  SURVIVAL,
  THROWN,
  WAR,
] as const

export type Ability = (typeof ABILITIES)[number]
