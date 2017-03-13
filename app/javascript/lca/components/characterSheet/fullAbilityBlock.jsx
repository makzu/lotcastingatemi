import React from 'react'
import RatingDots from '../../utils/ratingDots.jsx'

function AbilityBlock(props) {
  return(<div>
    { props.ability }:
    <RatingDots rating={ props.rating } />
  </div>);
}

function FullAbilityBlock(props) {
  let craft = "";
  if (props.character.abil_craft == null) {
    craft = <AbilityBlock ability="Craft" rating={0} />
  } else {
    craft = props.character.abil_craft.map((craft) =>
      <AbilityBlock key={craft.craft} ability={ "Craft (" + craft.craft + ")" } rating={craft.rating} />
    );
  }

  let ma = "";
  if (props.character.abil_martial_arts == null) {
    ma = <AbilityBlock ability="Martial Arts" rating={0} />
  } else {
    ma = props.character.abil_martial_arts.map((ma) =>
      <AbilityBlock key={ma.style} ability={ "Martial Arts (" + ma.style + ")" } rating={ma.rating} />
    );
  }


  return(
    <div>
      <h3>Abilities</h3>
      <AbilityBlock ability="Archery" rating={ props.character.abil_archery } />
      <AbilityBlock ability="Athletics" rating={ props.character.abil_athletics } />
      <AbilityBlock ability="Awareness" rating={ props.character.abil_awareness } />
      <AbilityBlock ability="Brawl" rating={ props.character.abil_brawl } />
      <AbilityBlock ability="Bureaucracy" rating={ props.character.abil_bureaucracy } />
      { craft }
      <AbilityBlock ability="Dodge" rating={ props.character.abil_dodge } />
      <AbilityBlock ability="Integrity" rating={ props.character.abil_integrity } />
      <AbilityBlock ability="Investigation" rating={ props.character.abil_investigation } />
      <AbilityBlock ability="Larceny" rating={ props.character.abil_larceny } />
      <AbilityBlock ability="Linguistics" rating={ props.character.abil_linguistics } />
      <AbilityBlock ability="Lore" rating={ props.character.abil_lore } />
      { ma }
      <AbilityBlock ability="Medicine" rating={ props.character.abil_medicine } />
      <AbilityBlock ability="Melee" rating={ props.character.abil_melee } />
      <AbilityBlock ability="Occult" rating={ props.character.abil_occult } />
      <AbilityBlock ability="Performance" rating={ props.character.abil_performance } />
      <AbilityBlock ability="Presence" rating={ props.character.abil_presence } />
      <AbilityBlock ability="Resistance" rating={ props.character.abil_resistance } />
      <AbilityBlock ability="Ride" rating={ props.character.abil_ride } />
      <AbilityBlock ability="Sail" rating={ props.character.abil_sail } />
      <AbilityBlock ability="Socialize" rating={ props.character.abil_socialize } />
      <AbilityBlock ability="Stealth" rating={ props.character.abil_stealth } />
      <AbilityBlock ability="Survival" rating={ props.character.abil_survival } />
      <AbilityBlock ability="Thrown" rating={ props.character.abil_thrown } />
      <AbilityBlock ability="War" rating={ props.character.abil_war } />
    </div>
  );
}

export default FullAbilityBlock
