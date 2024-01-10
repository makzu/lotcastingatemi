import { Ability, Attribute, Character } from 'types'
import { halfRoundUp } from 'utils'
import type { Pool } from 'utils/flow-types'
import { abil, attr, specialtiesFor } from '..'
import { maxExcellency } from '../excellencies'

export default function rating(
  name: string,
  character: Character,
  attribute: Attribute,
  ability: Ability,
  penalties: Record<string, $TSFixMe>[],
  excellencyAbils: string[],
  bonus: Record<string, $TSFixMe>[] = [],
): Pool {
  const _attr = attr(character, attribute)

  const _abil = abil(character, ability)

  const pool = _attr + _abil
  const specialties = specialtiesFor(character, ability)
  let mb = 0
  if (bonus.length > 0)
    mb = bonus.reduce((a, b) => a + (b.situational ? 0 : b.bonus), 0)
  const excellency = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    true,
  )
  const excellencyStunt = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    true,
    true,
  )
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0)
  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: halfRoundUp(pool),
    specialtyMatters: pool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalties: penalties.filter((p) => p.penalty > 0),
    totalPenalty: penalty,
    total: Math.max(halfRoundUp(pool) + mb - penalty, 0),
    bonus: bonus,
    rating: true,
    specialAttacks: [],
  }
}
