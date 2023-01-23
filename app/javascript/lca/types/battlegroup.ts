import { PlayerAsset } from './_lib'

export interface Battlegroup extends PlayerAsset {
  qc_attacks: string[]
  name: string
}
