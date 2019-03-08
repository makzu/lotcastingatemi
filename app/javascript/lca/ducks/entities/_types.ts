import { Battlegroup, Character, Merit, Poison, QC } from 'types'
import { Player } from './player'

export interface EntityState {
  currentPlayer: number
  players: { [id: number]: Player }
  chronicles: { [id: number]: any }
  characters: { [id: number]: Character }
  weapons: { [id: number]: any }
  merits: { [id: number]: Merit }
  charms: { [id: number]: any }
  spells: { [id: number]: any }
  qcs: { [id: number]: QC }
  qc_merits: { [id: number]: any }
  qc_charms: { [id: number]: any }
  qc_attacks: { [id: number]: any }
  battlegroups: { [id: number]: Battlegroup }
  combat_actors: { [id: number]: any }
  poisons: { [id: number]: Poison }
}

export interface WrappedEntityState {
  entities: {
    current: EntityState
  }
  session: {
    id: number
  }
}
