import React from 'react'
import Divider from 'material-ui/Divider'
import AbilityPopup from './editors/abilityPopup.jsx'
import RatingDots from '../generic/ratingDots.jsx'

function AbilityBlock(props) {
  return(<div className="abilityBlock">
    { props.ability }:
    <RatingDots rating={ props.rating } />
    <Divider />
  </div>)
}

function FullAbilityBlock(props) {
  const { character } = props

  let craft = ''
  if (character.abil_craft == null) {
    craft = <AbilityBlock ability="Craft" rating={0} />
  } else {
    craft = character.abil_craft.map((craft) =>
      <AbilityBlock key={craft.craft} ability={ 'Craft (' + craft.craft + ')' } rating={craft.rating} />
    )
  }

  let ma = ''
  if (character.abil_martial_arts == null) {
    ma = <AbilityBlock ability="Martial Arts" rating={0} />
  } else {
    ma = character.abil_martial_arts.map((ma) =>
      <AbilityBlock key={ma.style} ability={ 'Martial Arts (' + ma.style + ')' } rating={ma.rating} />
    )
  }

  return(
    <div className="fullAbilityBlock">
      <h3>Abilities<AbilityPopup character={ character } /></h3>
      <AbilityBlock ability="Archery" rating={ character.abil_archery } />
      <AbilityBlock ability="Athletics" rating={ character.abil_athletics } />
      <AbilityBlock ability="Awareness" rating={ character.abil_awareness } />
      <AbilityBlock ability="Brawl" rating={ character.abil_brawl } />
      <AbilityBlock ability="Bureaucracy" rating={ character.abil_bureaucracy } />
      { craft }
      <AbilityBlock ability="Dodge" rating={ character.abil_dodge } />
      <AbilityBlock ability="Integrity" rating={ character.abil_integrity } />
      <AbilityBlock ability="Investigation" rating={ character.abil_investigation } />
      <AbilityBlock ability="Larceny" rating={ character.abil_larceny } />
      <AbilityBlock ability="Linguistics" rating={ character.abil_linguistics } />
      <AbilityBlock ability="Lore" rating={ character.abil_lore } />
      { ma }
      <AbilityBlock ability="Medicine" rating={ character.abil_medicine } />
      <AbilityBlock ability="Melee" rating={ character.abil_melee } />
      <AbilityBlock ability="Occult" rating={ character.abil_occult } />
      <AbilityBlock ability="Performance" rating={ character.abil_performance } />
      <AbilityBlock ability="Presence" rating={ character.abil_presence } />
      <AbilityBlock ability="Resistance" rating={ character.abil_resistance } />
      <AbilityBlock ability="Ride" rating={ character.abil_ride } />
      <AbilityBlock ability="Sail" rating={ character.abil_sail } />
      <AbilityBlock ability="Socialize" rating={ character.abil_socialize } />
      <AbilityBlock ability="Stealth" rating={ character.abil_stealth } />
      <AbilityBlock ability="Survival" rating={ character.abil_survival } />
      <AbilityBlock ability="Thrown" rating={ character.abil_thrown } />
      <AbilityBlock ability="War" rating={ character.abil_war } />
    </div>
  )
}

export default FullAbilityBlock
