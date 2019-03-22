import { CharacterType } from 'types'
import { WithId } from 'types/_lib'
import { Sortable } from 'utils'

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
