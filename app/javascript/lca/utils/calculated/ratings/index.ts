export { evasion } from './evasion.ts'
export { guile } from './guile.ts'
export { hardness } from './hardness.ts'
export { resolve } from './resolve.ts'
export { armorSoak, naturalSoak, soak } from './soak.ts'

type withApp = { attr_appearance: number }
export function appearanceRating(character: withApp, merits: string[]) {
  let bonus = []

  const hideous = merits.find((m) => m.startsWith('hideous'))
  if (hideous != null) bonus = [{ label: 'hideous', bonus: 0 }]

  return {
    name: 'Appearance',
    attribute: 'Appearance',
    attributeRating: character.attr_appearance,
    bonus: bonus,
    total: character.attr_appearance,
  }
}
