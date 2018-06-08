// @flow
import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import JoinBattlePopup from './JoinBattlePopup.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Character, fullQc, Battlegroup } from 'utils/flow-types'

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
  animaLabel: {
    ...theme.typography.body1,
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
  animaValue: {
    ...theme.typography.body1,
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
  character: Character | fullQc | Battlegroup,
  canEdit: boolean,
  update: Function,
  pools: Object,
  classes: Object,
}

function OutOfCombatCard({
  character,
  canEdit,
  //eslint-disable-next-line no-unused-vars
  update,
  pools,
  classes,
}: Props) {
  return (
    <Paper className={classes.root}>
      <div className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography variant="title" className={classes.characterName}>
            {character.name}

            {character.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />&nbsp; Hidden
              </div>
            )}
          </Typography>
          <PlayerNameSubtitle playerId={character.player_id} />
        </div>
      </div>

      <div className={classes.rowContainer}>
        <PoolDisplay
          qc={character.type === 'qc' || character.type === 'battlegroup'}
          pool={pools.joinBattle}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
        {canEdit && (
          <JoinBattlePopup character={character} pool={pools.joinBattle} />
        )}
      </div>
    </Paper>
  )
}
function mapStateToProps(state, props) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'

  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}
function mapDispatchToProps(dispatch: Function, props) {
  let action
  switch (props.character.type) {
    case 'qc':
      action = updateQc
      break
    case 'battlegroup':
      action = updateBattlegroup
      break
    case 'character':
    default:
      action = updateCharacter
  }

  return {
    update: (id, trait, value) => dispatch(action(id, trait, value)),
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutOfCombatCard)
)
