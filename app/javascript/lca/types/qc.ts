import { PlayerAsset } from './_lib'
import { WithSharedStats } from './shared'

export interface QcAction {
  action: string
  pool: number
}

export interface QC extends PlayerAsset, WithSharedStats {
  name: string
  ref: string

  feats_of_strength: number
  shape_sorcery: number
  strength: number
  grapple: number
  grapple_control: number

  excellency: string
  actions: QcAction[]
  qc_charms: number[]
  qc_merits: number[]
  portrait_link: string
  type: 'qc'
}
