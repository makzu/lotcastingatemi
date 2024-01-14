import createCachedSelector from 're-reselect'

import { isDefined, sortOrderSort } from 'utils'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'
import type { RootState } from 'store'

export default createTraitReducer('weapon')

export const [createWeapon, updateWeapon, destroyWeapon] =
  createApiActions('weapon')

const getState = (s: RootState) => s

export const getSpecificWeapon = (state: RootState, id: number) =>
  unwrapped(state).weapons[id]

export const getWeaponIDsForCharacter = (state: RootState, id: number) =>
  getSpecificCharacter(state, id)?.weapons ?? []

export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) => {
    return (character?.weapons ?? [])
      .map((w) => getSpecificWeapon(state, w))
      .filter(isDefined)
      .sort(sortOrderSort)
  },
)((s: RootState, i: number) => i)
