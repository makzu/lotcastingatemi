import type { Sortable } from '@/utils'
import type { PlayerAsset } from './_lib'
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

  appearance: number
  evasion: number
  feats_of_strength: number
  grapple: number
  grapple_control: number
  guile: number
  join_battle: number
  parry: number
  resolve: number
  senses: number
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

export interface QcAttack extends Sortable {
  id: number
  name: string
  pool: number
  range: AttackRange
  damage: number
  overwhelming: number
  tags: string[]
}

export interface QcMerit extends Sortable {
  id: number
  name: string
}
