// @flow
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { getPenalties } from './character.js'
import {
  getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter,
} from './charm.js'
import { entities } from './entities.js'
import * as calc from 'utils/calculated'
import decisiveAttack from 'utils/calculated/pools/combat/decisiveAttack.js'
import witheringAttack from 'utils/calculated/pools/combat/witheringAttack.js'
import parry from 'utils/calculated/ratings/parry.js'

const getState = state => state

const getWeapon = (state, id: number) => entities(state).weapons[id]

const getCharacterForWeapon = (state, id: number) =>
  entities(state).characters[getWeapon(state, id).character_id]

const getPenaltiesForWeapon = (state, id: number) =>
  getPenalties(state, getCharacterForWeapon(state, id).id)

const getExcellencyAbilsForWeapon = createSelector(
  [getCharacterForWeapon, getState],
  (character, state) =>
    calc.excellencyAbils(
      character,
      getNativeCharmsForCharacter(state, character.id).concat(
        getMartialArtsCharmsForCharacter(state, character.id)
      )
    )
)

// $FlowFixMe
export const getPoolsForWeapon = createCachedSelector(
  [
    getCharacterForWeapon,
    getWeapon,
    getPenaltiesForWeapon,
    getExcellencyAbilsForWeapon,
  ],
  (character, weapon, penalties, excellencyAbils) => ({
    name: weapon.name,
    witheringAttack: witheringAttack(
      character,
      weapon,
      penalties,
      excellencyAbils
    ),
    witheringDamage: calc.witheringDamage(character, weapon),
    decisiveAttack: decisiveAttack(
      character,
      weapon,
      penalties,
      excellencyAbils
    ),
    parry: parry(character, weapon, penalties, excellencyAbils),
    rangedWitheringAttack: calc.rangedWitheringAttackPool(
      character,
      weapon,
      penalties,
      excellencyAbils
    ),
  })
)((state, id) => id)

// This is absurd
export const sortByParry = (weaponA: Object, weaponB: Object) => {
  const parryA = weaponA.parry
  const parryB = weaponB.parry
  const specialtiesA =
    parryA.specialties === undefined ? [] : parryA.specialties
  const specialtiesB =
    parryB.specialties === undefined ? [] : parryB.specialties

  if (parryA.total > parryB.total) {
    return -1
  } else if (parryA.total < parryB.total) {
    return 1
  } else if (parryA.excellency > parryB.excellency) {
    return -1
  } else if (parryA.excellency < parryB.excellency) {
    return 1
  } else if (specialtiesA.length > specialtiesB.length) {
    return -1
  } else if (specialtiesA.length < specialtiesB.length) {
    return 1
  } else if (parryA.shield && !parryB.shield) {
    return -1
  } else if (!parryA.shield && parryB.shield) {
    return 1
  } else {
    return 0
  }
}
