import * as c from '../utils/constants'

const defaultState = {
  characters: {},
  weapons: {},
  merits: {},
  armors: {}
}

export default function CharacterReducer(state = defaultState, action) {
  switch (action.type) {
  case c.RECEIVE_CHAR:

    let newChar = { [action.id]: { ...action.character } }
    let weapons = {}
    let armors = {}
    let merits = {}

    newChar[action.id].weapons = action.character.weapons.map((e) => e.id )
    newChar[action.id].armors = action.character.armors.map((e) => e.id )
    newChar[action.id].merits = action.character.merits.map((e) => e.id )


    action.character.weapons.forEach((weapon) => weapons[weapon.id] = weapon )
    action.character.merits.forEach((merit) => merits[merit.id] = merit )
    action.character.armors.forEach((armor) => armors[armor.id] = armors )

    return {
      characters: { ...state.characters, ...newChar },
      weapons: { ...state.weapons, ...weapons },
      armors: { ...state.armors, ...armors },
      merits: { ...state.merits, ...merits }
    }


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
