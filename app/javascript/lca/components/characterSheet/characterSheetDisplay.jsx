import React from 'react'

import toggleEditor from '../../actions'

import CombatBlock from './combatBlock.jsx'
import ArmorSummary from './armorSummary.jsx'
import FullAttributeBlock from './fullAttributeBlock.jsx'
import FullAbilityBlock from './fullAbilityBlock.jsx'
import RatingDots from '../../utils/ratingDots.jsx'

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

//function CharacterSheetDisplay(props) {
class CharacterSheetDisplay extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const { character, weapons, armors, merits } = this.props

    return(<div className="characterSheet">
      <button onClick={this.props.toggleClick}>begin editing</button>
      <h1>{character.name}</h1>

      <CombatBlock character={character} weapons={weapons} armors={armors} merits={merits}/>

      <FullAttributeBlock character={ character } />
      <FullAbilityBlock character={ character } />
      <FullSpecialtyBlock specialties={ character.specialties } />
      <MeritSummary merits={ merits } />
      <ArmorSummary character={ character } armors={ armors } />


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
      </ul>
    </div>)
  }
}
  /*
  const weapons = character.weapons.map((id) => state.character.weapons[id])
  const armors = character.armors.map((id) => state.character.armors[id])
  const merits = character.merits.map((id) => state.character.merits[id])
  */

export default CharacterSheetDisplay
