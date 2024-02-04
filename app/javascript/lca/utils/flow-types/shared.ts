// Type defs for traits shared between characters and QCs

/** @deprecated use '@/types' instead */
export interface Poison {
  name: string
  penalty: number
  id: number
  poisonable_type: string
  poisonable_id: number
  sort_order: number
}

/** @deprecated use '@/types' instead */
export interface withBasicInfo {
  id: number
  player_id: number
  chronicle_id?: number
  name: string
  description: string
  essence: number
  hidden: boolean
  pinned: boolean
  public: boolean
  sort_order: number
  chronicle_sort_order: number
  type: string // TODO: constrain this, e.g. 'qc' | 'battlegroup' | 'Character' | 'SolarCharacter'
}

/** @deprecated use '@/types' instead */
export interface withCombatInfo {
  initiative: number
  onslaught: number
  in_combat: boolean
  has_acted: boolean
  poisons: number[]
}

/** @deprecated use '@/types' instead */
export interface withHealthLevels {
  health_level_0s: number
  health_level_1s: number
  health_level_2s: number
  health_level_4s: number
  health_level_incap: number
  damage_bashing: number
  damage_lethal: number
  damage_aggravated: number
}

/** @deprecated use '@/types' instead */
export interface intimacy {
  subject: string
  rating: number
  hidden: boolean | null | undefined
}

/** @deprecated use '@/types' instead */
export interface withIntimacies {
  principles: intimacy[]
  ties: intimacy[]
}

/** @deprecated use '@/types' instead */
export interface committment {
  pool: 'Personal' | 'Peripheral'
  label: string
  motes: number
  scenelong?: boolean
}

/** @deprecated use '@/types' instead */
export interface withMotePool {
  motes_personal_total: number
  motes_personal_current: number
  motes_peripheral_total: number
  motes_peripheral_current: number
  motes_committed: committment[]
  anima_level: number
  // anima_display: string
  is_sorcerer: boolean
  sorcerous_motes: number
}

/** @deprecated use '@/types' instead */
export interface withWillpower {
  willpower_temporary: number
  willpower_permanent: number
}
