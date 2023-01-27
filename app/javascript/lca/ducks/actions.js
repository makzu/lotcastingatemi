// @flow
export {
  createCharacter,
  duplicateCharacter,
  fetchCharacter,
  updateCharacter,
  changeCharacterType,
  destroyCharacter,
  updateWeapon,
  createWeapon,
  destroyWeapon,
  updateMerit,
  createMerit,
  destroyMerit,
  updateCharm,
  createCharm,
  destroyCharm,
  updateSpell,
  createSpell,
  destroySpell,
  fetchChronicle,
  updateChronicle,
  createChronicle,
  joinChronicle,
  regenChronicleInviteCode,
  removePlayerFromChronicle,
  addThingToChronicle,
  removeThingFromChronicle,
  destroyChronicle,
  createQc,
  updateQc,
  duplicateQc,
  fetchQc,
  destroyQc,
  updateQcAttack,
  createQcAttack,
  destroyQcAttack,
  updateQcMerit,
  createQcMerit,
  destroyQcMerit,
  updateQcCharm,
  createQcCharm,
  destroyQcCharm,
  createBattlegroup,
  createBattlegroupFromQc,
  duplicateBattlegroup,
  fetchBattlegroup,
  updateBattlegroup,
  destroyBattlegroup,
  fetchCurrentPlayer,
  updatePlayer,
  destroyAccount,
  createPoison,
  updatePoison,
  destroyPoison,
} from './entities'

export { logout } from './session'
export { spendMotes, spendWillpower, takeDamage } from './events'

import {
  fetchAllCharacters,
  fetchCurrentPlayer,
  fetchAllQcs,
  fetchAllBattlegroups,
} from './entities'
import UpdatesCable from 'utils/cable.js'

export const INIT = 'lca/app/INIT'

export function fetchAll() {
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchCurrentPlayer())
      .then(() => dispatch(fetchAllCharacters()))
      .then(() => dispatch(fetchAllQcs()))
      .then(() => dispatch(fetchAllBattlegroups()))
      .then(() => {
        UpdatesCable.subscribe(getState, (data) =>
          dispatch({ type: 'lca/cable/RECEIVED', payload: data }),
        )
      })
  }
}

export function lcaInit() {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: INIT })

    if (getState().session.authenticated) {
      dispatch(fetchAll())
    }
  }
}
