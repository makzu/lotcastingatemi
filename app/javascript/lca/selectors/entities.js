// @flow
import { createSelector, type OutputSelector } from 'reselect'
import { sortOrderSort } from 'utils'
import type { EntityState, WrappedEntityState } from 'ducks/entities'
import type { Player, Character, fullQc, Battlegroup } from 'utils/flow-types'

export type entitySelector<T> = OutputSelector<WrappedEntityState, number, T>
type CharacterListSelector = entitySelector<Array<Character>>
type QcListSelector = entitySelector<Array<fullQc>>
type BgListSelector = entitySelector<Array<Battlegroup>>

export const entities = (state: WrappedEntityState): EntityState =>
  state.entities.current

export const getSpecificPlayer = (
  state: WrappedEntityState,
  id: number
): Player => entities(state).players[id]

export const getCurrentPlayer = (state: WrappedEntityState): Player =>
  getSpecificPlayer(state, state.session.id)

const getCharacters = state => entities(state).characters

export const getMyCharacters: CharacterListSelector = createSelector(
  [getCurrentPlayer, getCharacters],
  (currentPlayer, characters) =>
    currentPlayer.characters == null
      ? []
      : currentPlayer.characters.map(c => characters[c]).sort(sortOrderSort)
)

export const getMyPinnedCharacters: CharacterListSelector = createSelector(
  [getMyCharacters],
  characters => characters.filter(c => c.pinned)
)

export const getMyCharactersWithoutChronicles: CharacterListSelector = createSelector(
  [getMyCharacters],
  characters => characters.filter(c => c.chronicle_id == undefined)
)

const getQCs = state => entities(state).qcs

export const getMyQCs: QcListSelector = createSelector(
  [getCurrentPlayer, getQCs],
  (currentPlayer, qcs) => currentPlayer.qcs.map(c => qcs[c]).sort(sortOrderSort)
)

export const getMyPinnedQCs: QcListSelector = createSelector(
  [getMyQCs],
  qcs => qcs.filter(c => c.pinned)
)

export const getMyQcsWithoutChronicles: QcListSelector = createSelector(
  [getMyQCs],
  qcs => qcs.filter(c => c.chronicle_id == undefined)
)

const getBattlegroups = state => entities(state).battlegroups

export const getMyBattlegroups: BgListSelector = createSelector(
  [getCurrentPlayer, getBattlegroups],
  (currentPlayer, battlegroups) =>
    currentPlayer.battlegroups.map(c => battlegroups[c]).sort(sortOrderSort)
)

export const getMyPinnedBattlegroups: BgListSelector = createSelector(
  [getMyBattlegroups],
  battlegroups => battlegroups.filter(c => c.pinned)
)

export const getMyBattlegroupsWithoutChronicles: BgListSelector = createSelector(
  [getMyBattlegroups],
  battlegroups => battlegroups.filter(c => c.chronicle_id == undefined)
)
