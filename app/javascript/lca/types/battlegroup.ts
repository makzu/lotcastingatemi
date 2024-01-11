import { PlayerAsset } from './_lib'
import { WithCombatStats } from './shared'

export interface Battlegroup extends PlayerAsset, WithCombatStats {
  name: string
  description: string
  magnitude: number
  size: number
  might: number
  drill: number
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
  qc_attacks: string[]
}
