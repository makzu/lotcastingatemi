import { Ability } from '@/utils/constants.new/abilities'
import { Attribute } from '@/utils/constants.new/attributes'

export interface PoolBonus {
  label: string
  situational?: boolean
  noFull?: boolean
  bonus?: number
}

interface SoakPool {
  soak?: boolean
  natural?: number
  armored?: number
}

interface AttackPool {
  accuracy?: number
  witheringDamage?: boolean
  weaponDamage?: number
  powerfulDamage?: number
  weaponOverwhelming?: number
  damageType?: 'Bashing' | 'Lethal' | 'Aggravated'
  attack?: 'withering' | 'decisive'
  minimum?: number
}

interface StaticRating {
  rating?: boolean
  specialtyMatters?: boolean
  parry?: boolean
  defense?: number
  shield?: boolean
}

export interface Penalty {
  label: string
  penalty: number
}
export interface penaltyObj {
  mobility: number
  onslaught: number
  wound: number
  poisonTotal: number
}

export type Pool = SoakPool &
  AttackPool &
  StaticRating & {
    name?: string
    attribute?: Attribute
    attributeRating?: number
    ability?: Ability
    abilityRating?: number
    raw?: number
    specialties?: string[]
    excellency?: number
    excellencyCost?: number
    excellencyStunt?: number
    excellencyStuntCost?: number
    penalties?: Penalty[]
    totalPenalty?: number
    total: number | string
    bonus?: PoolBonus[]
    specialAttacks?: string[]
    noSummary?: boolean
  }
