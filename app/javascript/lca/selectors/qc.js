// @flow
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { entities, getCurrentPlayer, type entitySelector } from './entities.js'
import { sortOrderSort } from 'utils'
import * as calc from 'utils/calculated/'

export const getSpecificQc = (state: Object, id: number) =>
  entities(state).qcs[id]
const qcIdMemoizer = (state, id) => id

const getQcMerits = (state) => entities(state).qc_merits

// $FlowFixMe
export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (qc, merits) => qc.qc_merits.map((m) => merits[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcAttacks = (state: Object) => entities(state).qc_attacks

// $FlowFixMe
export const getAttacksForQc = createCachedSelector(
  [getSpecificQc, getQcAttacks],
  (qc, attacks) => qc.qc_attacks.map((m) => attacks[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcCharms = (state: Object) => entities(state).qc_charms

// $FlowFixMe
export const getCharmsForQc = createCachedSelector(
  [getSpecificQc, getQcCharms],
  (qc, charms) => qc.qc_charms.map((m) => charms[m]).sort(sortOrderSort),
)(qcIdMemoizer)

// $FlowFixMe
export const getPenaltiesForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc],
  (character, merits) => {
    const meritNames = merits.map((m) => m.name.toLowerCase())
    return {
      onslaught: character.onslaught,
      wound: calc.woundPenalty(character, meritNames),
    }
  },
)(qcIdMemoizer)

// $FlowFixMe
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
      guile: calc.qcRating(qc, qc.guile, penalties.wound),
      resolve: calc.qcRating(qc, qc.resolve, penalties.wound),
      appearance: calc.appearanceRating(
        { attr_appearance: qc.appearance },
        meritNames,
      ),

      evasion: calc.qcRating(
        qc,
        qc.evasion,
        penalties.wound + penalties.onslaught,
        tiny,
      ),
      parry: calc.qcRating(qc, qc.parry, penalties.wound + penalties.onslaught),
      senses: calc.qcPool(qc, qc.senses, penalties.wound),
      joinBattle: calc.qcPool(qc, qc.join_battle, penalties.wound),
      shapeSorcery: calc.qcPool(qc, qc.shape_sorcery, penalties.wound),
      featsOfStrength: calc.qcPool(qc, qc.feats_of_strength, penalties.wound, [
        { label: `str ${qc.strength} feats`, bonus: 0 },
      ]),
    }
  },
)(qcIdMemoizer)

export const doIOwnQc: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificQc],
  (player, qc) => qc !== undefined && player.id === qc.player_id,
)

export const amIStOfQc: entitySelector<boolean> = createSelector(
  [getCurrentPlayer, getSpecificQc, entities],
  (player, qc, ents) =>
    qc != null &&
    qc.chronicle_id != null &&
    ents.chronicles[qc.chronicle_id] &&
    ents.chronicles[qc.chronicle_id].st_id === player.id,
)

export const canISeeQc: entitySelector<boolean> = createSelector(
  [getSpecificQc, doIOwnQc, amIStOfQc],
  (qc, doI, amI) => !qc.hidden || doI || amI,
)

export const canIEditQc: entitySelector<boolean> = createSelector(
  [doIOwnQc, amIStOfQc],
  (doI, amI) => doI || amI,
)

export const canIDeleteQc = doIOwnQc
