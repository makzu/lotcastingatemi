import { normalize, schema } from 'normalizr'

import * as c from '../utils/constants'

const defaultState = {
  chronicles: {},
  characters: {},
  weapons: {},
  merits: {},
  qcs: {},
  qc_merits: {}
}

const weapon = new schema.Entity('weapons')
const merit = new schema.Entity('merits')
const character = new schema.Entity('characters', {
  weapons: [ weapon ],
  merits: [ merit ]
})
const qcMerit = new schema.Entity('qcMerits')
const qc = new schema.Entity('qcs', {
  qc_merits: [ qcMerit ]
})
const chronicle = new schema.Entity('chronicles', {
  characters: [ character ],
  qcs: [ qc ]
})

function _receive_chronicle(state, action) {
  const newState = normalize(action.chronicle, chronicle)

  const id = newState.result
  const newChronicles = newState.entities.chronicles
  const newCharacters = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newMerits = newState.entities.merits
  const qcs = newState.entities.qcs
  const qcMerits = newState.entities.qcMerits

  return {
    chronicles: { ...state.chronicles, ...newChronicles },
    characters: { ...state.characters, ...newCharacters },
    merits:     { ...state.merits,     ...newMerits     },
    weapons:    { ...state.weapons,    ...newWeapons    },
    qcs:        { ...state.qcs,        ...qcs           },
    qc_merits:  { ...state.qc_merits,  ...qcMerits      }
  }
}

function _receive_char(state, action) {
  const newState = normalize(action.character, character)

  const id = newState.result
  const newChar = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newMerits = newState.entities.merits

  return {
    characters: { ...state.characters, ...newChar },
    weapons: { ...state.weapons, ...newWeapons },
    merits: { ...state.merits, ...newMerits }
  }
}

export default function CharacterReducer(state = defaultState, action) {
  switch (action.type) {
  case c.RECEIVE_CHAR:
    return _receive_char(state, action)

  case c.RECEIVE_CHRONICLE:
    return _receive_chronicle(state, action)

  case c.UPDATE_CHAR:
    const ctr = action.update.trait
    const cval = action.update.value
    const char = state.characters[action.id]
    return {... state, characters: {
      ...state.characters, [action.id]: {
        ...char, [ctr]: cval } }
    }

  case c.UPDATE_WEAP:
    const wtr = action.update.trait
    const wval = action.update.value
    const weap = state.weapons[action.id]
    return { ...state, weapons: {
      ...state.weapons, [action.id]: {
        ...weap, [wtr]: wval } }
    }

  case c.UPDATE_MERIT:
    const mtr = action.update.trait
    const mval = action.update.value
    const merit = state.merits[action.id]
    return { ...state, merits: {
      ...state.merits, [action.id]: {
        ...merit, [mtr]: mval } }
    }

  default:
    return state
  }
}
