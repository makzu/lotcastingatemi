import type { WithId } from './_lib'

export interface Chronicle extends WithId {
  st_id: number
  name: string
  notes: string
  invite_code: string

  players: number[]
  characters: number[]
  qcs: number[]
  battlegroups: number[]
}
