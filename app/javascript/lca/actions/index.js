import fetch from 'isomorphic-fetch'

export { fetchCharacter, updateCharacter, createCharacter } from './_character.js'
export { updateWeapon, createWeapon, destroyWeapon } from './_weapon.js'
export { updateMerit } from './_merit.js'
export { fetchChronicle } from './_chronicle.js'
export { updateQc, createQc } from './_qc.js'
export { updateQcAttack, createQcAttack, destroyQcAttack } from './_qc_attack.js'
export { updateQcMerit, createQcMerit, destroyQcMerit } from './_qc_merit.js'

import * as c from '../utils/actionNames'

export function toggleMenu() {
  return function (dispatch) {
    dispatch({ type: c.TOGGLE_MENU })
  }
}
