import { PlayerAsset, Weight } from './_lib'
import { WithSharedStats } from './shared'

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

export interface Form {
  form: string
  qc_id: number
}

export type ExaltType =
  | 'Character'
  | 'SolarCharacter'
  | 'DragonbloodCharacter'
  | 'LunarCharacter'
  | 'CustomAbilityCharacter'
  | 'CustomAttributeCharacter'
  | 'CustomEssenceCharacter'

export interface Character extends PlayerAsset, WithSharedStats {
  name: string
  description: string
  anima_display: string
  lore_background: string
  portrait_link: string
  native_language: string
  type: ExaltType
  caste: string
  aspect: boolean
  exalt_type: string
  caste_attributes: Attribute[]
  favored_attributes: Attribute[]
  caste_abilities: Ability[]
  favored_abilities: Ability[]
  supernal_ability: Ability
  xp_log: XpLogEntry[]
  xp_total: number
  xp_log_solar: XpLogEntry[]
  xp_solar_total: number
  bp_log: XpLogEntry[]
  equipment: string
  notes: string
  totem: string
  tell: string
  forms: Form[]
  merits: number[]
  weapons: number[]
  attr_strength: number
  attr_dexterity: number
  attr_stamina: number
  attr_charisma: number
  attr_manipulation: number
  attr_appearance: number
  attr_perception: number
  attr_intelligence: number
  attr_wits: number
  abil_archery: number
  abil_athletics: number
  abil_awareness: number
  abil_brawl: number
  abil_bureaucracy: number
  abil_dodge: number
  abil_integrity: number
  abil_investigation: number
  abil_larceny: number
  abil_linguistics: number
  abil_lore: number
  abil_medicine: number
  abil_melee: number
  abil_occult: number
  abil_performance: number
  abil_presence: number
  abil_resistance: number
  abil_ride: number
  abil_sail: number
  abil_socialize: number
  abil_stealth: number
  abil_survival: number
  abil_thrown: number
  abil_war: number
  abil_craft: CraftRating[]
  abil_martial_arts: MARating[]
  specialties: Specialty[]
  armor_name: string
  armor_weight: 'unarmored' | Weight
  armor_is_artifact: boolean
  armor_tags: string[]
  bonus_hardness: number
  bonus_soak: number
  bonus_mobility_penalty: number
  xp_craft_silver: number
  xp_craft_gold: number
  xp_craft_white: number
  anima_powers: any[]
  limit_trigger: string
  limit: number

  excellency: string
  excellency_stunt: string
  excellencies_for: string[]
  charms: number[]
  martial_arts_charms: number[]
  evocations: number[]
  spirit_charms: number[]
  poisons: number[]
}

export interface CraftRating {
  craft: string
  rating: number
}

export interface MARating {
  style: string
  rating: number
}

export interface Specialty {
  ability: Ability
  context: string
}
