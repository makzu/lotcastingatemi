import { QcStats } from './qc'
import { WithCombatStats } from './shared'
import { PlayerAsset } from './_lib'

export interface Battlegroup extends PlayerAsset, QcStats, WithCombatStats {
  size: 0 | 1 | 2 | 3 | 4 | 5
  might: 0 | 1 | 2
  drill: 0 | 1 | 2
  health_levels: number
  perfect_morale: boolean
  name: string
  qc_attacks: number[]
}
