import React from 'react'

function EvasionScore(props) {
  const dex = props.character.attr_dexterity;
  const dodge = props.character.abil_dodge;

  const evasionRaw = Math.ceil(( dex + dodge ) / 2 );

  if (props.character.specialties != null) {
    const evasionSpecialties = props.character.specialties.filter(function(value) {
      return value.ability === "Dodge"
    });

    var evasionNote = "";

    if (evasionSpecialties.length > 0) {
      if (((( dex + dodge) / 2) % 2) == 1) {
        evasionNote = <span>(!)</span>;
      } else {
        evasionNote = <span>({ evasionRaw + 1} w/specialty)</span>;
      }
    }
  }
  return (
    <div>
      Evasion: { evasionRaw }{ evasionNote }
    </div>
  );
}

function Soak(props) {
  if (props.character.armors == null)
    return <span>{ props.character.attr_stamina }</span>;

  const armor = props.character.armors.find(function(armor) {
    return armor.equipped;
  });

  let armorSoak = 0;
  switch(armor.weight) {
  case "light":
    armorSoak = armor.isArtifact ? 5 : 3;
    break;
  case "medium":
    armorSoak =  armor.isArtifact ? 8 : 5;
    break;
  case "heavy":
    armorSoak = armor.isArtifact ? 11 : 7;
  }


  return <span>{ props.character.attr_stamina + armorSoak }</span>;
}

function CombatBlock(props) {

  return (
    <div>
      <div>Soak: <Soak character={props.character} /></div>
      <EvasionScore character={props.character} />
      
    </div>
  );
}

export default CombatBlock
