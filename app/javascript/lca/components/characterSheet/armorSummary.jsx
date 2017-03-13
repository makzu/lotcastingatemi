import React from 'react'

function ArmorSummary(props) {
  const arm = props.computed.currentArmor

  return(<div className="armorSummary">
    <h3>Armor</h3>
    <p>Name: { arm.name }</p>
    <p>Weight: { arm.weight }</p>
    <p>Mobility Penalty: { arm.mobilityPenalty }</p>
    <p>Soak: +{ arm.soak }</p>
    <p>Hardness: { arm.hardness } </p>
  </div>)
}

export default ArmorSummary
