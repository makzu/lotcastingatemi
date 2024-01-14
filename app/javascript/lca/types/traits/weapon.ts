import type { Ability, Attribute } from 'types/character'
import type { CharacterTrait, Weight } from '../_lib'

export interface Weapon extends CharacterTrait {
  name: string
  weight: Weight
  tags: string[]
  is_artifact: boolean
  notes: string
  ability: Ability | 'essence'
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

type AttributeOrEssence = Attribute | 'essence'
