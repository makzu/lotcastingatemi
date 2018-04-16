// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from '@material-ui/icons/Launch'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Whatshot from '@material-ui/icons/Whatshot'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import DamageWidget from '../generic/DamageWidget.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import InitiativeWidget from '../generic/InitiativeWidget.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget.jsx'
import { canIDeleteCharacter, getPenalties, getPoolsAndRatings } from '../../selectors'
import * as calc from '../../utils/calculated'
import type { fullChar } from '../../utils/propTypes/flow.js'

const Handle = SortableHandle(() => <DragHandleIcon onClick={ (e) => e.preventDefault() } />)

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
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

type Props = {
  character: fullChar,
  chronicle?: boolean,
  st?: boolean,
  combat?: boolean,
  canDelete: boolean,
  pools: Object,
  penalties: Object,
  classes: Object,
}

export function CharacterCard(
  { character, combat, canDelete, chronicle, st, penalties, pools, classes }: Props
) {
  return <Paper className={ classes.root }>
    { ((chronicle && st) || (!chronicle && canDelete)) &&
      <Typography component="div"
        style={{ position: 'absolute', bottom: '0.5em', right: '0.75em' }}
      >
        <Handle />
      </Typography>
    }

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
        { !combat &&
          <Typography paragraph>
            Essence { character.essence } { calc.prettyFullExaltType(character) }
          </Typography>
        }
      </div>

      { (st || canDelete) &&
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

    <DamageWidget character={ character }>
      <HealthLevelBoxes character={ character } />
    </DamageWidget>

    <div className={ classes.rowContainer }>
      <PoolDisplay staticRating pool={ pools.evasion } label="Evasion" classes={{ root: classes.poolBlock }} />
      <PoolDisplay staticRating pool={ pools.bestParry } label="Best Parry" classes={{ root: classes.poolBlock }} />
      <PoolDisplay staticRating pool={ pools.soak } label="Soak" classes={{ root: classes.poolBlock }} />
      { (pools.hardness.total > 0 || pools.hardness.bonus.length > 0) &&
        <PoolDisplay staticRating pool={ pools.hardness } label="Hardness" classes={{ root: classes.poolBlock }} />
      }
    </div>

    {!combat &&
      <div className={ classes.rowContainer }>
        <PoolDisplay staticRating pool={ pools.resolve } label="Resolve" classes={{ root: classes.poolBlock }} />
        <PoolDisplay staticRating pool={ pools.guile } label="Guile" classes={{ root: classes.poolBlock }} />
        <PoolDisplay staticRating pool={ pools.appearance } label="Appearance" classes={{ root: classes.poolBlock }} />
      </div>
    }

    { (penalties.mobility !== 0 || penalties.onslaught !== 0 || penalties.wound !== 0) &&
      <Typography paragraph style={{ marginTop: '0.5em' }}>
        <strong>Penalties:</strong>&nbsp;
        { penalties.mobility > 0 &&
          <span>Mobility -{ penalties.mobility } </span>
        }
        { penalties.onslaught > 0 &&
          <span>Onslaught -{ character.onslaught } </span>
        }
        { penalties.wound > 0 &&
          <span>Wound -{ penalties.wound }</span>
        }

      </Typography>
    }
    { combat &&
      <InitiativeWidget character={ character } characterType="character" />
    }
  </Paper>
}
function mapStateToProps(state, props) {
  return {
    canDelete: canIDeleteCharacter(state, props.character.id),
    penalties: getPenalties(state, props.character.id),
    pools: getPoolsAndRatings(state, props.character.id),
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CharacterCard))
