import { WithId } from './_lib'

export interface Chronicle extends WithId {
  st_id: number
  name: string
  players: number[]
  characters: number[]
  qcs: number[]
  battlegroups: number[]
}
