import { Element } from './_lib'

/* Stats that PCs and QCs have in common */
export interface WithSharedStats extends WithSorcery, WithAura, WithIntimacies {
  essence: number

  initiative: number
  onslaught: number
  in_combat: boolean
  has_acted: boolean
  willpower_temporary: number
  willpower_permanent: number
  health_level_0s: number
  health_level_1s: number
  health_level_2s: number
  health_level_4s: number
  health_level_incap: number
  damage_bashing: number
  damage_lethal: number
  damage_aggravated: number

  motes_personal_current: number
  motes_personal_total: number
  motes_peripheral_current: number
  motes_peripheral_total: number
  motes_committed: MotesCommitted[]
  anima_level: 0 | 1 | 2 | 3
  resources: Resource[]
}

export interface WithSorcery {
  is_sorcerer: boolean
  sorcerous_motes: number
  is_necromancer: boolean
  necromantic_motes: number
  rituals: string[]
  spells: number[]
}

export interface WithAura {
  aura: '' | 'none' | Element
}

export interface Intimacy {
  subject: string
  rating: number
  hidden?: boolean
}

export interface WithIntimacies {
  principles: Intimacy[]
  ties: Intimacy[]
}

export interface MotesCommitted {
  pool: 'personal' | 'peripheral'
  label: string
  motes: number
  scenelong?: boolean
}

export interface Resource {
  resource: string
  value: number
}
