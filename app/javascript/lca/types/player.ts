import type { WithId } from './_lib'

export interface Player extends WithId {
  display_name: string
  characters: number[]
  qcs: number[]
  battlegroups: number[]
  chronicles: number[]
  own_chronicles: number[]
}
