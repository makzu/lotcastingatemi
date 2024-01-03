import { createAction } from '@reduxjs/toolkit'
import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { Weapon } from 'types'
import { sortOrderSort } from 'utils'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { EntityState } from './_types'
import { getSpecificCharacter } from './character'

export const updateWeaponSort = createAction<{ id: number; sorting: number }>(
  'sort/weapon',
)

export default createTraitReducer('weapon', undefined, {
  [updateWeaponSort.toString()]: (
    state: EntityState,
    action: ReturnType<typeof updateWeaponSort>,
  ) => {
    const { id, sorting } = action.payload
    state.weapons[id].sorting = sorting
  },
})

export const [createWeapon, updateWeapon, destroyWeapon] =
  createApiActions('weapon')

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
      .map((w) => getSpecificWeapon(state, w))
      .sort(sortOrderSort)
  },
)((s: State, i: number) => i)
