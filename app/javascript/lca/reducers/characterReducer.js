import { normalize, schema } from 'normalizr'

import * as c from '../utils/constants'

const defaultState = {
  characters: {},
  weapons: {},
  merits: {},
  armors: {}
}
const weapon = new schema.Entity('weapons')
const armor = new schema.Entity('armors')
const merit = new schema.Entity('merits')
const character = new schema.Entity('characters', {
  weapons: [ weapon ],
  armors: [ armor ],
  merits: [ merit ]
})

function _receive_char(state, action) {
  const newState = normalize(action.character, character)

  const id = newState.result
  const newChar = newState.entities.characters
  const newWeapons = newState.entities.weapons
  const newArmors = newState.entities.armors
  const newMerits = newState.entities.merits

  return {
    characters: { ...state.characters, ...newChar },
    weapons: { ...state.weapons, ...newWeapons },
    armors: { ...state.armors, ...newArmors },
    merits: { ...state.merits, ...newMerits }
  }
}

export default function CharacterReducer(state = defaultState, action) {
  switch (action.type) {
  case c.RECEIVE_CHAR:
    return _receive_char(state, action)

  case c.UPDATE_CHAR:
    const tr = action.update.trait
    const val = action.update.value
    const char = state.characters[action.id]
    return {... state, characters: {
      ...state.characters, [action.id]: {
        ...char, [tr]: val } }
    }

  case c.UPDATE_WEAP:
    const wtr = action.update.trait
    const wval = action.update.value
    const weap = state.weapons[action.id]
    return { ...state, weapons: {
      ...state.weapons, [action.id]: {
        ...weap, [wtr]: wval } }
    }
  default:
    return state
  }
}
