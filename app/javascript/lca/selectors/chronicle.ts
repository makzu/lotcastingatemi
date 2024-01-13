import createCachedSelector from 're-reselect'

import { chronicleSortOrderSort, isDefined } from 'utils'
import { canISeeBattlegroup } from './battlegroup'
import { canISeeCharacter } from './character'
import { entities, getCurrentPlayer } from './entities'
import { canISeeQc } from './qc'
import { RootState } from '@/store'

const getState = (state: RootState) => state

export const getSpecificChronicle = (state, id: number) =>
  entities(state).chronicles[id]

const idMemoizer = (_state, id) => id

const getPlayers = (state: RootState) => entities(state).players

export const isChronicleLoaded = (state, id: number) =>
  getSpecificChronicle(state, id)?.st != null

export const getPlayersForChronicle = createCachedSelector(
  [getSpecificChronicle, getPlayers],
  (chronicle, players) =>
    (chronicle?.players ?? []).map((c) => players[c]).filter(isDefined) ?? [],
)(idMemoizer)

export const getStorytellerForChronicle = createCachedSelector(
  [getSpecificChronicle, getPlayers],
  (chronicle, players) => chronicle?.st_id && players[chronicle.st_id],
)(idMemoizer)

const getCharacters = (state: RootState) => entities(state).characters

export const getCharactersForChronicle = createCachedSelector(
  [getSpecificChronicle, getCharacters, getState],
  (chronicle, characters, state) =>
    (chronicle?.characters ?? [])
      .map((c) => characters[c])
      .filter(isDefined)
      .filter((c) => canISeeCharacter(state, c.id))
      .sort(chronicleSortOrderSort) ?? [],
)(idMemoizer)

const getQcs = (state: RootState) => entities(state).qcs

export const getQcsForChronicle = createCachedSelector(
  [getSpecificChronicle, getQcs, getState],
  (chronicle, qcs, state) =>
    (chronicle?.qcs ?? [])
      .map((c) => qcs[c])
      .filter(isDefined)
      .filter((c) => canISeeQc(state, c.id))
      .sort(chronicleSortOrderSort) || [],
)(idMemoizer)

const getBattlegroups = (state: RootState) => entities(state).battlegroups

export const getBattlegroupsForChronicle = createCachedSelector(
  [getSpecificChronicle, getBattlegroups, getState],
  (chronicle, battlegroups, state) =>
    (chronicle?.battlegroups ?? [])
      .map((c) => battlegroups[c])
      .filter(isDefined)
      .filter((c) => canISeeBattlegroup(state, c.id))
      .sort(chronicleSortOrderSort),
)(idMemoizer)

export const amIStOfChronicle = createCachedSelector(
  [getCurrentPlayer, getSpecificChronicle],
  (player, chronicle) => chronicle?.st_id && player?.id === chronicle.st_id,
)((state, id) => (getSpecificChronicle(state, id) ?? { st_id: 0 }).st_id)
