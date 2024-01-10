import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character, fullWeapon } from 'utils/flow-types'
const supportedTags = [
  'chopping',
  'disarming',
  'flexible',
  'improvised',
  'paired',
  'piercing',
  'poisonable',
  'smashing',
  'subtle',
  'two-handed',
  'powerful',
  'slow',
  'earth',
  'fire',
  'air',
  'water',
  'wood',
]

function weaponDamageType(weapon: fullWeapon) {
  if (weapon.tags.includes('aggravated')) return 'Aggravated'
  else if (
    weapon.tags.includes('lethal') ||
    weapon.tags.includes('air') ||
    weapon.tags.includes('fire') ||
    weapon.tags.includes('wood')
  )
    return 'Lethal'
  else if (
    weapon.tags.includes('bashing') ||
    weapon.tags.includes('earth') ||
    weapon.tags.includes('water')
  )
    return 'Bashing'
  else return undefined
}

export function decisiveAttack(
  character: Character,
  weapon: fullWeapon,
  penalties: Record<string, $TSFixMe>,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  let specialAttacks = []
  if (weapon.tags.includes('paired') || weapon.tags.includes('two-handed'))
    bonus = bonus.concat([
      {
        label: 'clash',
        bonus: 2,
        situational: true,
        noFull: true,
      },
    ])
  weapon.tags.forEach((t) => {
    if (supportedTags.includes(t)) specialAttacks = specialAttacks.concat([t])
  })
  return {
    ...pool(
      weapon.name + ' Decisive Attack',
      character,
      weapon.overrides?.attack_attribute?.use || 'dexterity',
      weapon.ability,
      bonus,
      penaltyObject(penalties),
      excellencyAbils,
      specialAttacks,
    ),
    attack: 'decisive',
    damageType: weaponDamageType(weapon),
  }
}
export default decisiveAttack
