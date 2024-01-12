import { Ability } from '@/utils/constants.new/abilities'
import { Attribute } from '@/utils/constants.new/attributes'

export type PoolBonus = {
  label: string
  situational?: boolean
  noFull?: boolean
  bonus?: number
}

type SoakPool = {
  soak?: boolean
  natural?: number
  armored?: number
}

type AttackPool = {
  accuracy?: number
  witheringDamage?: boolean
  weaponDamage?: number
  powerfulDamage?: number
  weaponOverwhelming?: number
  damageType?: 'Bashing' | 'Lethal' | 'Aggravated'
  attack?: 'withering' | 'decisive'
  minimum?: number
}

type StaticRating = {
  rating?: boolean
  specialtyMatters?: boolean
  parry?: boolean
  defense?: number
  shield?: boolean
}

export type Penalty = {
  label: string
  penalty: number
}
export type penaltyObj = {
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
    bonus?: Array<PoolBonus>
    specialAttacks?: string[]
    noSummary?: boolean
  }
