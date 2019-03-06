// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux
import { normalize } from 'normalizr'
import { createReducer } from 'redux-starter-kit'

export * from './player'
export * from './chronicle'
export * from './character'
export * from './merit'
export * from './weapon'
export * from './charm'
export * from './spell'
export * from './poison'

export * from './qc'
export * from './qc_attack'
export * from './qc_merit'
export * from './qc_charm'

export * from './battlegroup'
export * from './combat_actor'

export { EntityState } from './_types'

import { LOGOUT } from '../session'
import { mergeEntity } from './_entity'
import * as schemas from './_schemas'
import { EntityState } from './_types'
import BattlegroupReducer from './battlegroup'
import CharacterReducer from './character'
import CharmReducer from './charm'
import ChronicleReducer from './chronicle'
import CombatActorReducer from './combat_actor'
import MeritReducer from './merit'
import PlayerReducer from './player'
import PoisonReducer from './poison'
import QcReducer from './qc'
import QcAttackReducer from './qc_attack'
import QcCharmReducer from './qc_charm'
import QcMeritReducer from './qc_merit'
import SpellReducer from './spell'
import WeaponReducer from './weapon'

// tslint:disable object-literal-sort-keys
export const defaultState: EntityState = {
  currentPlayer: 0,
  players: {
    [0]: {
      id: 0,
      name: 'Anonymous Player',
      chronicles: [],
      own_chronicles: [],
      characters: [],
      qcs: [],
      battlegroups: [],
    },
  },
  chronicles: {},
  characters: {},
  weapons: {},
  merits: {},
  charms: {},
  spells: {},
  qcs: {},
  qc_merits: {},
  qc_charms: {},
  qc_attacks: {},
  battlegroups: {},
  combat_actors: {},
  poisons: {},
}

export const CABLE_RECEIVED = 'lca/cable/RECEIVED'

export default createReducer(defaultState, {
  ...PlayerReducer,
  ...ChronicleReducer,
  ...CharacterReducer,
  ...MeritReducer,
  ...WeaponReducer,
  ...CharmReducer,
  ...SpellReducer,
  ...PoisonReducer,
  ...QcReducer,
  ...QcAttackReducer,
  ...QcCharmReducer,
  ...QcMeritReducer,
  ...BattlegroupReducer,
  ...CombatActorReducer,
  [LOGOUT]: () => defaultState,
  [CABLE_RECEIVED]: (state, action) => {
    const { payload } = action
    const { type, id, parent_type, parent_id, assoc } = payload
    const pluralType = type + 's'

    switch (payload.event) {
      case 'create':
        const entity = JSON.parse(payload.entity)
        const entities = normalize(entity, schemas[type])
        const newState = mergeEntity(state, { payload: entities })

        newState[parent_type][parent_id][assoc] = [
          ...new Set([...state[parent_type][parent_id][assoc], entity.id]),
        ]
        return newState

      case 'update':
        state[pluralType][id] = { ...state[pluralType][id], ...payload.changes }
        break

      case 'destroy':
        const { chronicle_id } = payload

        if (chronicle_id && state.chronicles[chronicle_id]) {
          state.chronicles[chronicle_id][type] = state.chronicles[chronicle_id][
            type
          ].filter(e => e !== id)
        }

        if (state[parent_type] && state[parent_type][parent_id]) {
          state[parent_type][parent_id][assoc] = state[parent_type][parent_id][
            assoc
          ].filter(e => e !== id)
        }

        delete state[pluralType][id]
    }
  },
})
