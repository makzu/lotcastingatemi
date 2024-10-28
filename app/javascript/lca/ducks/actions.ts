import {
  createAction,
  type AnyAction,
  type ThunkAction,
} from '@reduxjs/toolkit'

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

import { type GetState, type AppDispatch, type RootState } from 'store'
import {
  fetchAllCharacters,
  fetchCurrentPlayer,
  fetchAllQcs,
  fetchAllBattlegroups,
} from './entities'
import UpdatesCable from '@/utils/cable'

export const INIT = 'lca/app/INIT'
const initAction = createAction('lca/INIT')

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export function fetchAll() {
  return () => void 0
  // return (dispatch: AppDispatch, getState: GetState) => {
  // void dispatch(fetchCurrentPlayer())
  // .then(() => dispatch(fetchAllCharacters()))
  // .then(() => dispatch(fetchAllQcs()))
  // .then(() => dispatch(fetchAllBattlegroups()))
  // .then(() => {
  //   UpdatesCable.subscribe(getState, (data) =>
  //     dispatch({ type: 'lca/cable/RECEIVED', payload: data }),
  //   )
  // })
  // }
}

export function lcaInit() {
  return (dispatch: AppDispatch, getState: GetState) => {
    dispatch(initAction())

    if (getState().session.authenticated) {
      dispatch(fetchAll())
    }
  }
}
