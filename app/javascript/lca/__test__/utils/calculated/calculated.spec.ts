import * as calc from '@/utils/calculated'
import { mockCharacter as mockChar } from '../../_mocks'
describe('Calculated values', () => {
  it('should give correct defense values', () => {
    // $FlowThisIsOkayISwear
    expect(calc.evasion(mockChar, [], {}).raw).toEqual(4)
    // $FlowThisIsOkayISwear
    expect(calc.guile(mockChar, [], {}).raw).toEqual(4)
    // $FlowThisIsOkayISwear
    expect(calc.resolve(mockChar, [], {}).raw).toEqual(4)
    // $FlowThisIsOkayISwear
    expect(calc.naturalSoak(mockChar, [], {})).toEqual(3)
  })
  it('should give correct stats for armor', () => {
    const light = { ...mockChar, armor_weight: 'light' }
    const med = { ...mockChar, armor_weight: 'medium' }
    const hvy = { ...mockChar, armor_weight: 'heavy' }
    const lightA = { ...light, armor_is_artifact: true }
    const medA = { ...med, armor_is_artifact: true }
    const hvyA = { ...hvy, armor_is_artifact: true }
    // $FlowThisIsOkayISwear
    expect(calc.hardness(mockChar).total).toEqual(0)
    // $FlowThisIsOkayISwear
    expect(calc.hardness(lightA).total).toEqual(4)
    // $FlowThisIsOkayISwear
    expect(calc.hardness(medA).total).toEqual(7)
    // $FlowThisIsOkayISwear
    expect(calc.hardness(hvyA).total).toEqual(10)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(mockChar)).toEqual(0)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(light)).toEqual(3)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(med)).toEqual(5)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(hvy)).toEqual(7)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(lightA)).toEqual(5)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(medA)).toEqual(8)
    // $FlowThisIsOkayISwear
    expect(calc.armorSoak(hvyA)).toEqual(11)
    expect(calc.mobilityPenalty(mockChar)).toEqual(0)
    expect(calc.mobilityPenalty(light)).toEqual(0)
    expect(calc.mobilityPenalty(med)).toEqual(1)
    expect(calc.mobilityPenalty(hvyA)).toEqual(2)
  })
  it('should calculate health and wound penalties correctly', () => {
    let woundedCharacter = { ...mockChar, damage_bashing: 1 }
    expect(calc.totalHealthLevels(woundedCharacter)).toEqual(7)
    expect(calc.woundPenalty(woundedCharacter, [])).toEqual(0)
    woundedCharacter.damage_bashing = 2
    expect(calc.woundPenalty(woundedCharacter, [])).toEqual(1)
    woundedCharacter.damage_lethal = 2
    expect(calc.woundPenalty(woundedCharacter, [])).toEqual(2)
    expect(calc.woundPenalty(woundedCharacter, ['pain tolerance4'])).toEqual(1)
    woundedCharacter.damage_aggravated = 2
    expect(calc.woundPenalty(woundedCharacter, [])).toEqual(4)
    expect(calc.woundPenalty(woundedCharacter, ['pain tolerance4'])).toEqual(3)
  })
  it('should give correct values for abilities', () => {
    // $FlowThisIsOkayISwear
    expect(calc.attackAbilities(mockChar)).toEqual(
      expect.arrayContaining([
        {
          abil: 'melee',
          rating: 2,
          specialties: [],
        },
      ]),
    )
    // $FlowThisIsOkayISwear
    expect(calc.abilitiesWithRatings(mockChar).length).toEqual(4)
  })
  it('should give correct info for weapons', () => {
    const light = {
      weight: 'light',
      is_artifact: false,
      tags: [],
      ability: 'melee',
      attr: 'dexterity',
      damage_attr: 'strength',
      bonus_accuracy: 0,
      bonus_defense: 0,
      bonus_overwhelming: 0,
      bonus_damage: 0,
    }
    const mockPenalty = {
      wound: 0,
    }
    const medium = { ...light, weight: 'medium' }
    const heavy = { ...light, weight: 'heavy' }
    const shield = { ...medium, tags: ['shield'] }
    const lightA = { ...light, is_artifact: true }
    const medA = { ...medium, is_artifact: true }
    const hvyA = { ...heavy, is_artifact: true }
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, light, mockPenalty).total).toEqual(9)
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, medium, mockPenalty).total).toEqual(7)
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, heavy, mockPenalty).total).toEqual(5)
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, lightA, mockPenalty).total).toEqual(
      10,
    )
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, medA, mockPenalty).total).toEqual(8)
    // $FlowThisIsOkayISwear
    expect(calc.witheringAttack(mockChar, hvyA, mockPenalty).total).toEqual(6)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, light).total).toEqual(9)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, shield).total).toEqual(9)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, heavy).total).toEqual(13)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, lightA).total).toEqual(12)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, medA).total).toEqual(14)
    // $FlowThisIsOkayISwear
    expect(calc.witheringDamage(mockChar, hvyA).total).toEqual(16)
    // $FlowThisIsOkayISwear
    expect(calc.weaponOverwhelming(mockChar, light)).toEqual(1)
  })
})
