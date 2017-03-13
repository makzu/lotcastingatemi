import React from 'react'

function WeaponData(props) {
  const weap = props.weapon

  return(<div>
    { weap.name }:
    Attack Pool: { weap.witheringPool } ({ weap.decisivePool } decisive)
    Raw Damage: { weap.damage }
    Parry: { weap.parry }
    Overwhelming: { weap.overwhelming }
  </div>)
}

function CombatBlock(props) {
  if (props.computed == null)
    return <div />

  const weapons = props.computed.weapons.map((weapon) =>
    <WeaponData key={weapon.id} weapon={weapon} character={props.character} />
  )

  return (
    <div>
      <div>Resolve: { props.computed.resolveRaw }</div>
      <div>Guile: { props.computed.guileRaw }</div>
      <div>Evasion: { props.computed.evasionRaw }</div>
      <div>Soak: { props.computed.totalSoak }</div>
      { weapons }
    </div>
  );
}

export default CombatBlock
