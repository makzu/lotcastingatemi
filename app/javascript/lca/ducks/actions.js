export {
  fetchCharacter, updateCharacter, createCharacter,
  updateWeapon, createWeapon, destroyWeapon,
  updateMerit, createMerit, destroyMerit,
  updateCharm, createCharm, destroyCharm,
  fetchChronicle, updateChronicle, createChronicle,
  fetchQc, updateQc, createQc,
  updateQcAttack, createQcAttack, destroyQcAttack,
  updateQcMerit, createQcMerit, destroyQcMerit,
  updateQcCharm, createQcCharm, destroyQcCharm,
  createBattlegroup, updateBattlegroup, destroyBattlegroup,
  fetchCurrentPlayer, updatePlayer,
} from './entities'

export { logout } from './account.js'
export { toggleDrawer, switchTheme } from './app.js'

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
