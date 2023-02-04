// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
import ProtectedComponent from 'containers/ProtectedComponent'
import withRouter from 'containers/withRouter'
import { fetchBattlegroupIfNecessary } from 'ducks/entities/battlegroup'
import { getAttacksForBattlegroup, getSpecificBattlegroup } from 'selectors'
import sharedStyles from 'styles/'
import {
  bgAttackPool,
  bgDamage,
  bgDefenseBonus,
  bgSoak,
  prettyDrillRating,
} from 'utils/calculated'
import type { Battlegroup, QcAttack } from 'utils/flow-types'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import BattlegroupHealthDisplay from './BattlegroupHealthDisplay.jsx'

const styles = (theme) => ({
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

type Props = {
  id: string,
  battlegroup: Battlegroup,
  qc_attacks: Array<QcAttack>,
  classes: Object,
  fetch: Function,
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
      <div key={attack.id} className={classes.flexContainerWrap}>
        <div className={classes.tags}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Name</span>
          </div>
          {attack.name}
        </div>

        <PoolDisplay
          battlegroup
          label="Attack"
          pool={{ total: bgAttackPool(battlegroup, attack) }}
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          battlegroup
          damage
          label="damage"
          pool={{ total: bgDamage(battlegroup, attack) }}
          classes={{ root: classes.poolBlock }}
        />
        {attack.overwhelming > 1 && (
          <PoolDisplay
            battlegroup
            damage
            label="Minimum"
            pool={{ total: attack.overwhelming }}
            classes={{ root: classes.poolBlock }}
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

        <div className={classes.flexContainerWrap}>
          <BattlegroupHealthDisplay
            battlegroup={battlegroup}
            className={classes.healthBlock}
            DisplayClassName={classes.poolBlock}
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
            pool={{ total: battlegroup.movement }}
            label="Movement"
            classes={{ root: classes.poolBlock }}
          />
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
                0,
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
          <div className={classes.tags}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>Armor Name</span>
            </div>
            {battlegroup.armor_name || 'Unarmored'}
          </div>
        </div>

        <Typography variant="subtitle1">Attacks</Typography>
        {attacks}

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

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id
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
  connect(mapStateToProps, { fetch: fetchBattlegroupIfNecessary }),
)(BattlegroupSheet)
