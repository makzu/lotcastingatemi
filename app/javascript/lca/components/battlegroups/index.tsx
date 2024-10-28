import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Typography, type Theme } from '@mui/material'
import withStyles, { type WithStyles } from '@mui/styles/withStyles'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import ProtectedComponent from '@/containers/ProtectedComponent'
import withRouter from '@/containers/withRouter'
import {
  fetchBattlegroupIfNecessary,
  getSpecificBattlegroup,
} from '@/ducks/entities/battlegroup'
import { getAttacksForBattlegroup } from '@/selectors'
import { type RootState } from '@/store'
import sharedStyles from '@/styles/'
import {
  bgAttackPool,
  bgDamage,
  bgDefenseBonus,
  bgSoak,
  prettyDrillRating,
} from '@/utils/calculated'
import type { Battlegroup, QcAttack } from '@/utils/flow-types'
import PoolDisplay from '../generic/PoolDisplay'
import BattlegroupHealthDisplay from '@/features/battlegroup/components/BattlegroupHealthDisplay'

const styles = (theme: Theme) => ({
  ...sharedStyles(theme),
  healthBlock: {
    paddingTop: theme.spacing(-1),
    marginRight: theme.spacing(),
    paddingRight: theme.spacing(-1),
  },
  poolBlock: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    width: '4.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  tags: {
    ...theme.typography.body1,
    margin: theme.spacing(),
    marginLeft: 0,
    textTransform: 'capitalize',
    minWidth: '5rem',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
  portrait: {
    maxWidth: '100%',
    display: 'block',
    margin: 'auto',
  },
  portraitWrap: {
    //textAlign: 'center',
  },
})

interface Props extends WithStyles<typeof styles> {
  id: string
  battlegroup: Battlegroup
  qc_attacks: QcAttack[]
  fetch: $TSFixMeFunction
}

class BattlegroupSheet extends Component<Props> {
  componentDidMount() {
    this.props.fetch(this.props.id)
  }

  render() {
    /* Escape hatch */
    if (this.props.battlegroup == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>
            This Battlegroup has not yet loaded.
          </Typography>
        </BlockPaper>
      )

    const { battlegroup, qc_attacks, classes } = this.props

    const attacks = qc_attacks.map((attack) => (
      <div key={attack.id} className="flexContainerWrap">
        <div className={classes.tags}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Name</span>
          </div>
          {attack.name}
        </div>

        <PoolDisplay
          battlegroup
          label="Attack"
          pool={{
            total: bgAttackPool(battlegroup, attack),
          }}
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          battlegroup
          label="damage"
          pool={{
            total: bgDamage(battlegroup, attack),
          }}
          classes={{
            root: classes.poolBlock,
          }}
        />
        {attack.overwhelming > 1 && (
          <PoolDisplay
            battlegroup
            label="Minimum"
            pool={{
              total: attack.overwhelming,
            }}
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}

        <div className={classes.tags}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Range</span>
          </div>
          {attack.range}
        </div>

        {attack.tags.length > 0 && (
          <div className={classes.tags}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>Tags</span>
            </div>
            {attack.tags.join(', ') || 'none'}
          </div>
        )}
      </div>
    ))
    return (
      <BlockPaper>
        <MarkdownDisplay source={battlegroup.description} />

        <div className="flexContainerWrap">
          <BattlegroupHealthDisplay
            battlegroup={battlegroup}
            className={classes.healthBlock}
            DisplayClassName={classes.poolBlock}
          />

          <WillpowerSpendWidget bg character={battlegroup}>
            <ResourceDisplay
              className={classes.poolBlock}
              current={battlegroup.willpower_temporary}
              total={battlegroup.willpower_permanent}
              label="Willpower"
            />
          </WillpowerSpendWidget>

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
            // @ts-expect-error Pools and Ratings rewrite
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
              total: battlegroup.join_battle,
            }}
            label="Join Battle"
            classes={{
              root: classes.poolBlock,
            }}
          />
          {/*
          // @ts-expect-error Pools and Ratings rewrite */}
          <PoolDisplay
            battlegroup
            pool={{
              total: battlegroup.movement,
            }}
            label="Movement"
            classes={{
              root: classes.poolBlock,
            }}
          />
          {/*
          // @ts-expect-error Pools and Ratings rewrite */}
          <PoolDisplay
            battlegroup
            pool={{
              total: Math.max(
                battlegroup.evasion +
                  bgDefenseBonus(battlegroup) -
                  battlegroup.onslaught,
                0,
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
          <div className={classes.tags}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>Armor Name</span>
            </div>
            {battlegroup.armor_name || 'Unarmored'}
          </div>
        </div>

        <Typography variant="subtitle1">Attacks</Typography>
        {attacks}

        <div className="flexContainerWrap">
          <PoolDisplay
            battlegroup
            staticRating
            pool={{
              total: battlegroup.senses,
            }}
            label="Senses"
            classes={{
              root: classes.poolBlock,
            }}
          />
          <PoolDisplay
            battlegroup
            staticRating
            pool={{
              total: battlegroup.resolve,
            }}
            label="Resolve"
            classes={{
              root: classes.poolBlock,
            }}
          />
          <PoolDisplay
            battlegroup
            staticRating
            pool={{
              total: battlegroup.guile,
            }}
            label="Guile"
            classes={{
              root: classes.poolBlock,
            }}
          />
          <PoolDisplay
            battlegroup
            staticRating
            pool={{
              total: battlegroup.appearance,
            }}
            label="Appearance"
            classes={{
              root: classes.poolBlock,
            }}
          />
        </div>

        <div className={classes.portraitWrap}>
          <a
            href={battlegroup.portrait_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={battlegroup.portrait_link} className={classes.portrait} />
          </a>
        </div>
      </BlockPaper>
    )
  }
}

function mapStateToProps(state: RootState, ownProps) {
  const id: Battlegroup['id'] = ownProps?.params?.id ?? 0
  const battlegroup = getSpecificBattlegroup(state, id)
  let qc_attacks = []

  if (battlegroup != undefined) {
    qc_attacks = getAttacksForBattlegroup(state, id)
  }

  return {
    id,
    qc_attacks,
    battlegroup,
  }
}

export default compose(
  withRouter,
  ProtectedComponent,
  withStyles(styles),
  connect(mapStateToProps, {
    fetch: fetchBattlegroupIfNecessary,
  }),
)(BattlegroupSheet)
