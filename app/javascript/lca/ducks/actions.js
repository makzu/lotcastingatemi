export { fetchCharacter, updateCharacter, createCharacter } from './character.js'
export { updateWeapon, createWeapon, destroyWeapon } from './weapon.js'
export { updateMerit, createMerit, destroyMerit } from './merit.js'
export { fetchChronicle } from './chronicle.js'
export { fetchQc, updateQc, createQc } from './qc.js'
export { updateQcAttack, createQcAttack, destroyQcAttack } from './qc_attack.js'
export { updateQcMerit, createQcMerit, destroyQcMerit } from './qc_merit.js'
export { login, logout, signup } from './account.js'
export { fetchCurrentPlayer } from './player.js'

import * as c from '../utils/actionNames'

export function toggleMenu() {
  return function (dispatch) {
    dispatch({ type: c.TOGGLE_MENU })
  }
}
