// @flow
import { schema } from 'normalizr'

export const weapons = new schema.Entity('weapons')
export const merits = new schema.Entity('merits')
export const charms = new schema.Entity('charms')
export const spells = new schema.Entity('spells')
export const poisons = new schema.Entity('poisons')
export const characters = new schema.Entity('characters', {
  weapons: [weapons],
  merits: [merits],
  spells: [spells],
  charms: [charms],
  martial_arts_charms: [charms],
  evocations: [charms],
  spirit_charms: [charms],
  poisons: [poisons],
})

export const qc_merits = new schema.Entity('qcMerits')
export const qc_attacks = new schema.Entity('qcAttacks')
export const qc_charms = new schema.Entity('qcCharms')
export const qcs = new schema.Entity('qcs', {
  qc_merits: [qc_merits],
  qc_attacks: [qc_attacks],
  qc_charms: [qc_charms],
  poisons: [poisons],
})

export const battlegroups = new schema.Entity('battlegroups', {
  qc_attacks: [qc_attacks],
  poisons: [poisons],
})

const chronicleId = new schema.Entity('chronicles')

export const players = new schema.Entity('players', {
  chronicles: [chronicleId],
  own_chronicles: [chronicleId],
  characters: [characters],
  qcs: [qcs],
  battlegroups: [battlegroups],
})

export const combat_actors = new schema.Entity('combatActors', {
  poisons: [poisons],
})
export const chronicles = new schema.Entity('chronicles', {
  st: players,
  players: [players],
  characters: [characters],
  qcs: [qcs],
  battlegroups: [battlegroups],
  combatActors: [combat_actors],
})

export const chronicleList = new schema.Array(chronicles)
export const characterList = new schema.Array(characters)
