// tslint:disable object-literal-sort-keys variable-name
import { schema } from 'normalizr'

export const merit = new schema.Entity('merits')
export const charm = new schema.Entity('charms')
export const spell = new schema.Entity('spells')
export const poison = new schema.Entity('poisons')
export const loadout = new schema.Entity('loadouts')
export const weapon = new schema.Entity('weapons', {
  poisons: [poison],
})
export const character = new schema.Entity('characters', {
  weapons: [weapon],
  merits: [merit],
  spells: [spell],
  charms: [charm],
  martial_arts_charms: [charm],
  evocations: [charm],
  spirit_charms: [charm],
  poisons: [poison],
  charm_loadouts: [loadout],
})

export const qc_merit = new schema.Entity('qc_merits')
export const qc_charm = new schema.Entity('qc_charms')
export const qc_attack = new schema.Entity('qc_attacks', {
  poisons: [poison],
})
export const qc = new schema.Entity('qcs', {
  qc_merits: [qc_merit],
  qc_attacks: [qc_attack],
  qc_charms: [qc_charm],
  spells: [spell],
  poisons: [poison],
})

export const battlegroup = new schema.Entity('battlegroups', {
  qc_attacks: [qc_attack],
  poisons: [poison],
})

const chronicleId = new schema.Entity('chronicles')

export const player = new schema.Entity('players', {
  chronicles: [chronicleId],
  own_chronicles: [chronicleId],
  characters: [character],
  qcs: [qc],
  battlegroups: [battlegroup],
})

export const combat_actors = new schema.Entity('combatActors', {
  poisons: [poison],
})
export const chronicle = new schema.Entity('chronicles', {
  st: player,
  players: [player],
  characters: [character],
  qcs: [qc],
  battlegroups: [battlegroup],
  combatActors: [combat_actors],
})

export const chronicleList = new schema.Array(chronicle)
export const characterList = new schema.Array(character)
export const qcList = new schema.Array(qc)
export const battlegroupList = new schema.Array(battlegroup)
