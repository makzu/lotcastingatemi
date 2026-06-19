import type { CharacterTrait, Weight } from '../_lib'
import type { Ability, Attribute } from '../character'

export interface Weapon extends CharacterTrait {
  name: string
  weight: Weight
  tags: string[]
  is_artifact: boolean
  notes: string
  ability: Ability | string
  bonus_accuracy: number
  bonus_damage: number
  bonus_defense: number
  bonus_overwhelming: number
  overrides: WeaponOverrides
}

interface WeaponOverrides {
  attack_attribute?: AttributeOverride
  damage_attribute?: AttributeOverride
  defense_attribute?: AttributeOverride
}

interface AttributeOverride {
  use: AttributeOrEssence
  base_only?: boolean
}

export type AttributeOrEssence = Attribute | 'essence'

export type DamageAttribute =
  | Attribute
  | 'subtle'
  | 'flame'
  | 'crossbow'
  | 'firearm'
