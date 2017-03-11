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
  )
}

function HighestParry(props) {
  
  return(
    <div>
    </div>
  )
}

function CombatBlock(props) {

  return (
    <div>
      <EvasionScore character={props.character} />
      <HighestParry character={props.character} />
    </div>
  );
}
