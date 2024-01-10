export { evasion } from './evasion'
export { guile } from './guile'
export { hardness } from './hardness'
export { resolve } from './resolve'
export { soak, naturalSoak, armorSoak } from './soak'

interface withApp {
  attr_appearance: number
}
export function appearanceRating(character: withApp, merits: string[]) {
  let bonus = [] as PoolBonus[]

  const hideous = merits.find((m) => m.startsWith('hideous'))
  if (hideous != undefined) bonus = [{ label: 'hideous', bonus: 0 }]

  return {
    name: 'Appearance',
    attribute: 'Appearance',
    attributeRating: character.attr_appearance,
    bonus: bonus,
    total: character.attr_appearance,
  }
}
