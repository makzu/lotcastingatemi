import { specialtiesFor, maxExcellency } from '.'

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

export function pool(name, character, attribute, ability, meritBonus, penalties, charmAbils) {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  let mb = 0
  if (meritBonus.length > 1)
    mb =  meritBonus.reduce((a, v) => v + a.situational ? 0 : a.bonus)

  const excellency = maxExcellency(character, attribute, ability, charmAbils)
  const excellencyStunt = maxExcellency(character, attribute, ability, charmAbils, true)
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0 )

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: pool,
    meritBonus: meritBonus || [],
    specialties: specialtiesFor(character, ability),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: penalties.filter((p) => p.penalty > 0),
    total: Math.max(pool + mb - penalty, 0)
  }
}

export function joinBattle(character, merits, penalties, charmAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fast reflexes')))
    bonus = [{ label: 'fast reflexes', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Join Battle', character, 'wits', 'awareness', bonus, penalty, charmAbils)
}

export function rush(character, merits, penalties, charmAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Rush', character, 'dexterity', 'athletics', bonus, penalty, charmAbils)
}

export function disengage(character, merits, penalties, charmAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Disengage', character, 'dexterity', 'dodge', bonus, penalty, charmAbils)
}
export const withdraw = disengage

export function readIntentions(character, merits, penalties, charmAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('danger sense')))
    bonus = [{ label: 'danger sense', bonus: 1, situational: true }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Read Intentions', character, 'perception', 'socialize', bonus, penalty, charmAbils)
}

export function riseFromProne(character, merits, penalties, charmAbils) {
  // TODO: handle merits that affect rise from prone pool?
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Rise from Prone', character, 'dexterity', 'dodge', [], penalty, charmAbils)
}

export function takeCover(character, merits, penalties, charmAbils) {
  // TODO: handle merits that affect take cover pool?
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Take Cover', character, 'dexterity', 'dodge', [], penalty, charmAbils)
}

export function featOfStrength(character, merits, penalties, charmAbils) {
  let thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = []
  if (thew != undefined) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.substr(-1)) }]
  }
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Feat of Strength', character, 'strength', 'athletics', bonus, penalty, charmAbils)
}

export function shapeSorcery(character, merits, penalties, charmAbils) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus ? [] : [{ label: 'wound', penalty: penalties.wound }]
  return pool('Shape Sorcery', character, 'intelligence', 'occult', [], penalty, charmAbils)
}
