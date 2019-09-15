import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { Weapon } from 'types'
import { sortOrderSort } from 'utils'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'

export default createTraitReducer('weapon')

export const [createWeapon, updateWeapon, destroyWeapon] = createApiActions(
  'weapon'
)

const getState = (s: State) => s

export const getSpecificWeapon = (state: State, id: number): Weapon =>
  unwrapped(state).weapons[id]

export const getWeaponIDsForCharacter = (state: State, id: number) =>
  getSpecificCharacter(state, id).weapons

export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) => {
    if (character == null) {
      return null
    }
    return character.weapons
      .map(w => getSpecificWeapon(state, w))
      .sort(sortOrderSort)
  }
)((s: State, i: number) => i)
