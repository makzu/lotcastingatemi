export { fetchCharacter, updateCharacter, createCharacter } from './entities'
export { updateWeapon, createWeapon, destroyWeapon } from './entities'
export { updateMerit, createMerit, destroyMerit } from './entities'
export { fetchChronicle } from './entities'
export { fetchQc, updateQc, createQc } from './entities'
export { updateQcAttack, createQcAttack, destroyQcAttack } from './entities'
export { updateQcMerit, createQcMerit, destroyQcMerit } from './entities'
export { login, logout, signup } from './account.js'
export { fetchCurrentPlayer } from './entities'

import * as c from '../utils/actionNames'

export function toggleMenu() {
  return function (dispatch) {
    dispatch({ type: c.TOGGLE_MENU })
  }
}
