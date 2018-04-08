// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux
import { omit, merge } from 'lodash'
import { normalize } from 'normalizr'

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
export * from './combat_actor.js'

import * as schemas from './_schemas.js'
import PlayerReducer from './player.js'
import ChronicleReducer from './chronicle.js'
import { LOGOUT } from '../session.js'

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
  battlegroups: {},
  combat_actors:{},
}

export default function EntityReducer(state = defaultState, action) {
  if (action.type === LOGOUT)
    return defaultState

  // Entity actions are expected to be in format 'lca/<entity name>/<ACTION>'
  const act = action.type.split('/')
  if (act[0] !== 'lca')
    return state

  let { payload } = action

  // TODO: Make this more readable
  if (action.type == 'lca/cable/RECEIVED') {
    switch (payload.event) {
    case 'create':
      return handleCreateAction(state, payload)

    case 'update':
      return { ...state,
        [payload.type]: {
          ...state[payload.type],
          [payload.id]: {
            ...state[payload.type][payload.id],
            ...payload.changes,
          }
        }
      }

    case 'destroy':
      return handleDestroyAction(state, payload)

    default:
      return state
    }
  }

  switch(act[1]) {
  case 'player':
    return PlayerReducer(state, action)
  case 'character':
  case 'chronicle':
    return ChronicleReducer(state, action)

  default:
    return state
  }
}

function handleCreateAction(state, payload) {
  const { parent_type, parent_id, assoc } = payload
  let entity = JSON.parse(payload.entity)
  let ppp = normalize(entity, schemas[assoc])

  const parent = {
    [parent_type]: { ...state[parent_type],
      [parent_id]: { ...state[parent_type][parent_id],
        [assoc]: [ ...state[parent_type][parent_id][assoc], entity.id]
      },
    }
  }
  return mergeStateWithNormalizedEntities({ ...state, ...parent }, ppp.entities)
}

function handleDestroyAction(state, payload) {
  const chronicle_id = state[payload.type][payload.id].chronicle_id
  const chrons = chronicle_id ? {
    chronicles: { ...state.chronicles,
      [chronicle_id]: { ...state.chronicles[chronicle_id],
        [payload.type]: state.chronicles[chronicle_id][payload.type].filter((e) => e !== payload.id)
      }
    },
  } : {}

  const { parent_type, parent_id, assoc } = payload

  const parent = (state[parent_type] && state[parent_type][parent_id]) ? {
    [parent_type]: {
      ...state[parent_type],
      [parent_id]: { ...state[parent_type][parent_id],
        [assoc]: state[parent_type][parent_id][assoc].filter((e) => e !== payload.id)
      },
    },
  } : {}

  return { ...state,
    [payload.type]: omit(state[payload.type], [payload.id]),
    ...parent,
    ...chrons,
  }
}

export function mergeStateWithNormalizedEntities(state, entities) {
  return {
    ...state,
    players:      merge({ ...state.players      }, entities.players      ),
    characters:   merge({ ...state.characters   }, entities.characters   ),
    merits:       merge({ ...state.merits       }, entities.merits       ),
    weapons:      merge({ ...state.weapons      }, entities.weapons      ),
    charms:       merge({ ...state.charms       }, entities.charms       ),
    spells:       merge({ ...state.spells       }, entities.spells       ),
    qcs:          merge({ ...state.qcs          }, entities.qcs          ),
    qc_merits:    merge({ ...state.qc_merits    }, entities.qcMerits     ),
    qc_charms:    merge({ ...state.qc_charms    }, entities.qcCharms     ),
    qc_attacks:   merge({ ...state.qc_attacks   }, entities.qcAttacks    ),
    battlegroups: merge({ ...state.battlegroups }, entities.battlegroups ),
    chronicles:   merge({ ...state.chronicles   }, entities.chronicles   ),
  }
}
