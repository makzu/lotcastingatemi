export {
  fetchCharacter, updateCharacter, createCharacter,
  updateWeapon, createWeapon, destroyWeapon,
  updateMerit, createMerit, destroyMerit,
  fetchChronicle,
  fetchQc, updateQc, createQc,
  updateQcAttack, createQcAttack, destroyQcAttack,
  updateQcMerit, createQcMerit, destroyQcMerit,
  fetchCurrentPlayer
} from './entities'

export { login, loginAndFetch, logout, signup } from './account.js'

import { fetchCurrentPlayer } from './entities'

export const INIT = 'lca/app/INIT'

export function lcaInit() {
  return (dispatch, getState) => {
    if (getState().session.authenticated) {
      dispatch(fetchCurrentPlayer())
    }

    dispatch({ type: INIT })
  }
}
