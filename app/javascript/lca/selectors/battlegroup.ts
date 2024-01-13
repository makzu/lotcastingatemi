import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import {
  getSpecificBattlegroup as getBattlegroup,
  amIStOfBattlegroup,
  doIOwnBattlegroup,
} from '@/ducks/entities/battlegroup'
import { bgJoinBattlePool } from '../utils/calculated/_battlegroups'
import { getQcAttacks } from './qc'

/** @deprecated use export from 'ducks' instead */
export const getSpecificBattlegroup = getBattlegroup

export const getAttacksForBattlegroup = createCachedSelector(
  [getBattlegroup, getQcAttacks],
  (bg, attacks) => bg.qc_attacks.map((m) => attacks[m]),
)((state, id) => id)

export const canISeeBattlegroup = createSelector(
  [getBattlegroup, doIOwnBattlegroup, amIStOfBattlegroup],
  (battlegroup, doI, amI) => !battlegroup.hidden || doI || amI,
)

export const getPoolsAndRatingsForBattlegroup = (
  state: WrappedEntityState,
  id: number,
) => ({ joinBattle: bgJoinBattlePool(getBattlegroup(state, id)) })
