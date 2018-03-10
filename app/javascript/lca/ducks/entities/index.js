// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux

import { normalize } from 'normalizr'

import * as schemas from './_schemas.js'
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
  let _entities

  if (action.type == 'lca/cable/RECEIVED') {
    _entities = normalize(JSON.parse(action.payload.entity), schemas[action.payload.type]).entities

    return {
      ...state,
      players:      { ...state.players     , ..._entities.players      },
      characters:   { ...state.characters  , ..._entities.characters   },
      merits:       { ...state.merits      , ..._entities.merits       },
      weapons:      { ...state.weapons     , ..._entities.weapons      },
      charms:       { ...state.charms      , ..._entities.charms       },
      spells:       { ...state.spells      , ..._entities.spells       },
      qcs:          { ...state.qcs         , ..._entities.qcs          },
      qc_merits:    { ...state.qc_merits   , ..._entities.qcMerits     },
      qc_charms:    { ...state.qc_charms   , ..._entities.qcCharms     },
      qc_attacks:   { ...state.qc_attacks  , ..._entities.qcAttacks    },
      battlegroups: { ...state.battlegroups, ..._entities.battlegroups },
      chronicles:   { ...state.chronicles  , ..._entities.chronicles   },
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
