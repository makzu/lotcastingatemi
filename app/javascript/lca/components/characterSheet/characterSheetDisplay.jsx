import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import toggleEditor from '../../actions'

import CombatBlock from './combatBlock.jsx'
import SocialBlock from './socialBlock.jsx'
import FullAttributeBlock from './fullAttributeBlock.jsx'
import FullAbilityBlock from './fullAbilityBlock.jsx'
import WeaponSummary from './weaponSummary.jsx'
import ArmorSummary from './armorSummary.jsx'
import HealthLevelBlock from './healthLevelBlock.jsx'

import SpecialtyPopup from './editors/specialtyPopup.jsx'
import IntimacyPopup from './editors/intimacyPopup.jsx'
import WillpowerPopup from './editors/willpowerPopup.jsx'
import AllMeritsPopup from './editors/allMeritsPopup.jsx'
import BasicsEditorPopup from './editors/basicsEditorPopup.jsx'

import RatingDots from '../../utils/ratingDots.jsx'
import * as calc from '../../utils/calculated/'

function FullSpecialtyBlock(props) {
  const character = props.character
  const specialties = character.specialties

  const spec = specialties.map((s) =>
    <div key={s.ability + s.context}>
      <span className="specialtyAbility">
        { s.ability }
      </span>
      <span className="specialtyContext">
        { s.context }
      </span>
      <Divider />
    </div>
  );

  return(<div className="fullSpecialtyBlock">
    <h3>Specialties<SpecialtyPopup character={ character } /></h3>
    { spec }
  </div>);
}

function MeritSummary(props) {
  const merits = props.merits.map((merit) =>
    <div key={merit.id}>
      { merit.name }
      ({ merit.merit_name })
      <RatingDots rating={merit.rating} dontFill />
      <Divider />
    </div>
  );

  return(<div className="meritSummaryBlock">
    <h3>Merits<AllMeritsPopup character={ props.character } merits={ props.merits } /></h3>
    { merits}
  </div>);
}

function IntimacySummary(props) {
  const principles = props.character.principles.map((p, index) =>
    <div className="intimacyListItem" key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } fillTo={ 3 } />
      <Divider />
    </div>
  )
  const ties = props.character.ties.map((p, index) =>
    <div className="intimacyListItem" key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } fillTo={ 3 } />
      <Divider />
    </div>
  )

  return(<div className="intimacySummaryBlock">
    <h3>Intimacies<IntimacyPopup character={ props.character } /></h3>
    <div>
      <h5>Principles</h5>
      { principles }
    </div>
    <div>
      <h5>Ties</h5>
      { ties }
    </div>

  </div>);
}

function WillpowerBlock(props) {
  const { character } = props

  return(<div className="willpowerBlock">
    <h3>Willpower<WillpowerPopup character={ character } /></h3>
    <div className="current">
      Current: <RatingDots rating={ character.willpower_temporary } fillTo={10} />
    </div>
    <div className="permanant">
      Permanant: <RatingDots rating={ character.willpower_permanent } fillTo={10} />
    </div>
    <Divider />
  </div>)
}

class CharacterSheetDisplay extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const { character, weapons, merits } = this.props

    return(<Paper className="characterSheetPaper">
      <div className="characterSheet">
        <h1 className="name">{character.name}<BasicsEditorPopup character={ character } /></h1>

        <FullAbilityBlock character={ character } />
        <FullAttributeBlock character={ character } />

        <FullSpecialtyBlock character={ character } />
        <MeritSummary character={ character } merits={ merits } />

        <WeaponSummary character={ character } weapons={ weapons } />

        <hr className="clear4" />

        <CombatBlock character={ character } weapons={ weapons } merits={ merits } />
        <HealthLevelBlock character={ character } />
        <WillpowerBlock character={ character } />

        <hr className="clear4" />
        <ArmorSummary character={ character } />

        <SocialBlock character={ character } />
        <IntimacySummary character={ character } />

      </div>
    </Paper>)
  }
}

export default CharacterSheetDisplay
