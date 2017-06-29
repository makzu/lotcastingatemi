import { schema } from 'normalizr'

const weapon = new schema.Entity('weapons')
const merit = new schema.Entity('merits')
export const character = new schema.Entity('characters', {
  weapons: [ weapon ],
  merits: [ merit ]
})

const qcMerit = new schema.Entity('qcMerits')
const qcAttack = new schema.Entity('qcAttacks')
export const qc = new schema.Entity('qcs', {
  qc_merits: [ qcMerit ],
  qc_attacks: [ qcAttack ],
  battlegroups: [ new schema.Entity('battlegroups') ],
})

export const battlegroup = new schema.Entity('battlegroups', {
  qc: qc
})

const chronicleId = new schema.Entity('chronicles')

export const player = new schema.Entity('players', {
  chronicles: [ chronicleId ],
  own_chronicles: [ chronicleId ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ]
})

const playerNameOnly = new schema.Entity('players')

export const chronicle = new schema.Entity('chronicles', {
  st: playerNameOnly,
  players: [ playerNameOnly ],
  characters: [ character ],
  qcs: [ qc ],
  battlegroups: [ battlegroup ]
})
