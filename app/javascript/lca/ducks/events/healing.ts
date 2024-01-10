import { woundPenalty } from 'utils/calculated'
import type { Character, fullQc } from 'utils/flow-types'

const timeInHours = (time: string): number => {
  switch (time) {
    case 'hour':
      return 1

    case 'overnight':
      return 12

    case 'day':
      return 24

    case 'week':
      return 168

    // 24 * 7
    case 'month':
      return 720

    // 24 * 30
    case 'season':
      return 2160

    // 24 * 30 * 3
    default:
      return 0
  }
}

const timeToHealWorstExalted = (character: Character | fullQc) => {
  const penalty = woundPenalty(character, [])
  const bashing = character.damage_bashing > 0

  switch (penalty) {
    case 0:
      return bashing ? 1 : timeInHours('day')

    case 1:
      return bashing ? 12 : timeInHours('day') * 2

    case 2:
      return bashing ? timeInHours('day') : timeInHours('day') * 3

    case 4:
    case -1:
    default:
      return bashing ? timeInHours('day') * 2 : timeInHours('day') * 5
  }
}

const timeToHealWorstMortal = (character: Character | fullQc) => {
  const penalty = woundPenalty(character, [])
  const bashing = character.damage_bashing > 0

  switch (penalty) {
    case 0:
      return bashing ? 12 : timeInHours('day') * 2

    case 1:
      return bashing ? timeInHours('day') : timeInHours('day') * 4

    case 2:
      return bashing ? timeInHours('day') * 4 : timeInHours('week')

    case 4:
    case -1:
    default:
      return bashing ? timeInHours('week') : timeInHours('month')
  }
}

// Health recovery rates are in Core, p. 173-174
export const healthRecoverObject = (
  character: Character | fullQc,
  time: number,
  exaltedHealing = true,
) => {
  const obj = {
    damage_bashing: character.damage_bashing,
    damage_lethal: character.damage_lethal,
    damage_aggravated: character.damage_aggravated,
  }
  const bashing = character.damage_bashing
  const lethal = character.damage_lethal + character.damage_aggravated
  // Do nothing if character has no damage
  if (bashing + lethal === 0) return {}
  let remainingTime = time
  const timeToHealWorst = exaltedHealing
    ? timeToHealWorstExalted
    : timeToHealWorstMortal
  let timeToHeal

  do {
    timeToHeal = timeToHealWorst({ ...character, ...obj })

    if (remainingTime >= timeToHeal) {
      if (obj.damage_bashing > 0) obj.damage_bashing--
      else if (obj.damage_lethal > 0) obj.damage_lethal--
      else if (obj.damage_aggravated > 0) obj.damage_aggravated--
      remainingTime = remainingTime - timeToHeal
    } else {
      remainingTime = 0
    }
  } while (remainingTime > 0)

  return obj
  /* Rates:
   Exalted Healing:
   -4: 2 days bashing, 5 days lethal
   -2 1 day bashing, 2 days lethal
   -1 12 hours bashing, 2 days lethal
   -0 1 hour bashing, one day lethal
   Mortal healing:
   -4: 1 week bashing, 1 month lethal
   -2  4 days bashing, 1 week lethal
   -1 1 day bashing, 4 days lethal
   -0 12 hours bashing, 2 days lethal
  */
}
