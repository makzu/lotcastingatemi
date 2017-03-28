import fetch from 'isomorphic-fetch'

export { fetchCharacter, updateCharacter, createCharacter } from './_character.js'
export { updateWeapon } from './_weapon.js'
export { updateMerit } from './_merit.js'
export { fetchChronicle } from './_chronicle.js'
export { updateQc, createQc } from './_qc.js'

import * as c from '../utils/actionNames'

export function toggleMenu() {
  return function (dispatch) {
    dispatch({ type: c.TOGGLE_MENU })
  }
}
