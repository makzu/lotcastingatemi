import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import Whatshot from 'material-ui-icons/Whatshot'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import PoolLine from '../characters/PoolLine.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget.jsx'
import { canIEditCharacter, getPenalties, getPoolsAndRatings } from '../../selectors'
import * as calc from '../../utils/calculated'
import { fullChar } from '../../utils/propTypes'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
  },
  nameRow: {
    display: 'flex',
  },
  nameWrap: {
    flex: 1,
  },
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  characterName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  moteWrap: {
    marginRight: theme.spacing.unit,
  },
  animaLabel: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  penaltyLabel: {
    ...theme.typography.caption,
  },
  animaCurrent: {
    ...theme.typography.display1,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  animaValue: { ...theme.typography.body1,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '5.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

function CharacterCard({ character, canEdit, penalties, pools, classes }) {
  return <Paper className={ classes.root }>

    <div className={ classes.nameRow }>
      <div className={ classes.nameWrap }>
        <Typography variant="title" className={ classes.characterName }
          component={ Link } to={ `/characters/${character.id}` }
        >
          { character.name }
          { character.anima_level === 3 &&
            <Whatshot className={ classes.icon } />
          }
          <Launch className={ classes.icon } />

          { character.hidden &&
            <div className={ classes.hiddenLabel }>
              <VisibilityOff className={ classes.icon } />&nbsp;
              Hidden
            </div>
          }
        </Typography>
        <PlayerNameSubtitle playerId={ character.player_id } />

        <Typography paragraph>
          Essence { character.essence } { calc.prettyFullExaltType(character) }
        </Typography>
      </div>

      { canEdit &&
        <CharacterCardMenu characterType="character" id={ character.id } />
      }
    </div>


    <Typography className={ classes.rowContainer } component="div">
      { character.motes_personal_total > 0 &&
        <MoteSpendWidget character={ character }>
          <ResourceDisplay className={ classes.moteWrap }
            current={ character.motes_personal_current }
            total={ character.motes_personal_total }
            committed={ calc.committedPersonalMotes(character) }
            label="Personal"
          />
        </MoteSpendWidget>
      }
      { character.motes_peripheral_total > 0 &&
        <MoteSpendWidget character={ character } peripheral>
          <ResourceDisplay className={ classes.moteWrap }
            current={ character.motes_peripheral_current }
            total={ character.motes_peripheral_total }
            committed={ calc.committedPeripheralMotes(character) }
            label="Peripheral"
          />
        </MoteSpendWidget>
      }
      <WillpowerSpendWidget character={ character }>
        <ResourceDisplay className={ classes.moteWrap }
          current={ character.willpower_temporary }
          total={ character.willpower_permanent }
          label="Willpower"
        />
      </WillpowerSpendWidget>
      { character.type != 'Character' &&
        <div className={ classes.moteWrap }>
          <div className={ classes.animaLabel }>Anima</div>
          <div>
            <span className={ classes.animaCurrent }>
              { calc.prettyAnimaLevel(character.anima_level) }
            </span>
            { character.anima_level > 0 &&
              <span className={ classes.animaValue }>
                &nbsp;({ character.anima_level })
              </span>
            }
          </div>
        </div>
      }
    </Typography>

    <HealthLevelBoxes character={ character } />

    <div className={ classes.rowContainer }>
      <PoolLine pool={ pools.evasion } label="Evasion" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.bestParry } label="Best Parry" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.soak } label="Soak" classes={{ root: classes.poolBlock }} />
      { pools.hardness.total > 0 &&
        <PoolLine pool={ pools.hardness } label="Hardness" classes={{ root: classes.poolBlock }} />
      }
    </div>

    <div className={ classes.rowContainer }>
      <PoolLine pool={ pools.resolve } label="Resolve" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.guile } label="Guile" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.appearance } label="Appearance" classes={{ root: classes.poolBlock }} />
    </div>

    <Typography paragraph>
      <strong>Penalties:</strong>&nbsp;
      Mobility -{ penalties.mobility },&nbsp;
      Onslaught -{ character.onslaught },&nbsp;
      Wound -{ penalties.wound }
    </Typography>
  </Paper>
}
CharacterCard.propTypes = {
  character: PropTypes.shape(fullChar).isRequired,
  canEdit: PropTypes.bool,
  pools: PropTypes.object,
  penalties: PropTypes.object,
  classes: PropTypes.object,
}
function mapStateToProps(state, props) {
  return {
    canEdit: canIEditCharacter(state, props.character.id),
    penalties: getPenalties(state, props.character.id),
    pools: getPoolsAndRatings(state, props.character.id),
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CharacterCard))
