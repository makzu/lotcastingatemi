import React from 'react'

import toggleEditor from '../../actions'

import CombatBlock from './combatBlock.jsx'
import FullAttributeBlock from './fullAttributeBlock.jsx'
import FullAbilityBlock from './fullAbilityBlock.jsx'
import RatingDots from '../../utils/ratingDots.jsx'
import * as calc from '../../utils/calculated/'

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
function IntimacySummary(props) {
  const principles = props.character.principles.map((p, index) =>
    <li key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } dontFill />
    </li>
  )
  const ties = props.character.ties.map((p, index) =>
    <li key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } dontFill />
    </li>
  )
  return(<div className="intimacySummary">
    <h3>Intimacies</h3>
    <div>
      <h5>Principles</h5>
      <ul>
        { principles }
      </ul>
    </div>
    <div>
      <h5>Ties</h5>
      <ul>
        { ties }
      </ul>
    </div>

  </div>);
}

//function CharacterSheetDisplay(props) {
class CharacterSheetDisplay extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const { character, weapons, merits } = this.props

    return(<div className="characterSheet">
      <button onClick={this.props.toggleClick}>begin editing</button>
      <h1>{character.name}</h1>

      <CombatBlock character={character} weapons={weapons} merits={merits}/>

      <FullAttributeBlock character={ character } />
      <FullAbilityBlock character={ character } />
      <FullSpecialtyBlock specialties={ character.specialties } />
      <MeritSummary merits={ merits } />

      <IntimacySummary character={ character } />

      <h3>Health/Willpower</h3>
      <ul>
        <li>{ character.health_level_0s } x0</li>
        <li>{ character.health_level_1s } x1</li>
        <li>{ character.health_level_2s } x2</li>
        <li>{ character.health_level_4s } x4</li>
        <li>{ character.health_level_incap } incap</li>
        <li>Willpower:
          <RatingDots rating={ character.willpower_temporary } fillTo={10} />
          /
          <RatingDots rating={ character.willpower_permanent } fillTo={10} />
        </li>
        <li>Armor:
          { character.armor_name } ({ character.armor_weight }, +{ calc.armorSoak(character)} soak)
        </li>
      </ul>
    </div>)
  }
}

export default CharacterSheetDisplay
