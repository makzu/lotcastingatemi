import type { Ability, Attribute } from './character.ts'

export interface BlockOfPenalties {
  wound: number
  mobility: number
  onslaught: number
  poisonTotal: number
}

export interface PoolBonus {
  label: string
  situational?: boolean
  noFull?: boolean
  bonus?: number
}

export interface PoolPenalty {
  label: string
  penalty: number
}

export interface SoakPool {
  soak?: boolean
  natural?: number
  armored?: number
}

interface PoolBase {
  name: string
  attribute: Attribute
  attributeRating: number
  ability: Ability
  abilityRating: number
  raw: number
  specialties?: string[]
  excellency?: number
  excellencyCost?: number
  excellencyStunt?: number
  excellencyStuntCost?: number
  penalties?: PoolPenalty[]
  totalPenalty?: number
  total: number | string
  bonus?: PoolBonus[]
  specialAttacks?: string[]
  noSummary?: boolean
}
export interface AttackPool extends PoolBase {
  accuracy?: number
  witheringDamage?: boolean
  weaponDamage?: number
  powerfulDamage?: number
  weaponOverwhelming?: number
  damageType?: 'Bashing' | 'Lethal' | 'Aggravated'
  attack?: 'withering' | 'decisive'
  minimum?: number
  shield?: boolean
}

export interface StaticRating extends PoolBase {
  rating?: boolean
  specialtyMatters?: boolean
  parry?: boolean
  defense?: number
  shield?: boolean
}

export interface Pool extends PoolBase {}
