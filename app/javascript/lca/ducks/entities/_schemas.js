import { schema } from 'normalizr'

const weapon = new schema.Entity('weapons')
const merit = new schema.Entity('merits')
const charm = new schema.Entity('charms')
const spell = new schema.Entity('spells')
export const character = new schema.Entity('characters', {
  evocations: [ charm ],
  solar_charms: [ charm ],
  martial_arts_charms: [ charm ],
  weapons: [ weapon ],
  merits: [ merit ],
  spells: [ spell ],
})

const qcMerit = new schema.Entity('qcMerits')
const qcAttack = new schema.Entity('qcAttacks')
const qcCharm = new schema.Entity('qcCharms')
export const qc = new schema.Entity('qcs', {
  qc_merits: [ qcMerit ],
  qc_attacks: [ qcAttack ],
  qc_charms: [ qcCharm ],
})

export const battlegroup = new schema.Entity('battlegroups', {
  qc_attacks: [ qcAttack ],
})

const chronicleId = new schema.Entity('chronicles')

export const player = new schema.Entity('players', {
  chronicles: [ chronicleId ],
  own_chronicles: [ chronicleId ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ],
})

export const chronicle = new schema.Entity('chronicles', {
  st: player,
  players: [ player ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ],
})

export const chronicleList = new schema.Array(chronicle)
