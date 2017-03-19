import { normalize, schema } from 'normalizr'

import * as c from '../utils/constants'

const defaultState = {
  characters: {},
  weapons: {},
  merits: {}
}
const weapon = new schema.Entity('weapons')
const merit = new schema.Entity('merits')
const character = new schema.Entity('characters', {
  weapons: [ weapon ],
  merits: [ merit ]
})

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
