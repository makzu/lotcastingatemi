import { Character, PoolBonus } from '@/types'
export { evasion } from './evasion'
export { guile } from './guile'
export { hardness } from './hardness'
export { resolve } from './resolve'
export { armorSoak, naturalSoak, soak } from './soak'

export function appearanceRating(
  character: Pick<Character, 'attr_appearance'>,
  merits: string[],
) {
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
