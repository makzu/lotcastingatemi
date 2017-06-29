export {
  fetchCharacter, updateCharacter, createCharacter,
  updateWeapon, createWeapon, destroyWeapon,
  updateMerit, createMerit, destroyMerit,
  fetchChronicle,
  fetchQc, updateQc, createQc,
  updateQcAttack, createQcAttack, destroyQcAttack,
  updateQcMerit, createQcMerit, destroyQcMerit,
  createBattlegroup, updateBattlegroup, destroyBattlegroup,
  fetchCurrentPlayer
} from './entities'

export { login, loginAndFetch, logout, signup } from './account.js'

import { fetchCurrentPlayer, fetchChronicle } from './entities'

export const INIT = 'lca/app/INIT'

export function fetchAll() {
  return (dispatch, getState) => {
    dispatch(fetchCurrentPlayer())
      .then(() => {
        let ids = Reflect.ownKeys(getState().entities.chronicles)
        for (let id of ids) {
          dispatch(fetchChronicle(id))
        }
      })
  }
}

export function lcaInit() {
  return (dispatch, getState) => {
    if (getState().session.authenticated) {
      dispatch(fetchAll())
    }

    dispatch({ type: INIT })
  }
}
