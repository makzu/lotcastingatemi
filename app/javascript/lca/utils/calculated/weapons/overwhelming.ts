import type { Character, Weapon } from '@/types'

export function weaponOverwhelming(character: Character, weapon: Weapon) {
  let bonus = weapon.bonus_overwhelming

  if (weapon.tags.includes('subtle')) return 0 + bonus
  if (weapon.tags.includes('elemental bolt'))
    return 1 + character.essence + bonus

  if (weapon.tags.includes('balanced')) bonus += 1

  const overwhelmingTag = weapon.tags.find((t) => t.startsWith('overwhelming+'))
  if (overwhelmingTag) {
    const theBonus = overwhelmingTag.substr(13)
    bonus += theBonus.includes('essence')
      ? character.essence
      : parseInt(theBonus)
  }

  if (!weapon.is_artifact) return Math.max(1 + bonus, 0)
  switch (weapon.weight) {
    case 'light':
      return Math.max(3 + bonus, 0)

    case 'medium':
      return Math.max(4 + bonus, 0)

    case 'heavy':
      return Math.max(5 + bonus, 0)
  }

  return 0
}
