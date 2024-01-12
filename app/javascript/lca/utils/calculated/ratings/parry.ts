import rating from './_rating'
import { penaltyObject } from '../index'
import { weaponIsRanged } from '../weapons'
import { halfRoundUp } from 'utils'
import type { PoolBonus } from 'utils/flow-types'
import { Character, Weapon } from 'types'
import { PenaltyInput } from 'selectors'

export function weaponDefenseBonus(weapon: Weapon) {
  switch (weapon.weight) {
    case 'light':
      return 0

    case 'medium':
      return 1

    case 'heavy':
      return weapon.is_artifact ? 0 : -1
  }
}

export function parry(
  character: Character,
  weapon: Weapon,
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  if (weaponIsRanged(weapon))
    return {
      raw: 0,
      total: 0,
    }
  let bonus = weapon.tags.includes('shield')
    ? [{ label: 'shield' }]
    : ([] as PoolBonus[])
  const bonfire = character.anima_level === 3

  // Earth aspect DBs gain +1 Defense vs Smashing and Grapple attacks at bonfire
  if (
    character.type !== 'Character' &&
    (character.type === 'DragonbloodCharacter' ||
      (character.exalt_type || '').toLowerCase().startsWith('dragon')) &&
    (character.caste || '').toLowerCase() === 'earth'
  ) {
    bonus = [
      ...bonus,
      {
        label: `${bonfire ? '' : '/5m '} vs smash/grapple (anima)`,
        bonus: 1,
        situational: true,
      },
    ]
  }

  const rat = rating(
    weapon.name + ' Parry',
    character,
    weapon.overrides?.defense_attribute?.use ?? 'dexterity',
    weapon.ability,
    penaltyObject(penalties, {
      useOnslaught: true,
    }),
    excellencyAbils,
    bonus,
  )
  const rawRating =
    halfRoundUp((rat.attributeRating ?? 0) + (rat.abilityRating ?? 0)) +
    weaponDefenseBonus(weapon) +
    weapon.bonus_defense
  return {
    ...rat,
    defense: weaponDefenseBonus(weapon),
    raw: Math.max(rawRating, 0),
    shield: weapon.tags.includes('shield'),
    bonus: bonus,
    total: Math.max(rawRating - (rat.totalPenalty ?? 0), 0),
    parry: true,
  }
}

export default parry
