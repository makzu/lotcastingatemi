import type { Character, Pool, PoolBonus } from 'utils/flow-types'

export const naturalSoak = (character: Character) => character.attr_stamina

export function armorSoak(character: Character) {
  switch (character.armor_weight) {
    case 'light':
      return character.armor_is_artifact ? 5 : 3

    case 'medium':
      return character.armor_is_artifact ? 8 : 5

    case 'heavy':
      return character.armor_is_artifact ? 11 : 7

    case 'unarmored':
    default:
      return 0
  }
}

export function soak(
  character: Character,
  merits: string[],
  spells: string[],
): Pool {
  let b = 0
  let bonus = [] as PoolBonus[]
  const bonfire = character.anima_level === 3
  const unusualHide = merits.find((m) => m.startsWith('unusual hide'))

  if (unusualHide != undefined) {
    b += parseInt(unusualHide.substr(-1))
    bonus = [
      ...bonus,
      {
        label: 'unusual hide',
        bonus: parseInt(unusualHide.substr(-1)),
      },
    ]
  }

  // ISoB control spell bonus applies even while wearing armor:
  // http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1187120#post1187120
  const isob = spells.find((s) => s === 'invulnerable skin of bronze')

  if (isob != undefined) {
    b += character.essence
    bonus = [
      ...bonus,
      { label: 'invulnerable skin of bronze', bonus: character.essence },
    ]
  }

  // Earth aspect DBs gain higher of 3 or (essence) to soak generally
  // Fire aspect DBs gain (essence) soak vs heat
  if (
    character.type !== 'Character' &&
    (character.type === 'DragonbloodCharacter' ||
      (character.exalt_type || '').toLowerCase().startsWith('dragon'))
  ) {
    switch ((character.caste || '').toLowerCase()) {
      case 'earth':
        if (bonfire) {
          b += Math.max(character.essence, 3)
          bonus = [
            ...bonus,
            { label: 'anima', bonus: Math.max(character.essence, 3) },
          ]
        } else {
          bonus = [
            ...bonus,
            {
              label: '/3m anima',
              bonus: Math.max(character.essence, 3),
              situational: true,
            },
          ]
        }

        break

      case 'fire':
        bonus = [
          ...bonus,
          {
            label: `${bonfire ? '' : '/5m '}vs heat`,
            bonus: character.essence,
            situational: true,
          },
        ]
        break
    }
  }

  return {
    name: 'Soak',
    natural: naturalSoak(character),
    bonus: bonus,
    armored: armorSoak(character) + character.bonus_soak,
    total: Math.max(
      naturalSoak(character) + armorSoak(character) + character.bonus_soak + b,
      0,
    ),
    soak: true,
  }
}
export default soak
