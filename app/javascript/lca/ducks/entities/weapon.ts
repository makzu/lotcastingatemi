import { createAction } from '@reduxjs/toolkit'
import { createCachedSelector } from 're-reselect'

import type { RootState } from '@lca/store.ts'
import type { Weapon } from '@lca/types/index.ts'
import { sortOrderSort } from '@lca/utils/index.ts'
import { unwrapped } from './_lib.ts'
import { createApiActions, createTraitReducer } from './_trait.ts'
import type { EntityState } from './_types.ts'
import { getSpecificCharacter } from './character.ts'

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

export const getSpecificWeapon = (state: RootState, id: number): Weapon =>
  unwrapped(state).weapons[id]

export const getWeaponIDsForCharacter = (state: RootState, id: number) =>
  getSpecificCharacter(state, id).weapons

const getWeapons = (state: RootState) => unwrapped(state).weapons

export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getWeapons],
  (character, weapons) =>
    character == null
      ? []
      : character.weapons.map((w) => weapons[w]).sort(sortOrderSort),
)((_s: RootState, i: number) => i)
