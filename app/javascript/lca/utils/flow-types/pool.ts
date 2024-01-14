import { type penaltyObject } from '@/utils/calculated'

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
export type Pool = SoakPool &
  AttackPool &
  StaticRating & {
    name?: string
    attribute?: string
    attributeRating?: number
    ability?: string
    abilityRating?: number
    raw?: number
    specialties?: string[]
    excellency?: number
    excellencyCost?: number
    excellencyStunt?: number
    excellencyStuntCost?: number
    penalties?: ReturnType<typeof penaltyObject>
    totalPenalty?: number
    total: number | string
    bonus?: PoolBonus[]
    specialAttacks?: string[]
    noSummary?: boolean
  }
