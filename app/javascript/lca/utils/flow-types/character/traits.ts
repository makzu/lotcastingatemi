interface traitBasics {
  id: number
  character_id: number
  name: string
  sort_order: number
}
export type Charm = traitBasics & {
  charm_type: string
  type: string
  min_essence: number
  style?: string
  artifact_name?: string
  ability: string
  min_ability: number
  cost: string
  timing: string
  duration: string
  keywords: string[]
  prereqs: string
  body: string
  ref: string
  summary: string
  categories: string[]
}
export type Spell = traitBasics & {
  sorcerer_id: number
  cost: string
  circle: string
  control: boolean
  timing: string
  duration: string
  keywords: string[]
  body: string
  ref: string
  categories: string[]
}
export type fullWeapon = traitBasics & {
  weight: 'light' | 'medium' | 'heavy'
  is_artifact: boolean
  tags: string[]
  ability: string
  bonus_accuracy: number
  bonus_damage: number
  bonus_defense: number
  bonus_overwhelming: number
  notes: string
  overrides: Record<string, $TSFixMe>
}
export interface fullMerit {
  id: number
  character_id: number
  label: string
  merit_name: string
  merit_cat: string
  rating: number
  description: string
  ref: string
  supernatural: boolean
  prereqs: string
  sort_order: number
}
