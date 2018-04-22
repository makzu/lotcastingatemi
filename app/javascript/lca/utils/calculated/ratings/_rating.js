// @flow
import { attr, abil, specialtiesFor } from '..'
import { maxExcellency } from '../excellencies'
import type { Character, Pool } from 'utils/flow-types'

export default function rating(
  name: string,
  character: Character,
  attribute: string,
  ability: string,
  penalties: Array<Object>,
  excellencyAbils: Array<string>,
  bonus: Array<Object> = []
): Pool {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  const specialties = specialtiesFor(character, ability)

  const excellency = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    true
  )
  const excellencyStunt = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    true,
    true
  )
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0)

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: Math.ceil(pool / 2),
    specialtyMatters: pool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalties: penalties.filter(p => p.penalty > 0),
    totalPenalty: penalty,
    total: Math.max(Math.ceil(pool / 2) - penalty, 0),
    bonus: bonus,
    rating: true,
    specialAttacks: [],
  }
}
