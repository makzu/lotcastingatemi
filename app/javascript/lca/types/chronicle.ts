import type { Player } from '@lca/types/index.ts'
import type { WithId } from './_lib.ts'

export interface Chronicle extends WithId {
  name: string
  st_id: number
  st: Player
  invite_code: string
  notes: string
  players: number[]
  characters: number[]
  qcs: number[]
  battlegroups: number[]
}
