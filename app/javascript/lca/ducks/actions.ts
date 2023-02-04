import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

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
import store, { AppDispatch, RootState } from 'store'

export const INIT = 'lca/app/INIT'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export function fetchAll() {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
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
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({ type: INIT })

    if (getState().session.authenticated) {
      dispatch(fetchAll())
    }
  }
}
