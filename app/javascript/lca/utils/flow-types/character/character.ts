import type { Character as TSCharacter } from 'types'

export interface withAttributes {
  attr_strength: number
  attr_dexterity: number
  attr_stamina: number
  attr_charisma: number
  attr_manipulation: number
  attr_appearance: number
  attr_perception: number
  attr_intelligence: number
  attr_wits: number
}
export interface withAbilities {
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
  abil_martial_arts: {
    style: string
    rating: number
  }[]
  abil_craft: {
    craft: string
    rating: number
  }[]
}
export interface withArmorStats {
  armor_name: string
  armor_weight: 'unarmored' | 'light' | 'medium' | 'heavy'
  armor_is_artifact: boolean
  armor_tags: string[]
  bonus_soak: number
  bonus_hardness: number
  bonus_mobility_penalty: number
}

/** @deprecated */
export interface specialty {
  ability: string
  context: string
}
export interface withSpecialties {
  specialties: specialty[]
}
export interface xpLog {
  label: string
  points: number
}
export interface form {
  form: string
  qc_id: number
}

/** @deprecated use Character from 'types' instead */
export type Character = TSCharacter
