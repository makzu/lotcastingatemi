import fetch from 'isomorphic-fetch'
import * as c from '../utils/constants'

export { fetchCharacter, updateCharacter } from './_character.js'
export { updateWeapon } from './_weapon.js'
export { updateMerit } from './_merit.js'

export function toggleEditor() {
  return {
    type: c.TOGGLE_EDITOR
  }
}

