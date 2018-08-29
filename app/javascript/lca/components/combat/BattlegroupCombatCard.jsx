// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import CombatControls from './CombatControls.jsx'
import BattlegroupHealthDisplay from '../battlegroups/BattlegroupHealthDisplay.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import RemoveFromCombatButton from './RemoveFromCombatButton.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import sharedStyles from 'styles/'
import { bgDefenseBonus, bgSoak, prettyDrillRating } from 'utils/calculated'
import type { Battlegroup } from 'utils/flow-types'

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
  hasActed: {
    textDecoration: 'none',
    opacity: 0.5,
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    minWidth: '3rem',
  },
})

type Props = {
  battlegroup: Battlegroup,
  classes: Object,
}

function BattlegroupCard({ battlegroup, classes }: Props) {
  return (
    <Paper className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={
              battlegroup.has_acted ? classes.hasActed : classes.battlegroupName
            }
            component={Link}
            to={`/battlegroups/${battlegroup.id}`}
          >
            {battlegroup.name}

            {battlegroup.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={battlegroup.player_id} />
        </div>
      </div>

      <CombatControls character={battlegroup} characterType="battlegroup" />

      <div className={classes.flexContainerWrap}>
        <BattlegroupHealthDisplay
          battlegroup={battlegroup}
          className={classes.poolBlock}
        />

        <PoolDisplay
          battlegroup
          pool={{ total: prettyDrillRating(battlegroup) }}
          label="Drill"
          classes={{ root: classes.poolBlock }}
        />

        {battlegroup.might > 0 && (
          <PoolDisplay
            battlegroup
            pool={{ total: battlegroup.might }}
            label="Might"
            classes={{ root: classes.poolBlock }}
          />
        )}
        {battlegroup.perfect_morale && (
          <PoolDisplay
            battlegroup
            pool={{ total: 'Perfect' }}
            label="Morale"
            classes={{ root: classes.poolBlock }}
          />
        )}
      </div>

      <div className={classes.flexContainerWrap}>
        <PoolDisplay
          battlegroup
          pool={{ total: battlegroup.evasion + bgDefenseBonus(battlegroup) }}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.parry + bgDefenseBonus(battlegroup) }}
          label="Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          pool={{ total: bgSoak(battlegroup) }}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {battlegroup.hardness > 0 && (
          <PoolDisplay
            battlegroup
            pool={{ total: battlegroup.hardness }}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
      </div>

      {battlegroup.onslaught > 0 && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp; Onslaught -{battlegroup.onslaught}
        </Typography>
      )}

      <RemoveFromCombatButton
        character={battlegroup}
        characterType="battlegroup"
      />
    </Paper>
  )
}

export default withStyles(styles)(BattlegroupCard)
