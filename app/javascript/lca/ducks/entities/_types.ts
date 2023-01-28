import {
  Battlegroup,
  Character,
  Charm,
  Merit,
  Player,
  Poison,
  QC,
  Spell,
  Weapon,
} from 'types'

export interface EntityState {
  currentPlayer: number
  players: { [id: number]: Player }
  chronicles: { [id: number]: any }
  characters: { [id: number]: Character }
  weapons: { [id: number]: Weapon }
  merits: { [id: number]: Merit }
  charms: { [id: number]: Charm }
  spells: { [id: number]: Spell }
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
