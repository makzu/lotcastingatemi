// @flow
export type PoolBonus = {
  label: string,
  situational?: boolean,
  noFull?: boolean,
  bonus?: number,
}

type SoakPool = {
  soak?: boolean,
  natural?: number,
  armored?: number,
}

type AttackPool = {
  accuracy?: number,
  witheringDamage?: boolean,
  weaponDamage?: number,
  powerfulDamage?: number,
  weaponOverwhelming?: number,
  damageType?: 'Bashing' | 'Lethal' | 'Aggravated',
  attack?: 'withering' | 'decisive',
  minimum?: number,
}

type StaticRating = {
  rating?: boolean,
  specialtyMatters?: boolean,
  parry?: boolean,
  defense?: number,
  shield?: boolean,
}

export type Pool = SoakPool &
  AttackPool &
  StaticRating & {
    name?: string,
    attribute?: string,
    attributeRating?: number,
    ability?: string,
    abilityRating?: number,
    raw?: number,
    specialties?: Array<string>,
    excellency?: number,
    excellencyCost?: number,
    excellencyStunt?: number,
    excellencyStuntCost?: number,
    penalties?: Array<Object>,
    totalPenalty?: number,
    total: number,
    bonus?: Array<PoolBonus>,
    specialAttacks?: Array<string>,
    noSummary?: boolean,
  }
