import * as calc from '.'

const mockChar = {
  attr_dexterity: 3, attr_wits: 3, attr_manipulation: 3, attr_stamina: 3, attr_strength: 2,
  abil_dodge: 4,  abil_integrity: 4, abil_socialize: 4,
  abil_melee: 2,
  abil_craft: [], abil_martial_arts: [], specialties: [],
  armor_weight: 'unarmored', armor_is_artifact: false,
  health_level_0s: 1, health_level_1s: 2, health_level_2s: 2, health_level_4s: 1, health_level_incap: 1,
  damage_bashing: 0, damage_lethal: 0, damage_aggravated: 0
}

describe('Calculated values', () => {
  it('should give correct defense values', () => {
    expect(calc.evasion(mockChar, [], {}).raw).toEqual(4)
    expect(calc.guile(mockChar, [], {}).raw).toEqual(4)
    expect(calc.resolve(mockChar, [], {}).raw).toEqual(4)
    expect(calc.naturalSoak(mockChar, [], {})).toEqual(3)
  })

  it('should give correct stats for armor', () => {
    const light =  { ...mockChar, armor_weight: 'light'  }
    const med =    { ...mockChar, armor_weight: 'medium' }
    const hvy =    { ...mockChar, armor_weight: 'heavy'  }
    const lightA = { ...light, armor_is_artifact: true   }
    const medA =   { ...med,   armor_is_artifact: true   }
    const hvyA =   { ...hvy,   armor_is_artifact: true   }

    expect(calc.hardness(mockChar)).toEqual(0)
    expect(calc.hardness(lightA)).toEqual(4)
    expect(calc.hardness(medA)).toEqual(7)
    expect(calc.hardness(hvyA)).toEqual(10)

    expect(calc.armorSoak(mockChar)).toEqual(0)
    expect(calc.armorSoak(light)).toEqual(3)
    expect(calc.armorSoak(med)).toEqual(5)
    expect(calc.armorSoak(hvy)).toEqual(7)
    expect(calc.armorSoak(lightA)).toEqual(5)
    expect(calc.armorSoak(medA)).toEqual(8)
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

    woundedCharacter.damage_aggravated = 2
    expect(calc.woundPenalty(woundedCharacter, [])).toEqual(4)
  })

  it('should give correct values for abilities', () => {
    // TODO: figure out why this doesn't work
    expect(calc.attackAbilities(mockChar)).toEqual([{ abil: 'melee', rating: 2, specialties: [] }])
    expect(calc.abilitiesWithRatings(mockChar).length).toEqual(4)
  })

  it('should give correct info for weapons', () => {
    const light = { weight: 'light', is_artifact: false, tags: [], ability: 'melee', attr: 'dexterity', }
    const medium = { ...light, weight: 'medium' }
    const heavy =  { ...light, weight: 'heavy' }
    const shield = { ...medium, tags: ['shield'] }

    const lightA = { ...light,  is_artifact: true }
    const medA =   { ...medium, is_artifact: true }
    const hvyA =   { ...heavy,  is_artifact: true }

    expect(calc.witheringAttackPool(mockChar, light)).toEqual(9)
    expect(calc.witheringAttackPool(mockChar, medium)).toEqual(7)
    expect(calc.witheringAttackPool(mockChar, heavy)).toEqual(5)

    expect(calc.witheringAttackPool(mockChar, lightA)).toEqual(10)
    expect(calc.witheringAttackPool(mockChar, medA)).toEqual(8)
    expect(calc.witheringAttackPool(mockChar, hvyA)).toEqual(6)

    expect(calc.weaponDamage(mockChar, light)).toEqual(9)
    expect(calc.weaponDamage(mockChar, shield)).toEqual(9)
    expect(calc.weaponDamage(mockChar, heavy)).toEqual(13)

    expect(calc.weaponDamage(mockChar, lightA)).toEqual(12)
    expect(calc.weaponDamage(mockChar, medA)).toEqual(14)
    expect(calc.weaponDamage(mockChar, hvyA)).toEqual(16)

    expect(calc.weaponOverwhelming(light)).toEqual(1)
  })
})
