import type { PlayerAsset } from './_lib'
import type { QcStats } from './qc'
import type { WithCombatStats } from './shared'

export interface Battlegroup extends PlayerAsset, QcStats, WithCombatStats {
  type: 'battlegroup'
  size: 0 | 1 | 2 | 3 | 4 | 5
  might: 0 | 1 | 2
  drill: 0 | 1 | 2
  health_levels: number
  perfect_morale: boolean
  name: string
  qc_attacks: number[]
}
