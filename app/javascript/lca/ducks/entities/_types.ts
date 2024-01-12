import {
  Battlegroup,
  Character,
  Charm,
  Chronicle,
  Merit,
  Player,
  Poison,
  QC,
  Spell,
  Weapon,
} from 'types'

export interface EntityState {
  currentPlayer: number
  players: Record<number, Player>
  chronicles: Record<number, Chronicle>
  characters: Record<number, Character>
  weapons: Record<number, Weapon>
  merits: Record<number, Merit>
  charms: Record<number, Charm>
  spells: Record<number, Spell>
  qcs: Record<number, QC>
  qc_merits: Record<number, QcMerit>
  qc_charms: Record<number, QcCharm>
  qc_attacks: Record<number, QcAttack>
  battlegroups: Record<number, Battlegroup>
  combat_actors: Record<number, never>
  poisons: Record<number, Poison>
}

export interface WrappedEntityState {
  entities: {
    current: EntityState
  }
  session: {
    id: number
  }
}
