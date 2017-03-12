import React from 'react'
import CombatBlock from './combatBlock.jsx'
import FullAttributeBlock from './fullAttributeBlock.jsx'
import RatingDots from './ratingDots.jsx'

function AbilityBlock(props) {
  return(<div>
    { props.ability }:
    <RatingDots rating={ props.rating } />
  </div>);
}

function FullAbilityBlock(props) {
  let craft = "";
  if (props.character.abil_craft == null) {
    ma = <AbilityBlock ability="Craft" rating={0} />
  } else {
    craft = props.character.abil_craft.map((craft) =>
      <AbilityBlock key={craft.craft} ability={ "Craft (" + craft.craft + ")" } rating={craft.rating} />
    );
  }

  let ma = "";
  if (props.character.abil_martial_arts == null) {
    craft = <AbilityBlock ability="Martial Arts" rating={0} />
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

function FullSpecialtyBlock(props) {
  if (props.specialties == undefined)
    return(<div />);

  const spec = props.specialties.map((s) =>
    <div key={s.ability + s.context}>
      { s.ability }:
      { s.context }
    </div>
  );

  return(<div className="fullSpecialtyBlock">
    <h3>Specialties</h3>
    { spec }
  </div>);
}

function MeritSummary(props) {
  if (props.merits == undefined)
    return(<div />);

  const merits = props.merits.map((merit) =>
    <div key={merit.id}>
      { merit.name || merit.merit_name }
      <RatingDots rating={merit.rating} dontFill />
    </div>
  );

  return(<div className="meritSummary">
    <h3>Merits</h3>
    { merits}
  </div>);
}

function ArmorSummary(props) {
}

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { character: {} };
  }

  componentDidMount() {
    $.getJSON('/api/v1/characters/1.json', (response) => { this.setState({ character: response }) });
  }

  render() {
    return (
      <div className="fullCharacterSheet">
        <h1>{this.state.character.name}</h1>

        <CombatBlock character={this.state.character} />

        <FullAttributeBlock character={ this.state.character } />
        <FullAbilityBlock character={ this.state.character } />
        <FullSpecialtyBlock specialties={ this.state.character.specialties } />
        <MeritSummary merits={ this.state.character.merits } />

        <h3>Armor</h3>
        <div>

        </div>


        <h3>Health/Willpower</h3>
        <ul>
          <li>{ this.state.character.health_level_0s } x0</li>
          <li>{ this.state.character.health_level_1s } x1</li>
          <li>{ this.state.character.health_level_2s } x2</li>
          <li>{ this.state.character.health_level_4s } x4</li>
          <li>{ this.state.character.health_level_incap } incap</li>
          <li>Willpower: 
            <RatingDots rating={ this.state.character.willpower_temporary } fillTo={10} />
            /
            <RatingDots rating={ this.state.character.willpower_permanent } fillTo={10} />
          </li>
        </ul>
      </div>
    );
  }
}

export default CharacterSheet
