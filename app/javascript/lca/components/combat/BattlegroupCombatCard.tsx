import { Link } from 'react-router-dom'

import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import CombatControls from './CombatControls'
import BattlegroupHealthDisplay from '../battlegroups/BattlegroupHealthDisplay'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle'
import RemoveFromCombatButton from './RemoveFromCombatButton'
import PoolDisplay from '../generic/PoolDisplay'
import CardBase from 'components/shared/CardBase'
import sharedStyles from 'styles/'
import { bgDefenseBonus, bgSoak, prettyDrillRating } from 'utils/calculated'
import type { Battlegroup } from 'utils/flow-types'

const styles = (theme) => ({
  ...sharedStyles(theme),
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  nameWrap: {
    flex: 1,
    '& a': {
      color: 'unset',
    },
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
    marginLeft: theme.spacing(),
  },
  poolBlock: {
    marginRight: theme.spacing(),
    minWidth: '3rem',
  },
})

interface Props {
  battlegroup: Battlegroup
  classes: Record<string, $TSFixMe>
}

function BattlegroupCard({ battlegroup, classes }: Props) {
  return (
    <CardBase>
      <div className="flexContainer">
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
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

      <div className="flexContainerWrap">
        <BattlegroupHealthDisplay
          battlegroup={battlegroup}
          className={classes.poolBlock}
        />

        <PoolDisplay
          battlegroup
          pool={{
            total: prettyDrillRating(battlegroup),
          }}
          label="Drill"
          classes={{
            root: classes.poolBlock,
          }}
        />

        {battlegroup.might > 0 && (
          <PoolDisplay
            battlegroup
            pool={{
              total: battlegroup.might,
            }}
            label="Might"
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}
        {battlegroup.perfect_morale && (
          <PoolDisplay
            battlegroup
            pool={{
              total: 'Perfect',
            }}
            label="Morale"
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}
      </div>

      <div className="flexContainerWrap">
        <PoolDisplay
          battlegroup
          pool={{
            total: Math.max(
              battlegroup.evasion +
                bgDefenseBonus(battlegroup) -
                battlegroup.onslaught,
              0,
            ),
          }}
          label="Evasion"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          battlegroup
          staticRating
          pool={{
            total: Math.max(
              battlegroup.parry +
                bgDefenseBonus(battlegroup) -
                battlegroup.onslaught,
              0,
            ),
          }}
          label="Parry"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          battlegroup
          pool={{
            total: bgSoak(battlegroup),
          }}
          label="Soak"
          classes={{
            root: classes.poolBlock,
          }}
        />
        {battlegroup.hardness > 0 && (
          <PoolDisplay
            battlegroup
            pool={{
              total: battlegroup.hardness,
            }}
            label="Hardness"
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}
      </div>

      {battlegroup.onslaught > 0 && (
        <Typography
          paragraph
          style={{
            marginTop: '0.5em',
          }}
        >
          <strong>Penalties:</strong>
          &nbsp; Onslaught -{battlegroup.onslaught}
        </Typography>
      )}

      <RemoveFromCombatButton
        character={battlegroup}
        characterType="battlegroup"
      />
    </CardBase>
  )
}

export default withStyles(styles)(BattlegroupCard)
