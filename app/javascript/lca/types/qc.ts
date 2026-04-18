import { PlayerAsset } from './_lib'
import { WithSharedStats } from './shared'

export interface QcAction {
  action: string
  pool: number
}

export interface QcStats {
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
}

export interface QcMerit {
  name: string
  latent: boolean
  magical: boolean
  body: string
  ref: string
}

export interface QcAttack {
  name: string
  pool: number
  damage: number
  overwhelming: number
  range: string
  tags: Array<string>
  qc_attackable_type: 'Qc' | 'Battlegroup'
  qc_attackable_id: number
}

export interface QC extends PlayerAsset, WithSharedStats, QcStats {
  name: string
  ref: string

  feats_of_strength: number
  shape_sorcery: number
  strength: number
  grapple: number
  grapple_control: number

  excellency: string
  actions: QcAction[]
  qc_attacks: number[]
  qc_charms: number[]
  qc_merits: number[]
  portrait_link: string
  type: 'qc'
}
