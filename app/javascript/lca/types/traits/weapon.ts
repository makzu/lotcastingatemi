import { Ability, Attribute } from 'types/character'
import { CharacterTrait, Weight } from '../_lib'

export interface Weapon extends CharacterTrait {
  name: string
  weight: Weight
  tags: string[]
  is_artifact: boolean
  notes: string
  ability: Ability | string
  attr: Attribute | 'essence'
  damage_attr: Attribute | 'essence'
  bonus_accuracy: number
  bonus_damage: number
  bonus_defense: number
  bonus_overwhelming: number
}
