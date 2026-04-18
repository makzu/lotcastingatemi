import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { entities, getCurrentPlayer } from './entities'
import { RootState } from 'store'
import { sortOrderSort } from 'utils'
import { woundPenalty } from 'utils/calculated'
import { appearanceRating } from 'utils/calculated/ratings'
import { qcPool, qcRating } from 'utils/calculated/_qcs'

export const getSpecificQc = (state: RootState, id: number) =>
  entities(state).qcs[id]
const qcIdMemoizer = (state: RootState, id: number) => id

const getQcMerits = (state: RootState) => entities(state).qc_merits

export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (qc, merits) => qc.qc_merits.map((m) => merits[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcAttacks = (state: RootState) => entities(state).qc_attacks

export const getAttacksForQc = createCachedSelector(
  [getSpecificQc, getQcAttacks],
  (qc, attacks) => qc.qc_attacks.map((m) => attacks[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcCharms = (state: RootState) => entities(state).qc_charms

export const getCharmsForQc = createCachedSelector(
  [getSpecificQc, getQcCharms],
  (qc, charms) => qc.qc_charms.map((m) => charms[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getPenaltiesForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc],
  (character, merits) => {
    const meritNames = merits.map((m) => m.name.toLowerCase())
    return {
      onslaught: character.onslaught,
      wound: woundPenalty(character, meritNames),
    }
  },
)(qcIdMemoizer)

export const getPoolsAndRatingsForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc, getPenaltiesForQc],
  (qc, merits, penalties) => {
    const meritNames = [...new Set(merits.map((m) => m.name.toLowerCase()))]
    const tiny = meritNames.some((m) =>
      m.toLowerCase().includes('tiny creature'),
    )
      ? [{ label: 'tiny creature', bonus: 2, situational: true }]
      : undefined

    return {
      guile: qcRating(qc, qc.guile, penalties.wound),
      resolve: qcRating(qc, qc.resolve, penalties.wound),
      appearance: appearanceRating(
        { attr_appearance: qc.appearance },
        meritNames,
      ),

      evasion: qcRating(
        qc,
        qc.evasion,
        penalties.wound + penalties.onslaught,
        tiny,
      ),
      parry: qcRating(qc, qc.parry, penalties.wound + penalties.onslaught),
      senses: qcPool(qc, qc.senses, penalties.wound),
      joinBattle: qcPool(qc, qc.join_battle, penalties.wound),
      shapeSorcery: qcPool(qc, qc.shape_sorcery, penalties.wound),
      featsOfStrength: qcPool(qc, qc.feats_of_strength, penalties.wound, [
        { label: `str ${qc.strength} feats`, bonus: 0 },
      ]),
    }
  },
)(qcIdMemoizer)

export const doIOwnQc = createSelector(
  [getCurrentPlayer, getSpecificQc],
  (player, qc) => qc !== undefined && player.id === qc.player_id,
)

export const amIStOfQc = createSelector(
  [getCurrentPlayer, getSpecificQc, entities],
  (player, qc, ents) =>
    qc != null &&
    qc.chronicle_id != null &&
    ents.chronicles[qc.chronicle_id] &&
    ents.chronicles[qc.chronicle_id].st_id === player.id,
)

export const canISeeQc = createSelector(
  [getSpecificQc, doIOwnQc, amIStOfQc],
  (qc, doI, amI) => !qc.hidden || doI || amI,
)

export const canIEditQc = createSelector(
  [doIOwnQc, amIStOfQc],
  (doI, amI) => doI || amI,
)

export const canIDeleteQc = doIOwnQc
