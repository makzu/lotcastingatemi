import type { QcAttack } from '@/features/qc/types'
import type { PlayerAsset } from '@/types/_lib'
import type { WithCombatStats } from '@/types/shared'

export type { QcAttack }

export interface Battlegroup extends PlayerAsset, WithCombatStats {
  name: string
  description: string
  magnitude: number
  size: number
  might: 0 | 1 | 2 | 3
  // might: number // 0-3
  drill: 0 | 1 | 2
  // drill: number // 0-2
  soak: number
  health_levels: number
  perfect_morale: boolean
  essence: number
  willpower_temporary: number
  willpower_permanent: number
  movement: number
  senses: number
  armor_name: string
  hardness: number
  join_battle: number
  evasion: number
  parry: number
  guile: number
  resolve: number
  appearance: number
  portrait_link: string
  qc_attacks: QcAttack[]
  type: 'battlegroup'
}
