import PlayerReducer from '../ducks/player.js'
import ChronicleReducer from '../ducks/chronicle.js'
import CharacterReducer from '../ducks/character.js'
import MeritReducer from '../ducks/merit.js'
import WeaponReducer from '../ducks/weapon.js'
import QcReducer from '../ducks/qc.js'
import QcAttackReducer from '../ducks/qc_attack.js'
import QcMeritReducer from '../ducks/qc_merit.js'

const defaultState = {
  players:    {},
  chronicles: {},
  characters: {},
  weapons:    {},
  merits:     {},
  qcs:        {},
  qc_merits:  {},
  qc_attacks: {}
}

export default function EntityReducer(state = defaultState, action) {
  // Entity actions are expected to be in format 'lca/<entity name>/<action'
  const act = action.type.split('/')
  if (act[0] !== 'lca')
    return state

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
  default:
    return state
  }
}
