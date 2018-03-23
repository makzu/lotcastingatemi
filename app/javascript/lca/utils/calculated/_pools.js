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

export function pool(character, attribute, ability, meritBonus, meritName, penalty) {
  const p = character[`attr_${attribute}`] + character[`abil_${ability}`]
  return {
    raw: p,
    meritBonus: meritBonus || 0,
    meritName: meritName,
    specialties: specialtiesFor(character, ability),
    excellency: maxExcellency(character, attribute, ability),
    penalty: penalty,
    total: Math.max(p + meritBonus - penalty, 0)
  }
}

export function joinBattle(character, merits, penalties) {
  const bonus = merits.some((m) => m.startsWith('fast reflexes')) ? 1 : 0
  const penalty = penalties.wound
  return pool(character, 'wits', 'awareness', bonus, 'fast reflexes', penalty)
}

export function rush(character, merits, penalties) {
  const bonus = merits.some((m) => m.startsWith('fleet of foot')) ? 1 : 0
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'athletics', bonus, 'fleet of foot', penalty)
}

export function disengage(character, merits, penalties) {
  let bonus = merits.some((m) => m.startsWith('fleet of foot')) ? 1 : 0
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', bonus, 'fleet of foot', penalty)
}
export const withdraw = disengage

export function readIntentions(character, merits, penalties) {
  let bonus = merits.some((m) => m.startsWith('danger sense')) ? 1 : 0
  return pool(character, 'perception', 'socialize', bonus, 'danger sense', penalties.wound)
}

export function riseFromProne(character, merits, penalties) {
  // TODO handle merits that affect pool
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', 0, '', penalty)
}

export function takeCover(character, merits, penalties) {
  // TODO handle merits that affect pool
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', 0, '', penalty)
}

export function shapeSorcery(character, merits, penalties) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus ? 0 : penalties.wound
  return pool(character, 'intelligence', 'occult', 0, '', penalty)
}
