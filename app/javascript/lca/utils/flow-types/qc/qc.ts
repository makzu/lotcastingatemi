import type {
  withBasicInfo,
  withCombatInfo,
  withHealthLevels,
  withIntimacies,
  withMotePool,
  withWillpower,
} from '../shared'
export interface withQcStats {
  join_battle: number
  movement: number
  soak: number
  hardness: number
  appearance: number
  resolve: number
  guile: number
  evasion: number
  parry: number
  senses: number
  armor_name: string
  qc_attacks: number[]
}
export type fullQc = {
  excellency: string
  grapple: number
  grapple_control: number
  actions: {
    action: string
    pool: number
  }[]
  ref: string
  qc_charms: number[]
  qc_merits: number[]
  portrait_link: string
  type: 'qc'
  shape_sorcery: number
  feats_of_strength: number
  strength: number
  rituals: string[]
} & withQcStats &
  withWillpower &
  withHealthLevels &
  withBasicInfo &
  withCombatInfo &
  withMotePool &
  withIntimacies
interface QcTrait {
  id: number
  sort_order: number
}
export type QcAttack = QcTrait & {
  name: string
  pool: number
  damage: number
  overwhelming: number
  range: string
  tags: string[]
  qc_attackable_type: 'Qc' | 'Battlegroup'
  qc_attackable_id: number
}
export type QcMerit = QcTrait & {
  name: string
  body: string
  latent: boolean
  magical: boolean
  ref: string
}
export type QcCharm = QcTrait & {
  qc_id: number
  name: string
  cost: string
  timing: string
  duration: string
  keywords: string[]
  min_essence: number
  body: string
  ref: string
  category: string
}
