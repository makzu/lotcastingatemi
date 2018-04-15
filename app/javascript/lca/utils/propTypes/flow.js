// @flow
export type withHealthLevels = {
  health_level_0s: number,
  health_level_1s: number,
  health_level_2s: number,
  health_level_4s: number,
  health_level_incap: number,
  damage_bashing: number,
  damage_lethal: number,
  damage_aggravated: number,
}

export type withWillpower = {
  willpower_temporary: number,
  willpower_permanent: number,
}

export type withAttributes = {
  attr_strength: number,
  attr_dexterity: number,
  attr_stamina: number,
  attr_charisma: number,
  attr_manipulation: number,
  attr_appearance: number,
  attr_perception: number,
  attr_intelligence: number,
  attr_wits: number,
}

export type withAbilities = {
  abil_archery: number,
  abil_athletics: number,
  abil_awareness: number,
  abil_brawl: number,
  abil_bureaucracy: number,
  abil_dodge: number,
  abil_integrity: number,
  abil_investigation: number,
  abil_larceny: number,
  abil_linguistics: number,
  abil_lore: number,
  abil_medicine: number,
  abil_melee: number,
  abil_occult: number,
  abil_performance: number,
  abil_presence: number,
  abil_resistance: number,
  abil_ride: number,
  abil_sail: number,
  abil_socialize: number,
  abil_stealth: number,
  abil_survival: number,
  abil_thrown: number,
  abil_war: number,
}

export type withArmorStats = {
  armor_name: string,
  armor_weight: 'unarmored' | 'light' | 'medium' | 'heavy',
  armor_is_artifact: boolean,
  armor_tags: Array<string>,
}

export type specialty = {
  ability: string,
  context: string,
}
export type withSpecialties = {
  specialties: Array<specialty>,
}

export type withBasicInfo = {
  id: number,
  player_id: number,
  name: string,
  description: string,
  essence: number,
  hidden: boolean,
  pinned: boolean,
}
export type intimacy = {
  subject: string,
  rating: number,
  hidden: ?boolean,
}
export type withIntimacies = {
  principles: Array<intimacy>,
  ties: Array<intimacy>,
}

export type withCombatInfo = {
  initiative: number,
  onslaught: number,
}

export type withMotePool = {
  motes_personal_total: number,
  motes_personal_current: number,
  motes_peripheral_total: number,
  motes_peripheral_current: number,
  motes_committed: Array<Object>,
  anima_level: number,
}

export type qcAttack = {
  name: string,
  pool: number,
}
export type qcMerit = {
  name: string,
  body: string,
}

export type fullQc = {
  join_battle: number,
  movement: number,
  soak: number,
  hardness: number,
  appearance: number,
  resolve: number,
  guile: number,
  evasion: number,
  parry: number,
  armor_name: string,
  ref: string,
} &
  withWillpower &
  withHealthLevels &
  withBasicInfo &
  withCombatInfo &
  withMotePool &
  withIntimacies

export type fullChar = {
  caste: ?string,
  aspect: ?boolean,
  aura: ?string,
  type: string,
  exalt_type: string,
  is_sorcerer: boolean,
  sorcererous_motes: number,
  caste_abilities: Array<string>,
  favored_abilities: ?Array<string>,
  caste_attributes: ?Array<string>,
  favored_attributes: ?Array<string>,
} &
  withBasicInfo &
  withMotePool &
  withWillpower &
  withHealthLevels &
  withCombatInfo &
  withAttributes &
  withAbilities &
  withSpecialties &
  withArmorStats &
  withCombatInfo &
  withIntimacies


export type Charm = {
  id: number,
  name: string,
  charm_type: string,
  style?: string,
  artifact_name?: string,
  cost: string,
  timing: string,
  duration: string,
  keywords: Array<string>,
  min_essence: number,
  body: string,
  ref: string,
  categories: Array<string>,
}

export type fullWeapon = {
  id: number,
  character_id: number,
  weight: 'light' | 'medium' | 'heavy',
  is_artifact: boolean,
  tags: Array<string>,
  ability: string,
}

export type fullMerit = {
  id: number,
  character_id: number,
  name: string,
  merit_name: string,
  merit_cat: string,
  description: string,
  ref: string,
  supernatural: boolean,
  prereqs: string,
}

export type qcCharm = {
  id: number,
  qc_id: number,
  name: string,
  cost: string,
  timing: string,
  duration: string,
  keywords: Array<string>,
  min_essence: number,
  body: string,
  ref: string,
  category: string,
}
