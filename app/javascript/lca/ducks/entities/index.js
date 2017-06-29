export * from './player.js'
export * from './chronicle.js'
export * from './character.js'
export * from './merit.js'
export * from './weapon.js'

export * from './qc.js'
export * from './qc_attack.js'
export * from './qc_merit.js'
export * from './qc_charm.js'

export * from './battlegroup.js'

import PlayerReducer from './player.js'
import ChronicleReducer from './chronicle.js'
import CharacterReducer from './character.js'
import MeritReducer from './merit.js'
import WeaponReducer from './weapon.js'
import QcReducer from './qc.js'
import QcAttackReducer from './qc_attack.js'
import QcCharmReducer from './qc_charm.js'
import QcMeritReducer from './qc_merit.js'
import BattlegroupReducer from './battlegroup.js'

export const defaultState = {
  players:    {
    '0': {
      id: 0,
      name: 'Anonymous Player',
      characters: [],
      qcs: [],
      battlegroups: []
    }
  },
  chronicles:   {},
  characters:   {},
  weapons:      {},
  merits:       {},
  qcs:          {},
  qc_merits:    {},
  qc_charms:    {},
  qc_attacks:   {},
  battlegroups: {}
}

export default function EntityReducer(state = defaultState, action) {
  // Entity actions are expected to be in format 'lca/<entity name>/<ACTION>'
  const act = action.type.split('/')
  if (act[0] !== 'lca')
    return state

  // TODO: refactor this, because it feels kind of stupid
  //       Something something currying?
  switch(act[1]) {
  case 'player':
    return PlayerReducer(state, action)
  case 'chronicle':
    return ChronicleReducer(state, action)

  case 'character':
    return CharacterReducer(state, action)
  case 'merit':
    return MeritReducer(state, action)
  case 'weapon':
    return WeaponReducer(state, action)

  case 'qc':
    return QcReducer(state, action)
  case 'qc_attack':
    return QcAttackReducer(state, action)
  case 'qc_merit':
    return QcMeritReducer(state, action)
  case 'qc_charm':
    return QcCharmReducer(state, action)

  case 'battlegroup':
    return BattlegroupReducer(state, action)

  default:
    return state
  }
}
