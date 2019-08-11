// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import BattlegroupHealthDisplay from './BattlegroupHealthDisplay.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CharacterMenu from '../generic/CharacterMenu'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import sharedStyles from 'styles/'
import { doIOwnBattlegroup } from 'selectors'
import { bgDefenseBonus, bgSoak, prettyDrillRating } from 'utils/calculated'
import type { Battlegroup, Enhancer } from 'utils/flow-types'

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
    marginLeft: theme.spacing(),
  },
  poolBlock: {
    marginRight: theme.spacing(),
    minWidth: '4rem',
  },
})

type ExposedProps = {
  battlegroup: Battlegroup,
  chronicle?: boolean,
  st?: boolean,
}
type Props = ExposedProps & {
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

      <Typography component="div" className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
            className={classes.battlegroupName}
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

          {chronicle && <PlayerNameSubtitle playerId={battlegroup.player_id} />}
        </div>

        <CharacterMenu
          characterType="battlegroup"
          id={battlegroup.id}
          chronicle={chronicle}
        />
      </Typography>

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
          pool={{ total: battlegroup.join_battle }}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          pool={{
            total: Math.max(
              battlegroup.evasion +
                bgDefenseBonus(battlegroup) -
                battlegroup.onslaught,
              0
            ),
          }}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{
            total: Math.max(
              battlegroup.parry +
                bgDefenseBonus(battlegroup) -
                battlegroup.onslaught,
              0
            ),
          }}
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

      <div className={classes.flexContainerWrap}>
        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.senses }}
          label="Senses"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.resolve }}
          label="Resolve"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.guile }}
          label="Guile"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.appearance }}
          label="Appearance"
          classes={{ root: classes.poolBlock }}
        />
      </div>

      {battlegroup.onslaught > 0 && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp;Onslaught -{battlegroup.onslaught}
        </Typography>
      )}
    </Paper>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  isOwner: doIOwnBattlegroup(state, props.battlegroup.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles)
)

export default enhance(BattlegroupCard)
