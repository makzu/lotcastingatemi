import { Player } from 'types'
import { WithId } from './_lib'

export interface Chronicle extends WithId {
  name: string
  st_id: number
  st: Player
  players: Array<number>
  characters: Array<number>
  qcs: Array<number>
  battlegroups: Array<number>
}
