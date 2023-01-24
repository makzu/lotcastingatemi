import createCachedSelector from 're-reselect'

import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'
import { RootState } from 'store'
import { Weapon } from 'types'
import { sortOrderSort } from 'utils'

export default createTraitReducer('weapon')

export const [createWeapon, updateWeapon, destroyWeapon] =
  createApiActions('weapon')

const getState = (s: RootState) => s

export const getSpecificWeapon = (state: RootState, id: number): Weapon =>
  unwrapped(state).weapons[id]

export const getWeaponIDsForCharacter = (state: RootState, id: number) =>
  getSpecificCharacter(state, id).weapons

export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) => {
    if (character == null) {
      return []
    }
    return character.weapons
      .map((w) => getSpecificWeapon(state, w))
      .sort(sortOrderSort)
  },
)((s: RootState, i: number) => i)
