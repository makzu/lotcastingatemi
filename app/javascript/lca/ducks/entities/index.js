// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux
import { omit } from 'lodash'

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
  battlegroups: {},
  combat_actors:{},
}

export default function EntityReducer(state = defaultState, action) {
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
  case 'chronicle':
    return ChronicleReducer(state, action)

  default:
    return state
  }
}

function handleCreateAction(state, payload) {
  let entity = JSON.parse(payload.entity)

  const chrons = entity.chronicle_id ? {
    chronicles: { ...state.chronicles,
      [entity.chronicle_id]: { ...state.chronicles[entity.chronicle_id],
        [payload.type]: [...state.chronicles[entity.chronicle_id][payload.type], entity.id]
      }
    },
  } : {}

  return { ...state,
    [payload.type]: {
      ...state[payload.type],
      [payload.id]: entity,
    },
    [payload.parent_type]: { ...state[payload.parent_type],
      [payload.parent_id]: { ...state[payload.parent_type][payload.parent_id],
        [payload.assoc]: [ ...state[payload.parent_type][payload.parent_id][payload.assoc], entity.id]
      },
    },
    ...chrons,
  }
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

  const parent = state[payload.parent_type][payload.parent_id] ? {
    [payload.parent_type]: {
      ...state[payload.parent_type],
      [payload.parent_id]: { ...state[payload.parent_type][payload.parent_id],
        [payload.assoc]: state[payload.parent_type][payload.parent_id][payload.assoc].filter((e) => e !== payload.id)
      },
    },
  } : {}

  return { ...state,
    [payload.type]: omit(state[payload.type], [payload.id]),
    ...parent,
    ...chrons,
  }
}
