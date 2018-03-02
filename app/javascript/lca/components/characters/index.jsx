import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import AbilityBlock from './blocks/abilityBlock.jsx'
import ArmorSummary from './blocks/armorSummary.jsx'
import AttributeBlock from './blocks/attributeBlock.jsx'
import CharmSummaryBlock from './blocks/charmSummaryBlock.jsx'
import CombatBlock from './blocks/combatBlock.jsx'
import HealthLevelBlock from './blocks/healthLevelBlock.jsx'
import MeritSummaryBlock from './blocks/meritSummaryBlock.jsx'
import SocialBlock from './blocks/socialBlock.jsx'
import SpecialtyBlock from './blocks/specialtyBlock.jsx'
import WeaponSummaryBlock from './blocks/weaponSummaryBlock.jsx'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingLine from '../generic/ratingLine.jsx'
import { withWillpower, withIntimacies, fullChar, fullWeapon, fullMerit } from '../../utils/propTypes'
import { prettyFullExaltType, prettyAnimaLevel } from '../../utils/calculated'

export function IntimacySummary(props) {
  const principles = props.character.principles.map((p, index) =>
    <Typography key={ index } component="div">
      <RatingLine rating={ p.rating } fillTo={ 3 }>
        { p.subject }
      </RatingLine>
      <Divider />
    </Typography>
  )
  const ties = props.character.ties.map((p, index) =>
    <Typography key={ index } component="div">
      <RatingLine rating={ p.rating } fillTo={ 3 }>
        { p.subject }
      </RatingLine>
      <Divider />
    </Typography>
  )

  return <BlockPaper>
    <Typography variant="title">
      Intimacies
    </Typography>

    <Typography variant="subheading">Principles</Typography>
    { principles }

    <Typography variant="subheading">Ties</Typography>
    { ties }
  </BlockPaper>
}
IntimacySummary.propTypes = {
  character: PropTypes.shape(withIntimacies),
}

export function WillpowerBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Willpower
    </Typography>

    <Typography component="div">
      <RatingLine rating={ character.willpower_temporary } fillTo={10}>
        Current
      </RatingLine>
    </Typography>
    <Typography component="div">
      <RatingLine rating={ character.willpower_permanent } fillTo={10}>
        Permanent
      </RatingLine>
    </Typography>
  </BlockPaper>
}
WillpowerBlock.propTypes = {
  character: PropTypes.shape(withWillpower),
}

export function MotePoolBlock(props) {
  const { character } = props
  return <BlockPaper>
    <Typography variant="title">
      Mote Pool
    </Typography>

    <Typography>
      Personal: { character.motes_personal_current } / { character.motes_personal_total }
    </Typography>
    <Typography paragraph>
      Peripheral: { character.motes_peripheral_current } / { character.motes_peripheral_total }
    </Typography>
    <Typography>
      Anima banner: { prettyAnimaLevel(character.anima_level) }
    </Typography>
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
    </Typography>

    <Typography component="div">
      <RatingLine rating={ character.limit } fillTo={10}>
        Current
      </RatingLine>
    </Typography>
    <Typography>Limit Trigger: { character.limit_trigger }</Typography>
  </BlockPaper>
}
LimitTrackBlock.propTypes = {
  character: PropTypes.object,
}

export function CraftBlock(props) {
  const { character } = props
  return <BlockPaper>
    <Typography variant="title">
      Crafting
    </Typography>

    <Typography>
      Craft XP: { character.xp_craft_silver } silver, { character.xp_craft_gold } gold, { character.xp_craft_white } white
    </Typography>
  </BlockPaper>
}
CraftBlock.propTypes = {
  character: PropTypes.object,
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
            </Typography>

            <Typography variant="subheading">
              Essence { character.essence } { prettyFullExaltType(character) }
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

        { character.type != 'Character' &&
          <Grid item xs={ 12 } md={ 2 }>
            <MotePoolBlock character={ character } />
          </Grid>
        }

        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <BlockPaper>
            <Typography variant="title">
              Abilities
            </Typography>

            <AbilityBlock character={ character } />
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
                <WeaponSummaryBlock character={ character } weapons={ weapons } />
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
            <CharmSummaryBlock character={ character } />
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
