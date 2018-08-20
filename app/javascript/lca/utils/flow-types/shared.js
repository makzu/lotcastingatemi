// @flow
// Type defs for traits shared between characters and QCs

export type withBasicInfo = {
  id: number,
  player_id: number,
  name: string,
  description: string,
  essence: number,
  hidden: boolean,
  pinned: boolean,
  public: boolean,
  sort_order: number,
  chronicle_sort_order: number,
  type: string, // TODO: constrain this, e.g. 'qc' | 'battlegroup' | 'Character' | 'SolarCharacter'
}

export type withCombatInfo = {
  initiative: number,
  onslaught: number,
  in_combat: boolean,
  has_acted: boolean,
}

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

export type intimacy = {
  subject: string,
  rating: number,
  hidden: ?boolean,
}
export type withIntimacies = {
  principles: Array<intimacy>,
  ties: Array<intimacy>,
}

export type committment = {
  pool: 'Personal' | 'Peripheral',
  label: string,
  motes: number,
  scenelong?: boolean,
}

export type withMotePool = {
  motes_personal_total: number,
  motes_personal_current: number,
  motes_peripheral_total: number,
  motes_peripheral_current: number,
  motes_committed: Array<committment>,
  anima_level: number,
  anima_display: string,
  is_sorcerer: boolean,
  sorcerous_motes: number,
}

export type withWillpower = {
  willpower_temporary: number,
  willpower_permanent: number,
}
