import type { Ability, Attribute, Character } from '@lca/types/index.ts'
import type { Pool, PoolBonus, PoolPenalty } from '@lca/types/pool.ts'
import { abil, attr, specialtiesFor } from '..'
import { maxExcellency } from '../excellencies/index.ts'

export default function pool(
  name: string,
  character: Character,
  attribute: Attribute,
  ability: Ability,
  bonus: PoolBonus[],
  penalties: PoolPenalty[],
  excellencyAbils: string[],
  specialAttacks: string[] = [],
): Pool {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  let mb = 0
  if (bonus.length > 0)
    mb = bonus.reduce((a, b) => a + (b.situational ? 0 : b.bonus), 0)

  const excellency = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    false,
  )
  const excellencyStunt = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    false,
    true,
  )
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0)

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: pool,
    bonus: bonus || [],
    specialties: specialtiesFor(character, ability),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: penalties,
    totalPenalty: penalty,
    total: Math.max(pool + mb - penalty, 0),
    specialAttacks: specialAttacks,
  }
}
