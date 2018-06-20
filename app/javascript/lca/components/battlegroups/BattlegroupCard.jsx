// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import Launch from '@material-ui/icons/Launch'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import BattlegroupHealthDisplay from './BattlegroupHealthDisplay.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import sharedStyles from 'styles/'
import { doIOwnBattlegroup } from 'selectors'
import { prettyDrillRating } from 'utils/calculated'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

const styles = theme => ({
  ...sharedStyles(theme),
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
  },
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  nameWrap: {
    flex: 1,
  },
  battlegroupName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  statWrap: {
    marginRight: theme.spacing.unit,
  },
  statLabel: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  statValue: {
    ...theme.typography.body2,
    fontSize: '1.25rem',
    lineHeight: 'inherit',
  },
})

type Props = {
  battlegroup: Object,
  chronicle?: boolean,
  st?: boolean,
  isOwner: boolean,
  classes: Object,
}

function BattlegroupCard(props: Props) {
  const { battlegroup, chronicle, st, isOwner, classes } = props

  return (
    <Paper className={classes.root}>
      {((chronicle && st) || (!chronicle && isOwner)) && (
        <Typography
          component="div"
          style={{ position: 'absolute', bottom: '0.5em', right: '0.75em' }}
        >
          <Handle />
        </Typography>
      )}

      <div className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={classes.battlegroupName}
            component={Link}
            to={`/battlegroups/${battlegroup.id}`}
          >
            {battlegroup.name}
            <Launch className={classes.icon} />

            {battlegroup.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={battlegroup.player_id} />
        </div>

        {isOwner && (
          <CharacterCardMenu characterType="battlegroup" id={battlegroup.id} />
        )}
      </div>

      <div className={classes.flexContainerWrap}>
        <BattlegroupHealthDisplay
          battlegroup={battlegroup}
          className={classes.statWrap}
        />

        <div className={classes.statWrap}>
          <div className={classes.statLabel}>Drill</div>
          <div className={classes.statValue}>
            {prettyDrillRating(battlegroup)}
          </div>
        </div>

        {battlegroup.might > 0 && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Might</div>
            <div className={classes.statValue}>{battlegroup.might}</div>
          </div>
        )}
        {battlegroup.perfect_morale && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Morale</div>
            <div className={classes.statValue}>Perfect</div>
          </div>
        )}
      </div>
      {battlegroup.onslaught > 0 && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>&nbsp; Onslaught -{battlegroup.onslaught}
        </Typography>
      )}
    </Paper>
  )
}
const mapStateToProps = (state, props) => ({
  isOwner: doIOwnBattlegroup(state, props.battlegroup.id),
})

export default withStyles(styles)(connect(mapStateToProps)(BattlegroupCard))
