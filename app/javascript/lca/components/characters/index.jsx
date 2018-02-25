import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import AttributeBlock from './blocks/attributeBlock.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import MeritSummaryBlock from './blocks/meritSummaryBlock.jsx'
import SpecialtyBlock from './blocks/specialtyBlock.jsx'
import CombatBlock from './blocks/combatBlock.jsx'
import SocialBlock from './blocks/socialBlock.jsx'
import FullAbilityBlock from './fullAbilityBlock.jsx'
import WeaponSummary from './weaponSummary.jsx'
import ArmorSummary from './blocks/armorSummary.jsx'
import HealthLevelBlock from './blocks/healthLevelBlock.jsx'
import CharmSummary from './charmSummary.jsx'

import AbilityPopup from './editors/abilityPopup.jsx'
import IntimacyPopup from './editors/intimacyPopup.jsx'
import WillpowerPopup from './editors/willpowerPopup.jsx'
import BasicsEditorPopup from './editors/basicsEditorPopup.jsx'
import LimitPopup from './editors/limitPopup.jsx'
import ExaltEditorPopup from './editors/exaltEditorPopup.jsx'

import RatingDots from '../generic/ratingDots.jsx'
import { withWillpower, withIntimacies, fullChar, fullWeapon, fullMerit } from '../../utils/propTypes'
import { prettyFullExaltType } from '../../utils/calculated'

export function IntimacySummary(props) {
  const principles = props.character.principles.map((p, index) =>
    <Typography component="div" key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } fillTo={ 3 } />
      <Divider />
    </Typography>
  )
  const ties = props.character.ties.map((p, index) =>
    <Typography component="div" key={index}>
      { p.subject }
      <RatingDots rating={ p.rating } fillTo={ 3 } />
      <Divider />
    </Typography>
  )

  return <BlockPaper>
    <Typography variant="title">
      Intimacies
      <IntimacyPopup character={ props.character } />
    </Typography>

    <Typography variant="subheading">Principles</Typography>
    { principles }

    <Typography variant="subheading">Ties</Typography>
    { ties }
  </BlockPaper>
}
IntimacySummary.propTypes = {
  character: PropTypes.shape(withIntimacies)
}

export function WillpowerBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Willpower
      <WillpowerPopup character={ character } />
    </Typography>

    <Typography component="div">
      Current: <RatingDots rating={ character.willpower_temporary } fillTo={10} />
    </Typography>
    <Typography component="div">
      Permanent: <RatingDots rating={ character.willpower_permanent } fillTo={10} />
    </Typography>
  </BlockPaper>
}
WillpowerBlock.propTypes = {
  character: PropTypes.shape(withWillpower)
}

export function MotePoolBlock(props) {
  const { character } = props
  return <BlockPaper>
    { character.motes_personal_total > 0 &&
      <div>
        <Typography variant="title">
          Mote Pool
        </Typography>

        <Typography>
          Personal: { character.motes_personal_current } / { character.motes_personal_total }
        </Typography>
        <Typography>
          Peripheral: { character.motes_peripheral_current } / { character.motes_peripheral_total }
        </Typography>
      </div>
    }
  </BlockPaper>
}

MotePoolBlock.propTypes = {
  character: PropTypes.shape(fullChar),
}

export function LimitTrackBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Limit
      <LimitPopup character={ character } />
    </Typography>

    <Typography component="div">
      Current: <RatingDots rating={ character.limit } fillTo={10} />
    </Typography>
    <Typography>Limit Trigger: { character.limit_trigger }</Typography>
  </BlockPaper>
}
LimitTrackBlock.propTypes = {
  character: PropTypes.object
}

export class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character, weapons, merits } = this.props
    return <div>
      <Grid container spacing={ 24 }>
        <Grid item xs={ 12 } md={ 4 }>
          <BlockPaper>
            <Typography variant="headline">
              { character.name }
              <BasicsEditorPopup character={ character } />
            </Typography>

            <Typography variant="subheading">
              Essence { character.essence } { prettyFullExaltType(character) }
              <ExaltEditorPopup character={ character } />
            </Typography>

            <Typography paragraph>
              { character.description }
            </Typography>
          </BlockPaper>
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <WillpowerBlock character={ character } />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <HealthLevelBlock character={ character } />
        </Grid>

        <Grid item xs={ 12 } md={ 2 }>
          <MotePoolBlock character={ character } />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <BlockPaper>
            <Typography variant="title">
              Abilities
              <AbilityPopup character={ character } />
            </Typography>

            <FullAbilityBlock character={ character } />
          </BlockPaper>
        </Grid>

        <Grid item xs={ 12 } sm ={ 6 } md={ 9 }>
          <Grid container spacing={ 24 }>
            <Grid item xs={ 12 }>
              <AttributeBlock character={ character } />
            </Grid>

            <Grid item xs={ 4 }>
              <SpecialtyBlock character={ character } />
            </Grid>

            <Grid item xs={ 8 }>
              <BlockPaper>
                <Typography variant="title">
                  Merits
                  <Button component={ Link } to={ `/characters/${character.id}/merits` }>Full</Button>
                </Typography>

                <MeritSummaryBlock character={ character } merits={ merits } />
              </BlockPaper>
            </Grid>

            <Grid item xs={ 12 }>
              <BlockPaper>
                <Typography variant="title">
                  Weapons
                </Typography>
                <WeaponSummary character={ character } weapons={ weapons } />
              </BlockPaper>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={ 12 } md={ 8 }>
          <BlockPaper>
            <Typography variant="title">
              Combat Pools
            </Typography>
            <CombatBlock character={ character } weapons={ weapons } merits={ merits } />
          </BlockPaper>
        </Grid>

        <Grid item xs={ 12 } md={ 4 }>
          <SocialBlock character={ character } />
        </Grid>

        <Grid item xs={ 12 } md={ 5 }>
          <ArmorSummary character={ character } />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <IntimacySummary character={ character } />
        </Grid>

        { character.limit != undefined &&
          <Grid item xs={ 12 } md={ 2 }>
            <LimitTrackBlock character={ character } />
          </Grid>
        }

        { character.type != 'Character' &&
          <Grid item xs={ 12 }>
            <CharmSummary character={ character } />
          </Grid>
        }
      </Grid>
    </div>

  }
}
CharacterSheet.propTypes = {
  character: PropTypes.shape(fullChar),
  weapons: PropTypes.arrayOf(PropTypes.shape(fullWeapon)),
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)).isRequired
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId]
  let weapons = []
  let merits = []

  if (character != undefined) {
    if (character.weapons != undefined) {
      weapons = character.weapons.map((id) => state.entities.weapons[id])
    }
    if (character.weapons != undefined) {
      merits = character.merits.map((id) => state.entities.merits[id])
    }
  }


  return {
    character,
    weapons,
    merits,
  }
}

export default connect(
  mapStateToProps
)(CharacterSheet)
