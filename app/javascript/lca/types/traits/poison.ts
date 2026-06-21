import type { CharacterType } from '@lca/types/index.ts'
import type { Sortable, WithId } from '../_lib.ts'

export interface Poison extends WithId, Sortable {
  poisonable_id: number
  poisonable_type: CharacterType
  name: string
  penalty: number
  interval: string
  damage: number
  damage_type: string
  crash_damage_type: string
  vector: string
  duration: number
  duration_type: string
  notes: string
  sort_order: number
  ref: string
}
