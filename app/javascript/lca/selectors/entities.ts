import type { OutputSelector } from 'reselect'
import { createSelector } from 'reselect'
import { sortOrderSort } from 'utils'
import type { EntityState, WrappedEntityState } from 'ducks/entities'
import type { Player, Character, fullQc, Battlegroup } from 'utils/flow-types'
export type entitySelector<T> = OutputSelector<WrappedEntityState, any, T>
type CharacterListSelector = entitySelector<Character[]>
type QcListSelector = entitySelector<fullQc[]>
type BgListSelector = entitySelector<Battlegroup[]>
export const entities = (state: WrappedEntityState): EntityState =>
  state.entities.current
export const getSpecificPlayer = (
  state: WrappedEntityState,
  id: number,
): Player => ({
  characters: [],
  qcs: [],
  battlegroups: [],
  chronicles: [],
  own_chronicles: [],
  ...entities(state).players[id],
})
export const getCurrentPlayer = (state: WrappedEntityState): Player =>
  getSpecificPlayer(state, state.session.id)

const getCharacters = (state) => entities(state).characters

export const getMyCharacters: CharacterListSelector = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters.map((c) => characters[c]).sort(sortOrderSort),
)
export const getMyCharactersWithoutChronicles: CharacterListSelector =
  createSelector([getMyCharacters], (characters) =>
    characters.filter((c) => c.chronicle_id == null),
  )

const getQCs = (state) => entities(state).qcs

export const getMyQCs: QcListSelector = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) =>
    currentPlayer.qcs.map((c) => qcs[c]).sort(sortOrderSort),
)
export const getMyQcsWithoutChronicles: QcListSelector = createSelector(
  [getMyQCs],
  (qcs) => qcs.filter((c) => c.chronicle_id == null),
)

const getBattlegroups = (state) => entities(state).battlegroups

export const getMyBattlegroups: BgListSelector = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map((c) => battlegroups[c]).sort(sortOrderSort),
)
export const getMyBattlegroupsWithoutChronicles: BgListSelector =
  createSelector([getMyBattlegroups], (battlegroups) =>
    battlegroups.filter((c) => c.chronicle_id == null),
  )
