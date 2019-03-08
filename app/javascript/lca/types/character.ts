import { PlayerAsset } from './_lib'

export type Ability =
  | 'archery'
  | 'athletics'
  | 'awareness'
  | 'brawl'
  | 'bureaucracy'
  | 'craft'
  | 'dodge'
  | 'integrity'
  | 'investigation'
  | 'larceny'
  | 'linguistics'
  | 'lore'
  | 'martial_arts'
  | 'medicine'
  | 'melee'
  | 'occult'
  | 'performance'
  | 'presence'
  | 'resistance'
  | 'ride'
  | 'sail'
  | 'socialize'
  | 'stealth'
  | 'survival'
  | 'thrown'
  | 'war'

export type Attribute =
  | 'strength'
  | 'dexterity'
  | 'stamina'
  | 'charisma'
  | 'manipulation'
  | 'appearance'
  | 'perception'
  | 'intelligence'
  | 'wits'

export interface XpLogEntry {
  label: string
  points: number
}

export type CharacterType =
  | 'Character'
  | 'SolarCharacter'
  | 'DragonbloodCharacter'
  | 'LunarCharacter'
  | 'CustomAbilityCharacter'
  | 'CustomAttributeCharacter'
  | 'CustomEssenceCharacter'

export interface Character extends PlayerAsset {
  name: string
  description: string
  anima_display: string
  lore_background: string
  portrait_link: string
  native_language: string
  caste: string
  type: CharacterType
  caste_attributes: Attribute[]
  favored_attributes: Attribute[]
  caste_abilities: Ability[]
  favored_abilities: Ability[]
  xp_log: XpLogEntry[]
  xp_total: number
  xp_log_solar: XpLogEntry[]
  xp_solar_total: number
  equipment: string
  notes: string
  pinned: boolean
  hidden: boolean
  merits: number[]
  weapons: number[]
}
