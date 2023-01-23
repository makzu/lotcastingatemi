import { WithId } from './_lib'

export interface Chronicle extends WithId {
  st: unknown
  name: string
  st_id: number
  players: number[]
  characters: number[]
  qcs: number[]
  battlegroups: number[]
}
