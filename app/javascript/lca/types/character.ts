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

export interface Form {
  form: string
  qc_id: number
}

export interface Character extends PlayerAsset {
  type: string
  name: string
  caste: string
  merits: number[]
  caste_attributes: Attribute[]
  favored_attributes: Attribute[]
  caste_abilities: Ability[]
  favored_abilities: Ability[]
  totem: string
  tell: string
  forms: Form[]
  sort_order: number
  pinned: boolean
  hidden: boolean
}
