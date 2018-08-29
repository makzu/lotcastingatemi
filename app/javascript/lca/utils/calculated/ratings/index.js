// @flow
export { evasion } from './evasion.js'
export { guile } from './guile.js'
export { hardness } from './hardness.js'
export { resolve } from './resolve.js'
export { soak, naturalSoak, armorSoak } from './soak.js'

type withApp = { attr_appearance: number }
export function appearanceRating(character: withApp, merits: Array<string>) {
  let bonus = []

  let hideous = merits.find(m => m.startsWith('hideous'))
  if (hideous != undefined) bonus = [{ label: 'hideous', bonus: 0 }]

  return {
    name: 'Appearance',
    attribute: 'Appearance',
    attributeRating: character.attr_appearance,
    bonus: bonus,
    total: character.attr_appearance,
  }
}
