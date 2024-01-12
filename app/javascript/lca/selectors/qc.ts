import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { entities, getCurrentPlayer } from './entities'
import { isDefined, sortOrderSort } from 'utils'
import * as calc from 'utils/calculated/'
import { WrappedEntityState } from 'ducks/entities'

export const getSpecificQc = (state: WrappedEntityState, id: number) =>
  entities(state).qcs[id]

const qcIdMemoizer = (_state: WrappedEntityState, id: number) => id

const getQcMerits = (state: WrappedEntityState) => entities(state).qc_merits

export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (qc, merits) =>
    // @ts-expect-error TODO fix this
    (qc?.qc_merits ?? []).map((m) => merits[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcAttacks = (state: WrappedEntityState) =>
  entities(state).qc_attacks

export const getAttacksForQc = createCachedSelector(
  [getSpecificQc, getQcAttacks],
  (qc, attacks) =>
    (qc?.qc_attacks ?? [])
      .map((m) => attacks[m])
      .filter(isDefined)
      .sort(sortOrderSort),
)(qcIdMemoizer)

export const getQcCharms = (state: WrappedEntityState) =>
  entities(state).qc_charms

export const getCharmsForQc = createCachedSelector(
  [getSpecificQc, getQcCharms],
  // @ts-expect-error TODO fix this
  (qc, charms) => qc.qc_charms.map((m) => charms[m]).sort(sortOrderSort),
)(qcIdMemoizer)

export const getPenaltiesForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc],
  (character, merits) => {
    // @ts-expect-error TODO fix this
    const meritNames = merits.map((m) => m.name.toLowerCase())
    return {
      // @ts-expect-error TODO fix this
      onslaught: character.onslaught,
      // @ts-expect-error TODO fix this
      wound: calc.woundPenalty(character, meritNames),
    }
  },
)(qcIdMemoizer)

export const getPoolsAndRatingsForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc, getPenaltiesForQc],
  (qc, merits, penalties) => {
    if (qc === undefined) {
      return {}
    }

    // @ts-expect-error TODO fix this
    const meritNames = [...new Set(merits.map((m) => m.name.toLowerCase()))]
    const tiny = meritNames.some((m) =>
      m.toLowerCase().includes('tiny creature'),
    )
      ? [
          {
            label: 'tiny creature',
            bonus: 2,
            situational: true,
          },
        ]
      : undefined
    return {
      guile: calc.qcRating(qc, qc.guile, penalties.wound),
      resolve: calc.qcRating(qc, qc.resolve, penalties.wound),
      appearance: calc.appearanceRating(
        {
          attr_appearance: qc.appearance,
        },
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
        {
          label: `str ${qc.strength} feats`,
          bonus: 0,
        },
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
    qc?.chronicle_id != null &&
    ents.chronicles[qc.chronicle_id] &&
    // @ts-expect-error TODO fix this
    ents.chronicles[qc.chronicle_id].st_id === player.id,
)

export const canISeeQc = createSelector(
  [getSpecificQc, doIOwnQc, amIStOfQc],
  // @ts-expect-error TODO fix this
  (qc, doI, amI) => !qc.hidden || doI || amI,
)

export const canIEditQc = createSelector(
  [doIOwnQc, amIStOfQc],
  (doI, amI) => doI || amI,
)
export const canIDeleteQc = doIOwnQc
