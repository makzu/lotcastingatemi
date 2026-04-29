export { switchTheme } from './app.js'
export {
  addThingToChronicle,
  changeCharacterType,
  createBattlegroup,
  createBattlegroupFromQc,
  createCharacter,
  createCharm,
  createChronicle,
  createMerit,
  createPoison,
  createQc,
  createQcAttack,
  createQcCharm,
  createQcMerit,
  createSpell,
  createWeapon,
  destroyAccount,
  destroyBattlegroup,
  destroyCharacter,
  destroyCharm,
  destroyChronicle,
  destroyMerit,
  destroyPoison,
  destroyQc,
  destroyQcAttack,
  destroyQcCharm,
  destroyQcMerit,
  destroySpell,
  destroyWeapon,
  duplicateBattlegroup,
  duplicateCharacter,
  duplicateQc,
  fetchBattlegroup,
  fetchCharacter,
  fetchChronicle,
  fetchCurrentPlayer,
  fetchQc,
  joinChronicle,
  regenChronicleInviteCode,
  removePlayerFromChronicle,
  removeThingFromChronicle,
  updateBattlegroup,
  updateCharacter,
  updateCharm,
  updateChronicle,
  updateMerit,
  updatePlayer,
  updatePoison,
  updateQc,
  updateQcAttack,
  updateQcCharm,
  updateQcMerit,
  updateSpell,
  updateWeapon,
} from './entities'
export { spendMotes, spendWillpower, takeDamage } from './events'
export { logout } from './session'

import type { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import type { Dispatch } from 'redux'

import type { State } from '@lca/ducks'
import UpdatesCable from 'utils/cable.js'
import {
  fetchAllBattlegroups,
  fetchAllCharacters,
  fetchAllQcs,
  fetchCurrentPlayer,
} from './entities'

export const INIT = 'lca/app/INIT'

export function fetchAll(): ThunkAction<void, State, unknown, AnyAction> {
  return (dispatch: Dispatch, getState) => {
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

export function lcaInit(): ThunkAction<void, State, unknown, AnyAction> {
  return (dispatch, getState) => {
    dispatch({ type: INIT })

    if (getState().session?.authenticated) {
      dispatch(fetchAll())
    }
  }
}
