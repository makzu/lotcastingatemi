import type { Sortable } from '@/utils'
import type { PlayerAsset, Timing, WithId } from './_lib'
import type { WithSharedStats } from './shared'

export type AttackRange = 'close' | 'short' | 'medium' | 'long' | 'extreme'
export interface QcAction {
  action: string
  pool: number
}

export interface QC extends PlayerAsset, WithSharedStats {
  movement: number
  description: string
  soak: string | number
  hardness: number
  armor_name: string
  guile: number
  resolve: number
  appearance: number
  evasion: number
  parry: number
  senses: number
  join_battle: number
  name: string
  ref: string
  feats_of_strength: number
  grapple: number
  grapple_control: number
  shape_sorcery: number
  strength: number
  excellency: string
  actions: QcAction[]
  qc_attacks: number[]
  qc_charms: number[]
  qc_merits: number[]
  portrait_link: string
  type: 'qc'
}

export interface QcAttack extends Sortable, WithId {
  name: string
  pool: number
  range: AttackRange
  damage: number
  overwhelming: number
  tags: string[]
  qc_attackable_type: 'Qc' | 'Battlegroup'
  qc_attackable_id: number
}

export interface QcMerit extends Sortable, WithId {
  name: string
  body: string
  latent: boolean
  magical: boolean
  ref: string
  qc_id: number
}

export interface QcCharm extends Sortable, WithId {
  name: string
  cost: string
  timing: Timing
  duration: string
  keywords: string[]
  min_essence: number
  body: string
  ref: string
  category: string
  qc_id: number
}
