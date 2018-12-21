// @flow
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
import PlayerReducer, {
  PLY_DESTROY_SUCCESS,
  FETCH_SUCCESS as PLY_FETCH_SUCCESS,
} from './player.js'
import ChronicleReducer from './chronicle.js'
import CharacterReducer from './character.js'
import MeritReducer from './merit.js'
import WeaponReducer from './weapon.js'
import SpellReducer from './spell.js'
import CharmReducer from './charm.js'
import QcReducer from './qc.js'
import QcAttackReducer from './qc_attack.js'
import QcMeritReducer from './qc_merit.js'
import QcCharmReducer from './qc_charm.js'
import BattlegroupReducer from './battlegroup.js'
import CombatActorReducer from './combat_actor.js'
import { LOGOUT } from '../session.js'
import type {
  Character,
  Charm,
  Spell,
  fullWeapon as Weapon,
  fullMerit as Merit,
  fullQc as Qc,
  QcMerit,
  QcCharm,
  QcAttack,
  Battlegroup,
  CombatActor,
  Poison,
} from 'utils/flow-types'

export const defaultState = {
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
export type EntityState = {
  +currentPlayer: number,
  +players: { [id: number]: Object },
  +chronicles: { [id: number]: Object },
  +characters: { [id: number]: Character },
  +weapons: { [id: number]: Weapon },
  +merits: { [id: number]: Merit },
  +charms: { [id: number]: Charm },
  +spells: { [id: number]: Spell },
  +qcs: { [id: number]: Qc },
  +qc_merits: { [id: number]: QcMerit },
  +qc_charms: { [id: number]: QcCharm },
  +qc_attacks: { [id: number]: QcAttack },
  +battlegroups: { [id: number]: Battlegroup },
  +combat_actors: { [id: number]: CombatActor },
  +poisons: { [id: number]: Poison },
}

export type WrappedEntityState = {
  entities: {
    current: EntityState,
  },
  session: {
    id: number,
  },
}

export function EntityReducer(
  state: EntityState = defaultState,
  action: Object
) {
  switch (action.type) {
    case PLY_FETCH_SUCCESS:
      return { ...state, currentPlayer: action.payload.result }
    case LOGOUT:
    case PLY_DESTROY_SUCCESS:
      return defaultState
  }

  return state
}

const CableReducer = (state: EntityState, action: Object) => {
  // TODO: Make this more readable
  let { payload } = action

  if (action.type == 'lca/cable/RECEIVED') {
    switch (payload.event) {
      case 'create':
        return handleCreateAction(state, payload)

      case 'update':
        return {
          ...state,
          [payload.type]: {
            ...state[payload.type],
            [payload.id]: {
              ...state[payload.type][payload.id],
              ...payload.changes,
            },
          },
        }

      case 'destroy':
        return handleDestroyAction(state, payload)
    }
  }

  return state
}

const compose = (...fns) =>
  fns.reduce((f, g) => (arg1, arg2) => f(g(arg1, arg2), arg2))
export default (state: EntityState, action: Object) =>
  compose(
    CableReducer,
    PlayerReducer,
    ChronicleReducer,
    CharacterReducer,
    MeritReducer,
    WeaponReducer,
    CharmReducer,
    SpellReducer,
    QcReducer,
    QcAttackReducer,
    QcCharmReducer,
    QcMeritReducer,
    BattlegroupReducer,
    CombatActorReducer,
    EntityReducer // EntityReducer MUST be last, as it has the default State
  )(state, action)

function handleCreateAction(state: EntityState, payload) {
  const { parent_type, parent_id, assoc, type } = payload
  let entity = JSON.parse(payload.entity)
  let ppp = normalize(entity, schemas[type])

  const parent = {
    [parent_type]: {
      ...state[parent_type],
      [parent_id]: {
        ...state[parent_type][parent_id],
        [assoc]: [
          // Remove/prevent duplicate association IDs
          ...new Set([...state[parent_type][parent_id][assoc], entity.id]),
        ],
      },
    },
  }
  return mergeStateWithNormalizedEntities({ ...state, ...parent }, ppp.entities)
}

function handleDestroyAction(state: EntityState, payload) {
  const { chronicle_id } = payload
  let chrons = {}
  if (chronicle_id)
    chrons = {
      chronicles: {
        ...state.chronicles,
        [chronicle_id]: {
          ...state.chronicles[chronicle_id],
          [payload.type]: state.chronicles[chronicle_id][payload.type].filter(
            e => e !== payload.id
          ),
        },
      },
    }

  const { parent_type, parent_id, assoc } = payload

  let parent = {}
  if (state[parent_type] && state[parent_type][parent_id])
    parent = {
      [parent_type]: {
        ...state[parent_type],
        [parent_id]: {
          ...state[parent_type][parent_id],
          [assoc]: state[parent_type][parent_id][assoc].filter(
            e => e !== payload.id
          ),
        },
      },
    }

  return {
    ...state,
    [payload.type]: omit(state[payload.type], [payload.id]),
    ...parent,
    ...chrons,
  }
}

export function mergeStateWithNormalizedEntities(
  state: EntityState,
  entities: Object
) {
  return {
    ...state,
    players: merge({ ...state.players }, entities.players),
    characters: merge({ ...state.characters }, entities.characters),
    merits: merge({ ...state.merits }, entities.merits),
    weapons: merge({ ...state.weapons }, entities.weapons),
    charms: merge({ ...state.charms }, entities.charms),
    spells: merge({ ...state.spells }, entities.spells),
    qcs: merge({ ...state.qcs }, entities.qcs),
    qc_merits: merge({ ...state.qc_merits }, entities.qcMerits),
    qc_charms: merge({ ...state.qc_charms }, entities.qcCharms),
    qc_attacks: merge({ ...state.qc_attacks }, entities.qcAttacks),
    battlegroups: merge({ ...state.battlegroups }, entities.battlegroups),
    chronicles: merge({ ...state.chronicles }, entities.chronicles),
    poisons: merge({ ...state.poisons }, entities.poisons),
  }
}
