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
  qc_attacks: [ qcAttack ]
})

export const player = new schema.Entity('players', {
  characters: [ character ],
  qcs: [ qc ]
})

export const chronicle = new schema.Entity('chronicles', {
  st: player,
  players: [ player ],
  characters: [ character ],
  qcs: [ qc ]
})
