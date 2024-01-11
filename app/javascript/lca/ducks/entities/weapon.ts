import createCachedSelector from 're-reselect'

import { State } from 'ducks'
import { isDefined, sortOrderSort } from 'utils'
import { unwrapped } from './_lib'
import { createApiActions, createTraitReducer } from './_trait'
import { getSpecificCharacter } from './character'

export default createTraitReducer('weapon')

export const [createWeapon, updateWeapon, destroyWeapon] =
  createApiActions('weapon')

const getState = (s: State) => s

export const getSpecificWeapon = (state: State, id: number) =>
  unwrapped(state).weapons[id]

export const getWeaponIDsForCharacter = (state: State, id: number) =>
  getSpecificCharacter(state, id)?.weapons ?? []

export const getWeaponsForCharacter = createCachedSelector(
  [getSpecificCharacter, getState],
  (character, state) => {
    return (character?.weapons ?? [])
      .map((w) => getSpecificWeapon(state, w))
      .filter(isDefined)
      .sort(sortOrderSort)
  },
)((s: State, i: number) => i)
