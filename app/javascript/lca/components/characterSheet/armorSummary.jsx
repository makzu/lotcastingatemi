import React from 'react'
import * as calc from '../../utils/calculated'

function ArmorSummary(props) {
  const { character } = props
  const currentArmor = calc.currentArmor(character, props.armors)
  const soak = character.attr_stamina + calc.armorSoak(currentArmor)

  return(<div className="armorSummary">
    <h3>Armor</h3>
    <p>Name: { currentArmor.name }</p>
    <p>Weight: { currentArmor.weight }</p>
    <p>Mobility Penalty: { calc.armorMobilityPenalty(currentArmor) }</p>
    <p>Soak: +{ calc.armorSoak(currentArmor) } ({ soak } total)</p>
    <p>Hardness: { calc.armorHardness(currentArmor) } </p>
  </div>)
}

export default ArmorSummary
