export interface WithSorcery {
  is_sorcerer: boolean
  sorcerous_motes: number
  rituals: string[]
  spells: number[]
}

export type AuraElement = 'air' | 'earth' | 'fire' | 'water' | 'wood'

export interface WithAura {
  aura: '' | 'none' | AuraElement
}

export interface WithSharedStats extends WithSorcery, WithAura {}
