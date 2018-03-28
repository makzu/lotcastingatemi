import { createSelector } from 'reselect'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const getSpecificBattlegroup = (state, id) => state.entities.battlegroups[id]

export const canIEditBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup, getState],
  (player, character, state) => {
    if (player.id === character.player_id)
      return true

    if (
      character.chronicle_id &&
      state.entities.chronicles[character.chronicle_id] &&
      state.entities.chronicles[character.chronicle_id].st_id === player.id
    )
      return true

    return false
  }
)

export const canIDeleteBattlegroup = createSelector(
  [getCurrentPlayer, getSpecificBattlegroup],
  (player, character) => (player.id === character.player_id)
)
