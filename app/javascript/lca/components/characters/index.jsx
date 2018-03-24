import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'

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
import { getSpecificCharacter, getPenalties, getPoolsAndRatings } from '../../selectors'
import { withWillpower, withIntimacies, fullChar, fullWeapon, fullMerit } from '../../utils/propTypes'
import {
  prettyFullExaltType, prettyAnimaLevel,
  committedPersonalMotes, committedPeripheralMotes,
} from '../../utils/calculated'

export function IntimacySummary({ character }) {
  const principles = character.principles.map((p, index) =>
    <Typography key={ index } component="div">
      <RatingLine rating={ p.rating } fillTo={ 3 }>
        { p.subject }
      </RatingLine>
      <Divider />
    </Typography>
  )
  const ties = character.ties.map((p, index) =>
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

    <Typography variant="subheading" style={{ marginTop: '0.5em' }}>Ties</Typography>
    { ties }
  </BlockPaper>
}
IntimacySummary.propTypes = {
  character: PropTypes.shape(withIntimacies),
}

export function WillpowerBlock({ character }) {
  const re = character.resources || []
  const res = re.map((r, index) =>
    <Typography key={ index }>
      { r.resource }: { r.value }
    </Typography>
  )
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
    { res.length > 0 && <Typography variant="subheading" style={{ marginTop: '0.5em' }}>
      Misc. Resources
    </Typography>}
    { res }
  </BlockPaper>
}
WillpowerBlock.propTypes = {
  character: PropTypes.shape(withWillpower),
}

export function MotePoolBlock({ character }) {
  const persCommit = committedPersonalMotes(character)
  const periCommit = committedPeripheralMotes(character)

  return <BlockPaper>
    <Typography variant="title">
      Mote Pool
    </Typography>

    <Typography>
      Personal: { character.motes_personal_current } / { character.motes_personal_total }
      { persCommit > 0 &&
        <span> ({persCommit}c)</span>
      }
    </Typography>
    { character.motes_peripheral_total > 0 &&
      <Typography>
        Peripheral: { character.motes_peripheral_current } / { character.motes_peripheral_total }
        { periCommit > 0 &&
          <span> ({periCommit}c)</span>
        }
      </Typography>
    }
    { character.is_sorcerer &&
      <Typography>
        Sorcerous : { character.sorcerous_motes }
      </Typography>
    }

    <Typography style={{ marginTop: '0.5em' }}>
      Anima banner: { prettyAnimaLevel(character.anima_level) }
    </Typography>
  </BlockPaper>
}
MotePoolBlock.propTypes = {
  character: PropTypes.shape(fullChar),
}

export function LimitTrackBlock({ character }) {
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

export function SorceryBlock({ character }) {
  return <BlockPaper>
    <Typography variant="title">
      Sorcery
    </Typography>

    <Typography paragraph>
      Sorcerous Motes: { character.sorcerous_motes }
    </Typography>

    <Typography>
      Shaping Rituals:
    </Typography>

    <Typography>
      { character.shaping_rituals }
    </Typography>
  </BlockPaper>
}
SorceryBlock.propTypes = {
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

    const { character, merits, weapons, pools, penalties } = this.props
    return <div>
      <Grid container spacing={ 24 }>
        <Grid item hidden={{ smUp: true }} xs={ 12 }>
          <div style={{ height: '1em', }}>&nbsp;</div>
        </Grid>

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

        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <WillpowerBlock character={ character } />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <HealthLevelBlock character={ character } penalties={ penalties } />
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

            <Grid item xs={ 12 } md={ 5 }>
              <SpecialtyBlock character={ character } />
            </Grid>

            <Grid item xs={ 12 } md={ 7 }>
              <BlockPaper>
                <Typography variant="title"
                  component={ Link } to={ `/characters/${character.id}/merits` }
                  style={{ textDecoration: 'none' }}
                >
                  Merits&nbsp;&nbsp;
                  <Launch style={{ verticalAlign: 'bottom', }} />
                </Typography>

                <MeritSummaryBlock character={ character } merits={ merits } />
              </BlockPaper>
            </Grid>

            <Grid item xs={ 12 } hidden={{ smDown: true }}>
              <BlockPaper>
                <Typography variant="title">
                  Weapons
                </Typography>
                <WeaponSummaryBlock character={ character } weapons={ weapons } />
              </BlockPaper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={ 12 } hidden={{ mdUp: true }}>
          <BlockPaper>
            <Typography variant="title">
              Weapons
            </Typography>
            <WeaponSummaryBlock character={ character } weapons={ weapons } />
          </BlockPaper>
        </Grid>

        <Grid item xs={ 12 } md={ 8 }>
          <CombatBlock character={ character } weapons={ weapons } merits={ merits } penalties={ penalties } pools={ pools } />
        </Grid>

        <Grid item xs={ 12 } md={ 4 }>
          <SocialBlock character={ character } penalties={ penalties } pools={ pools } />
        </Grid>

        <Grid item xs={ 12 } md={ 5 }>
          <ArmorSummary character={ character } pools={ pools } />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <IntimacySummary character={ character } />
        </Grid>

        { character.limit != undefined &&
          <Grid item xs={ 12 } md={ 2 }>
            <LimitTrackBlock character={ character } />
          </Grid>
        }

        { character.is_sorcerer &&
          <Grid item xs={ 12 } md={ 2 }>
            <SorceryBlock character={ character } />
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
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)),
  penalties: PropTypes.object,
  pools: PropTypes.object,
}

function mapStateToProps(state, props) {
  const id = props.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let weapons = []
  let merits = []
  let pools
  let penalties

  if (character != undefined) {
    weapons = character.weapons.map((w) => state.entities.weapons[w])
    merits = character.merits.map((m) => state.entities.merits[m])
    pools = getPoolsAndRatings(state, id)
    penalties = getPenalties(state, id)
  }

  return {
    character,
    weapons,
    merits,
    penalties,
    pools,
  }
}

export default connect(
  mapStateToProps
)(CharacterSheet)
