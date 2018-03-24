import { specialtiesFor } from '.'

export const attr = (character, attribute) => character[`attr_${attribute}`]
export const abil = (character, ability) => {
  let abil
  if (ability.startsWith('martial arts')) {
    abil = character.abil_martial_arts.find((art) => `martial arts (${art.style})` == ability)
    return abil != undefined ? abil.rating : 0
  } else if (ability.startsWith('craft')) {
    abil = character.abil_craft.find((craft) => `craft (${craft.craft})` == ability)
    return abil != undefined ? abil.rating : 0
  } else {
    return character[`abil_${ ability }`]
  }
}

// TODO: Excellency handling for custom exalt types
export function maxExcellency(character, attribute, ability) {
  switch (character.type) {
  case 'SolarCharacter':
    return attr(character, attribute) + abil(character, ability)
  case 'DragonbloodCharacter':
    return abil(character, ability) + specialtiesFor(character, ability).length > 0 ? 1 : 0
  case 'Character':
  default:
    return 0
  }
}

export function pool(character, attribute, ability, meritBonus, penalty) {
  const pool = attr(character, attribute) + abil(character, ability)
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
  // TODO: handle merits that affect pool?
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', [], penalty)
}

export function takeCover(character, merits, penalties) {
  // TODO: handle merits that affect pool?
  const penalty = penalties.wound + penalties.mobility
  return pool(character, 'dexterity', 'dodge', [], penalty)
}

export function featOfStrength(character, merits, penalties) {
  let thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = []
  if (thew != undefined) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.substr(-1)) }]
  }
  return pool(character, 'strength', 'athletics', bonus, penalties.wound)
}

export function shapeSorcery(character, merits, penalties) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus ? 0 : penalties.wound
  return pool(character, 'intelligence', 'occult', [], penalty)
}
