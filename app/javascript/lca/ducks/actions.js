export {
  updateCharacter, updateCharacterMulti, createCharacter, destroyCharacter,
  updateWeapon, createWeapon, destroyWeapon,
  updateMerit, createMerit, destroyMerit,
  updateCharm, createCharm, destroyCharm,
  updateSpell, createSpell, destroySpell,
  updateChronicle, createChronicle,
  joinChronicle, regenChronicleInviteCode, removePlayerFromChronicle,
  addThingToChronicle, removeThingFromChronicle,
  updateQc, updateQcMulti, createQc, destroyQc,
  updateQcAttack, createQcAttack, destroyQcAttack,
  updateQcMerit, createQcMerit, destroyQcMerit,
  updateQcCharm, createQcCharm, destroyQcCharm,
  createBattlegroup, updateBattlegroup, destroyBattlegroup,
  fetchCurrentPlayer, updatePlayer,
} from './entities'

export { logout } from './session.js'
export { closeDrawer, toggleDrawer, switchTheme } from './app.js'
export { spendMotes, spendWillpower, takeDamage } from './events.js'

import { fetchCurrentPlayer, fetchAllChronicles, fetchCharacter, } from './entities'
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
    if (window.location.pathname.startsWith('/characters/'))
      dispatch(fetchCharacter(window.location.pathname.split('/')[2]))
  }
}
