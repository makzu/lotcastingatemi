import {
  Battlegroup,
  Character,
  Charm,
  Chronicle,
  Merit,
  Poison,
  QC,
  QcAttack,
  QcMerit,
  Spell,
  Weapon,
} from 'types'
import { Player } from './player'

export interface EntityState {
  currentPlayer: number
  players: { [id: number]: Player }
  chronicles: { [id: number]: Chronicle }
  characters: { [id: number]: Character }
  weapons: { [id: number]: Weapon }
  merits: { [id: number]: Merit }
  charms: { [id: number]: Charm }
  spells: { [id: number]: Spell }
  qcs: { [id: number]: QC }
  qc_merits: { [id: number]: QcMerit }
  qc_charms: { [id: number]: any }
  qc_attacks: { [id: number]: QcAttack }
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
