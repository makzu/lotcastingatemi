import { specialtiesFor, maxExcellency } from '.'

export const attr = (character, attribute) => character[`attr_${attribute}`]
export const abil = (character, ability) => {
  let abil
  if (ability.startsWith('martial arts')) {
    abil = character.abil_martial_arts.find((art) => `martial arts (${art.style})` === ability)
    return abil !== undefined ? abil.rating : 0
  } else if (ability === 'craft') {
    // Checking 'craft' without parenthesis only happens when checking for Solar
    // Excellencies, so we don't need an exact number here
    if (character.abil_craft.length === 0)
      return 0
    return 1
  } else if (ability.startsWith('craft')) {
    abil = character.abil_craft.find((craft) => `craft (${craft.craft})` == ability)
    return abil != undefined ? abil.rating : 0
  } else {
    return character[`abil_${ ability }`]
  }
}

export function pool(name, character, attribute, ability, bonus, penalties, excellencyAbils) {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  let mb = 0
  if (bonus.length > 0)
    mb =  bonus.reduce((a, b) => a + (b.situational ? 0 : b.bonus), 0)

  const excellency = maxExcellency(character, attribute, ability, excellencyAbils, false)
  const excellencyStunt = maxExcellency(character, attribute, ability, excellencyAbils, false, true)
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0 )

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: pool,
    bonus: bonus || [],
    specialties: specialtiesFor(character, ability),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: penalties.filter((p) => p.penalty > 0),
    total: Math.max(pool + mb - penalty, 0)
  }
}

export function joinBattle(character, merits, penalties, excellencyAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fast reflexes')))
    bonus = [{ label: 'fast reflexes', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Join Battle', character, 'wits', 'awareness', bonus, penalty, excellencyAbils)
}

export function rush(character, merits, penalties, excellencyAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Rush', character, 'dexterity', 'athletics', bonus, penalty, excellencyAbils)
}

export function disengage(character, merits, penalties, excellencyAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Disengage', character, 'dexterity', 'dodge', bonus, penalty, excellencyAbils)
}
export const withdraw = disengage

export function readIntentions(character, merits, penalties, excellencyAbils) {
  let bonus = []
  if (merits.some((m) => m.startsWith('danger sense')))
    bonus = [{ label: 'danger sense', bonus: 1, situational: true }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Read Intentions', character, 'perception', 'socialize', bonus, penalty, excellencyAbils)
}

export function riseFromProne(character, merits, penalties, excellencyAbils) {
  // TODO: handle merits that affect rise from prone pool?
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Rise from Prone', character, 'dexterity', 'dodge', [], penalty, excellencyAbils)
}

export function takeCover(character, merits, penalties, excellencyAbils) {
  // TODO: handle merits that affect take cover pool?
  const penalty = [{ label: 'wound', penalty: penalties.wound }, { label: 'mobility', penalty: penalties.mobility }]
  return pool('Take Cover', character, 'dexterity', 'dodge', [], penalty, excellencyAbils)
}

export function featOfStrength(character, merits, penalties, excellencyAbils) {
  let thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = []
  if (thew != undefined) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.substr(-1)) }]
  }
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool('Feat of Strength', character, 'strength', 'athletics', bonus, penalty, excellencyAbils)
}

export function shapeSorcery(character, merits, penalties, excellencyAbils) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus ? [] : [{ label: 'wound', penalty: penalties.wound }]
  return pool('Shape Sorcery', character, 'intelligence', 'occult', [], penalty, excellencyAbils)
}
