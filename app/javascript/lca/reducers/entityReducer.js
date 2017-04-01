import { normalize } from 'normalizr'

import * as c from '../utils/actionNames'
import * as schemas from './entities/_schemas.js'
import { _create_qc_attack, _destroy_qc_attack } from './entities/qc_attack.js'
import { _create_qc_merit, _destroy_qc_merit } from './entities/qc_merit.js'
import { _create_weapon, _destroy_weapon } from './entities/weapon.js'
import { _create_merit, _destroy_merit } from './entities/merit.js'

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

function _receive_chronicle(state, action) {
  const newState = normalize(action.chronicle, schemas.chronicle)

  const id = newState.result
  const newChronicles = newState.entities.chronicles
  const newPlayers = newState.entities.players
  const newCharacters = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newMerits = newState.entities.merits
  const newQcs = newState.entities.qcs
  const newQcMerits = newState.entities.qcMerits
  const newQcAttacks = newState.entities.qcAttacks

  newChronicles[id].characters = []
  newChronicles[id].qcs = []

  for (var charId in newCharacters) {
    if (newCharacters[charId].chronicle_id == id)
      newChronicles[id].characters.push(parseInt(charId))
  }
  for (var qcId in newQcs) {
    if (newQcs[qcId].chronicle_id == id)
      newChronicles[id].qcs.push(parseInt(qcId))
  }

  return {
    characters: { ...state.characters, ...newCharacters },
    players:    { ...state.players,    ...newPlayers    },
    merits:     { ...state.merits,     ...newMerits     },
    weapons:    { ...state.weapons,    ...newWeapons    },
    qcs:        { ...state.qcs,        ...newQcs        },
    qc_merits:  { ...state.qc_merits,  ...newQcMerits   },
    qc_attacks: { ...state.qc_attacks, ...newQcAttacks  },
    chronicles: { ...state.chronicles, ...newChronicles }
  }
}

function _receive_char(state, action) {
  const newState = normalize(action.character, schemas.character)

  const id = newState.result
  const newChar = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newMerits = newState.entities.merits

  return { ...state,
    characters: { ...state.characters, ...newChar },
    weapons: { ...state.weapons, ...newWeapons },
    merits: { ...state.merits, ...newMerits }
  }
}

function _create_character(state, action) {
  const newState = normalize(action.character, schemas.character)
  const newCharacters = newState.entities.characters
  const owner = state.players[action.character.player_id]

  const chronId = action.character.chronicle_id
  let newChronicles = state.chronicles

  if (chronId != null) {
    newChronicles = { ...newChronicles, [chronId]: {
      ...newChronicles[chronId],
      qcs: [ ...newChronicles[chronId].characters, action.character.id ]
    }}
  }

  return { ...state,
    characters: { ...state.characters, ...newCharacters },
    players: { ...state.players, [owner.id]: { ...owner, characters: [ ...owner.characters, action.character.id ] }},
    chronicles: newChronicles
  }
}

function _create_qc(state, action) {
  const newState = normalize(action.qc, qc)
  const newQcs = newState.entities.qcs
  const owner = state.players[action.qc.player_id]

  const chronId = action.qc.chronicle_id
  let newChronicles = state.chronicles
  if (chronId != null) {
    newChronicles = { ...newChronicles, [chronId]: {
      ...newChronicles[chronId],
      qcs: [ ...newChronicles[chronId].qcs, action.qc.id ]
    }}
  }

  return { ...state,
    qcs: { ...state.qcs, ...newQcs },
    players: { ...state.players, [owner.id]: { ...owner, qcs: [ ...owner.qcs, action.qc.id ] }},
    chronicles: newChronicles
  }
}

export default function EntityReducer(state = defaultState, action) {
  const trait = action.update != undefined ? action.update.trait : null
  const value = action.update != undefined ? action.update.value : null

  switch (action.type) {
  case c.RECEIVE_CHARACTER:
    return _receive_char(state, action)

  case c.RECEIVE_CHRONICLE:
    return _receive_chronicle(state, action)

  case c.CREATE_CHARACTER_COMPLETE:
    return _create_character(state, action)

  case c.UPDATE_CHARACTER:
    const char = state.characters[action.id]
    return {... state, characters: {
      ...state.characters, [action.id]: {
        ...char, [trait]: value } }
    }

  case c.CREATE_WEAPON_COMPLETE:
    return _create_weapon(state, action)

  case c.UPDATE_WEAPON:
    const weap = state.weapons[action.id]
    return { ...state, weapons: {
      ...state.weapons, [action.id]: {
        ...weap, [trait]: value } }
    }

  case c.DESTROY_WEAPON_COMPLETE:
    return _destroy_weapon(state, action)

  case c.CREATE_MERIT_COMPLETE:
    return _create_merit(state, action)

  case c.UPDATE_MERIT:
    const merit = state.merits[action.id]
    return { ...state, merits: {
      ...state.merits, [action.id]: {
        ...merit, [trait]: value } }
    }
  case c.DESTROY_MERIT_COMPLETE:
    return _destroy_merit(state, action)

  case c.CREATE_QC_COMPLETE:
    return _create_qc(state, action)

  case c.UPDATE_QC:
    const qc = state.qcs[action.id]
    return { ...state, qcs: {
      ...state.qcs, [action.id]: {
        ...qc, [trait]: value } }
    }

  case c.CREATE_QC_ATTACK_COMPLETE:
    return _create_qc_attack(state, action)

  case c.DESTROY_QC_ATTACK_COMPLETE:
    return _destroy_qc_attack(state, action)

  case c.UPDATE_QC_ATTACK:
    const qca = state.qc_attacks[action.id]
    return { ...state, qc_attacks: {
      ...state.qc_attacks, [action.id]: {
        ...qca, [trait]: value } }
    }

    case c.CREATE_QC_MERIT_COMPLETE:
      return _create_qc_merit(state, action)

    case c.DESTROY_QC_MERIT_COMPLETE:
      return _destroy_qc_merit(state, action)

    case c.UPDATE_QC_MERIT:
      const qcm = state.qc_merits[action.id]
      return { ...state, qc_merits: {
        ...state.qc_merits, [action.id]: {
          ...qcm, [trait]: value } }
      }
  default:
    return state
  }
}
