export {
  fetchCharacter, updateCharacter, createCharacter,
  updateWeapon, createWeapon, destroyWeapon,
  updateMerit, createMerit, destroyMerit,
  updateCharm, createCharm, destroyCharm,
  updateSpell, createSpell, destroySpell,
  fetchChronicle, updateChronicle, createChronicle,
  joinChronicle, regenChronicleInviteCode, removePlayerFromChronicle,
  addThingToChronicle,
  fetchQc, updateQc, createQc,
  updateQcAttack, createQcAttack, destroyQcAttack,
  updateQcMerit, createQcMerit, destroyQcMerit,
  updateQcCharm, createQcCharm, destroyQcCharm,
  createBattlegroup, updateBattlegroup, destroyBattlegroup,
  fetchCurrentPlayer, updatePlayer,
} from './entities'

export { logout } from './account.js'
export { closeDrawer, toggleDrawer, switchTheme } from './app.js'

import { fetchCurrentPlayer, fetchAllChronicles } from './entities'
import UpdatesCable from '../utils/cable.js'

export const INIT = 'lca/app/INIT'

export function fetchAll() {
  return (dispatch, getState) => {
    dispatch(fetchCurrentPlayer())
      .then(() => dispatch(fetchAllChronicles()))
      .then(() => {
        UpdatesCable.subscribe(
          getState,
          (data) => dispatch({ type: 'lca/cable/RECEIVED', payload: data }))
      })
  }
}

export function lcaInit() {
  return (dispatch, getState) => {
    dispatch({ type: INIT })

    if (getState().session.authenticated) {
      dispatch(fetchAll())
    }
  }
}
