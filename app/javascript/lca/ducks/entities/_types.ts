import { ICharacter, IMerit, IPoison } from 'types'

export interface EntityState {
  currentPlayer: number
  players: { [id: number]: any }
  chronicles: { [id: number]: any }
  characters: { [id: number]: ICharacter }
  weapons: { [id: number]: any }
  merits: { [id: number]: IMerit }
  charms: { [id: number]: any }
  spells: { [id: number]: any }
  qcs: { [id: number]: any }
  qc_merits: { [id: number]: any }
  qc_charms: { [id: number]: any }
  qc_attacks: { [id: number]: any }
  battlegroups: { [id: number]: any }
  combat_actors: { [id: number]: any }
  poisons: { [id: number]: IPoison }
}

export interface WrappedEntityState {
  entities: {
    current: EntityState
  }
  session: {
    id: number
  }
}
