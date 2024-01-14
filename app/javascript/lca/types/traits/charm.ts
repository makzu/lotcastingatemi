import type { CharacterTrait, Timing } from '../_lib'
import type { Ability } from '@/utils/constants.new/abilities'
import type { Attribute } from '@/utils/constants.new/attributes'

export interface Charm extends CharacterTrait {
  name: string
  charm_type: string
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
  ability?: Ability | Attribute | 'universal' | ''
  min_ability?: number
  artifact_name?: string
  style?: string
}
