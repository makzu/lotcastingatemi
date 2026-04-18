import { Ability, Attribute } from './character'
import { AttributeOrEssence } from './traits/weapon'

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
  specialties?: Array<string>
  excellency?: number
  excellencyCost?: number
  excellencyStunt?: number
  excellencyStuntCost?: number
  penalties?: Array<PoolPenalty>
  totalPenalty?: number
  total: number | string
  bonus?: Array<PoolBonus>
  specialAttacks?: Array<string>
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
}

export interface StaticRating extends PoolBase {
  rating?: boolean
  specialtyMatters?: boolean
  parry?: boolean
  defense?: number
  shield?: boolean
}

export interface Pool extends PoolBase {}
