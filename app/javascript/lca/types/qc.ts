import { PlayerAsset } from './_lib'
import { WithSharedStats } from './shared'

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
