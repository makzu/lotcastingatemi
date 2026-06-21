// Vaguely follows the Ducks pattern: https://github.com/erikras/ducks-modular-redux

import { type AnyAction, createReducer } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'

export type { EntityState } from './_types.ts'
export * from './battlegroup.ts'
export * from './character.ts'
export * from './charm.ts'
export * from './chronicle.ts'
export * from './combat_actor.ts'
export * from './merit.ts'
export * from './player.ts'
export * from './poison.ts'
export * from './qc.ts'
export * from './qc_attack.ts'
export * from './qc_charm.ts'
export * from './qc_merit.ts'
export * from './spell.ts'
export * from './weapon.ts'

import { LOGOUT } from '../session.ts'
import { mergeEntity } from './_entity.ts'
import * as schemas from './_schemas.ts'
import type { EntityState } from './_types.ts'
import BattlegroupReducer from './battlegroup.ts'
import CharacterReducer from './character.ts'
import CharmReducer from './charm.ts'
import ChronicleReducer from './chronicle.ts'
import CombatActorReducer from './combat_actor.ts'
import MeritReducer from './merit.ts'
import PlayerReducer from './player.ts'
import PoisonReducer from './poison.ts'
import QcReducer from './qc.ts'
import QcAttackReducer from './qc_attack.ts'
import QcCharmReducer from './qc_charm.ts'
import QcMeritReducer from './qc_merit.ts'
import SpellReducer from './spell.ts'
import WeaponReducer from './weapon.ts'

// tslint:disable object-literal-sort-keys
export const defaultState: EntityState = {
  currentPlayer: 0,
  players: {
    0: {
      id: 0,
      display_name: 'Anonymous Player',
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
  [CABLE_RECEIVED]: (state: EntityState, action: AnyAction) => {
    const { payload } = action
    const { type, id, parent_type, parent_id, assoc } = payload
    const pluralType = `${type}s`

    switch (payload.event) {
      case 'create': {
        const entity = JSON.parse(payload.entity)
        const entities = normalize(entity, schemas[type])
        const newState = mergeEntity(state, { payload: entities })

        newState[parent_type][parent_id][assoc] = [
          ...new Set([...state[parent_type][parent_id][assoc], entity.id]),
        ]
        return newState
      }

      case 'update':
        state[pluralType][id] = { ...state[pluralType][id], ...payload.changes }
        break

      case 'destroy': {
        const { chronicle_id } = payload

        if (chronicle_id && state.chronicles[chronicle_id]) {
          state.chronicles[chronicle_id][type] = state.chronicles[chronicle_id][
            type
          ].filter((e) => e !== id)
        }

        if (state[parent_type]?.[parent_id]) {
          state[parent_type][parent_id][assoc] = state[parent_type][parent_id][
            assoc
          ].filter((e) => e !== id)
        }

        delete state[pluralType][id]
      }
    }
  },
})
