import type { PlayerAsset } from './_lib.ts'
import type { QcStats } from './qc.ts'
import type { WithCombatStats } from './shared.ts'

export interface Battlegroup extends PlayerAsset, QcStats, WithCombatStats {
  type: 'battlegroup'
  willpower_temporary: number
  willpower_permanent: number
  size: 0 | 1 | 2 | 3 | 4 | 5
  might: 0 | 1 | 2
  drill: 0 | 1 | 2
  health_levels: number
  perfect_morale: boolean
  magnitude: number
  name: string
  qc_attacks: number[]
}
