import { specialtiesFor } from '.'

// TODO: Excellency handling for custom exalt types
export function maxExcellency(character, attribute, ability) {
  switch (character.type) {
  case 'SolarCharacter':
    return character[`attr_${attribute}`] + character[`abil_${ability}`]
  case 'DragonbloodCharacter':
    return character[`abil_${ability}`] + specialtiesFor(character, ability).length > 0 ? 1 : 0
  default:
    return 0
  }
}

export function pool(character, attribute, ability, meritBonus, penalty) {
  const pool = character[`attr_${attribute}`] + character[`abil_${ability}`]
  let mb = 0
  if (meritBonus.length > 1)
    mb =  meritBonus.reduce((a, v) => v + a.situational ? 0 : a.bonus)
  return {
    raw: pool,
    meritBonus: meritBonus || [],
    specialties: specialtiesFor(character, ability),
    excellency: maxExcellency(character, attribute, ability),
    penalty: penalty || 0,
    total: Math.max(pool + mb - penalty, 0)
  }
}

export function joinBattle(character, merits, penalties) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fast reflexes')))
    bonus = [{ label: 'fast reflexes', bonus: 1 }]
  const penalty = penalties.wound
  return pool(character, 'wits', 'awareness', bonus, penalty)
}

export function rush(character, merits, penalties) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'athletics', bonus, penalty)
}

export function disengage(character, merits, penalties) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', bonus, penalty)
}
export const withdraw = disengage

export function readIntentions(character, merits, penalties) {
  let bonus = []
  if (merits.some((m) => m.startsWith('danger sense')))
    bonus = [{ label: 'danger sense', bonus: 1, situational: true }]
  return pool(character, 'perception', 'socialize', bonus, penalties.wound)
}

export function riseFromProne(character, merits, penalties) {
  // TODO handle merits that affect pool?
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', [], penalty)
}

export function takeCover(character, merits, penalties) {
  // TODO handle merits that affect pool?
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', [], penalty)
}

export function shapeSorcery(character, merits, penalties) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus ? 0 : penalties.wound
  return pool(character, 'intelligence', 'occult', [], penalty)
}
