import { schema } from 'normalizr'

export const weapon = new schema.Entity('weapons')
export const merit = new schema.Entity('merits')
export const charm = new schema.Entity('charms')
export const spell = new schema.Entity('spells')
export const character = new schema.Entity('characters', {
  weapons: [ weapon ],
  merits: [ merit ],
  spells: [ spell ],
  charms: [ charm ],
  martial_arts_charms: [ charm ],
  evocations: [ charm ],
  spirit_charms: [ charm ],
})

export const qc_merit = new schema.Entity('qcMerits')
export const qc_attack = new schema.Entity('qcAttacks')
export const qc_charm = new schema.Entity('qcCharms')
export const qc = new schema.Entity('qcs', {
  qc_merits: [ qc_merit ],
  qc_attacks: [ qc_attack ],
  qc_charms: [ qc_charm ],
})

export const battlegroup = new schema.Entity('battlegroups', {
  qc_attacks: [ qc_attack ],
})

const chronicleId = new schema.Entity('chronicles')

export const player = new schema.Entity('players', {
  chronicles: [ chronicleId ],
  own_chronicles: [ chronicleId ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ],
})

export const combat_actor = new schema.Entity('combatActors')
export const chronicle = new schema.Entity('chronicles', {
  st: player,
  players: [ player ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ],
  combatActors: [ combat_actor ],
})

export const chronicleList = new schema.Array(chronicle)
