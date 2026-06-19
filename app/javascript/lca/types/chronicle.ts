import type { Player } from '@lca/types'
import type { WithId } from './_lib'

export interface Chronicle extends WithId {
  name: string
  st_id: number
  st: Player
  invite_code: string
  notes: string
  players: Array<number>
  characters: Array<number>
  qcs: Array<number>
  battlegroups: Array<number>
}
