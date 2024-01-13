import { createSelector } from 'reselect'

import { unwrapped } from '@/ducks/entities/_lib'
import { getSpecificBattlegroup } from '@/ducks/entities/battlegroup'
import { getCurrentPlayer } from '@/ducks/entities/player'

// export const canIEditBattlegroup = createSelector(
//   [doIOwnBattlegroup, amIStOfBattlegroup],
//   (doI, amI) => doI || amI,
// )

// export const canIDeleteBattlegroup = doIOwnBattlegroup
