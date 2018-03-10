// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux

export * from './player.js'
export * from './chronicle.js'
export * from './character.js'
export * from './merit.js'
export * from './weapon.js'
export * from './charm.js'
export * from './spell.js'

export * from './qc.js'
export * from './qc_attack.js'
export * from './qc_merit.js'
export * from './qc_charm.js'

export * from './battlegroup.js'

import PlayerReducer from './player.js'
import ChronicleReducer from './chronicle.js'

export const defaultState = {
  players:    {
    '0': {
      id: 0,
      name: 'Anonymous Player',
      chronicles: [],
      own_chronicles: [],
      characters: [],
      qcs: [],
      battlegroups: [],
    }
  },
  chronicles:   {},
  characters:   {},
  weapons:      {},
  merits:       {},
  charms:       {},
  spells:       {},
  qcs:          {},
  qc_merits:    {},
  qc_charms:    {},
  qc_attacks:   {},
  battlegroups: {}
}

export default function EntityReducer(state = defaultState, action) {
  // TODO: Make this more readable
  if (action.type == 'lca/cable/RECEIVED' && action.payload.event == 'update') {
    return {
      ...state,
      [action.payload.type]: {
        ...state[action.payload.type],
        [action.payload.id]: {
          ...state[action.payload.type][action.payload.id],
          ...action.payload.changes
        }
      }
    }
  }

  // Entity actions are expected to be in format 'lca/<entity name>/<ACTION>'
  const act = action.type.split('/')
  if (act[0] !== 'lca')
    return state

  switch(act[1]) {
  case 'player':
    return PlayerReducer(state, action)
  case 'chronicle':
    return ChronicleReducer(state, action)

  default:
    return state
  }
}
