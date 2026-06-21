import type { CharacterTrait, Timing } from '../_lib.ts'
import type { Ability, Attribute } from '../character.ts'

export interface CharmBase extends CharacterTrait {
  name: string
  cost: string
  timing: Timing
  duration: string
  keywords: string[]
  min_essence: number
  prereqs: string
  body: string
  ref: string
  categories: string[]
  summary: string
}

export interface AbilityCharm extends CharmBase {
  charm_type: 'Ability'
  ability: Ability | 'universal' | ''
  min_ability: number
  loadouts: string[] | null
}

export interface AttributeCharm extends CharmBase {
  charm_type: 'Attribute'
  ability: Attribute | 'universal' | ''
  min_ability: number
  loadouts: string[] | null
}

export interface EssenceCharm extends CharmBase {
  charm_type: 'Essence'
  ability: ''
  loadouts: string[] | null
}

export interface MartialArtsCharm extends CharmBase {
  charm_type: 'MartialArts'
  ability: ''
  style: string
  min_ability: number
}

export interface Evocation extends CharmBase {
  charm_type: 'Evocation'
  artifact_name: string
}

export interface SpiritCharm extends CharmBase {
  charm_type: 'Spirit'
}

export type NativeCharm = AbilityCharm | AttributeCharm | EssenceCharm

export type Charm = NativeCharm | MartialArtsCharm | Evocation | SpiritCharm
