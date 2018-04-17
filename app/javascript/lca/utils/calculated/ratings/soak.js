// @flow
import type { Character } from 'utils/flow-types'

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
  merits: Array<string>,
  spells: Array<string>
) {
  let b = 0
  let bonus = []
  const bonfire = character.anima_level === 3

  let unusualHide = merits.find(m => m.startsWith('unusual hide'))
  if (unusualHide != undefined) {
    b += parseInt(unusualHide.substr(-1))
    bonus = bonus.concat([
      { label: 'unusual hide', bonus: parseInt(unusualHide.substr(-1)) },
    ])
  }
  let isob = spells.find(s => s === 'invulnerable skin of bronze')
  if (isob != undefined && character.armor_weight === 'unarmored') {
    b += 3
    bonus = bonus.concat([{ label: 'invulnerable skin of bronze', bonus: 3 }])
  }

  // Earth aspect DBs gain higher of 3 or (essence) to soak generally
  // Fire aspect DBs gain (essence) soak vs heat
  if (
    character.type !== 'Character' &&
    (character.type === 'DragonbloodCharacter' ||
      character.exalt_type.toLowerCase().startsWith('dragon'))
  ) {
    switch (character.caste.toLowerCase()) {
      case 'earth':
        if (bonfire) {
          b += Math.max(character.essence, 3)
          bonus = bonus.concat([
            { label: 'anima', bonus: Math.max(character.essence, 3) },
          ])
        } else {
          bonus = bonus.concat([
            {
              label: '/3m anima',
              bonus: Math.max(character.essence, 3),
              situational: true,
            },
          ])
        }
        break
      case 'fire':
        bonus = bonus.concat([
          {
            label: `${bonfire ? '' : '/5m '}vs heat`,
            bonus: character.essence,
            situational: true,
          },
        ])
        break
    }
  }

  return {
    name: 'Soak',
    natural: naturalSoak(character),
    bonus: bonus,
    armored: armorSoak(character),
    total: naturalSoak(character) + armorSoak(character) + b,
    soak: true,
  }
}

export function hardness(character: Character) {
  let armor = 0
  let b = 0
  let altTotal = 0
  let bonus = []
  const bonfire = character.anima_level === 3

  if (character.armor_is_artifact) {
    switch (character.armor_weight) {
      case 'light':
        armor = 4
        break
      case 'medium':
        armor = 7
        break
      case 'heavy':
        armor = 10
    }
  }

  if (character.type !== 'Character') {
    // Twilight caste anima power grants 5 hardness at Bonfire/Iconic
    if (
      (character.type === 'SolarCharacter' ||
        character.exalt_type.toLowerCase() === 'solar') &&
      character.caste.toLowerCase() === 'twilight'
    ) {
      if (bonfire) {
        altTotal = 5
        bonus = bonus.concat([{ label: '5 anima' }])
      } else {
        bonus = bonus.concat([{ label: '5/5m anima', situational: true }])
      }
    }

    if (
      character.type === 'DragonbloodCharacter' ||
      character.exalt_type.toLowerCase().startsWith('dragon')
    ) {
      switch (character.caste.toLowerCase()) {
        // Earth aspects get +1 hardness for 3m, or free at Bonfire
        case 'earth':
          if (bonfire) {
            b += 1
            bonus = bonus.concat([{ label: 'anima', bonus: 1 }])
          } else
            bonus = bonus.concat([
              { label: '/3m anima', bonus: 1, situational: true },
            ])
          break

        // Fire aspects get +2 hardness vs heat for 5m, or free at Bonfire
        case 'fire':
          bonus = bonus.concat([
            { label: `${bonfire ? '2' : '2/5m'} vs heat`, situational: true },
          ])
          break
      }
    }
  }

  return {
    name: 'Hardness',
    armored: armor,
    bonus: bonus,
    total: Math.max(armor + b, altTotal),
  }
}
export default soak
