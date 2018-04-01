import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import PoolLine from '../characters/PoolLine.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'

import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import { getSpecificBattlegroup, getAttacksForBattlegroup } from '../../selectors'
import { qcAttack } from '../../utils/propTypes'
import {
  totalMagnitude, prettyDrillRating, bgAttackPool, bgDamage, bgSoak,
} from '../../utils/calculated'

const styles = theme => ({
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  moteWrap: {
    marginRight: theme.spacing.unit,
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '4.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
  label: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  tags: { ...theme.typography.body1,
    margin: theme.spacing.unit,
    marginLeft: 0,
    textTransform: 'capitalize',
    minWidth: '5rem',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
})

class BattlegroupSheet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.battlegroup == undefined)
      return <BlockPaper>
        <Typography paragraph>This Battlegroup has not yet loaded.</Typography>
      </BlockPaper>

    const { battlegroup, qc_attacks, classes } = this.props

    const attacks = qc_attacks.map((attack) =>
      <div key={attack.id} className={ classes.rowContainer }>
        <div className={ classes.tags }>
          <div className={ classes.label }>
            <span className={ classes.labelSpan }>Name</span>
          </div>
          { attack.name }
        </div>

        <PoolLine label="Attack"
          pool={{ total: bgAttackPool(battlegroup, attack) }}
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine label="damage"
          pool={{ total: bgDamage(battlegroup, attack) }}
          classes={{ root: classes.poolBlock }}
        />
        { attack.overwhelming > 1 &&
          <PoolLine label="Minimum"
            pool={{ total: attack.overwhelming }}
            classes={{ root: classes.poolBlock }}
          />
        }

        <div className={ classes.tags }>
          <div className={ classes.label }>
            <span className={ classes.labelSpan }>Range</span>
          </div>
          { attack.range }
        </div>

        { attack.tags.length > 0 &&
          <div className={ classes.tags }>
            <div className={ classes.label }>
              <span className={ classes.labelSpan }>Tags</span>
            </div>
            { attack.tags.join(', ') || 'none' }
          </div>
        }
      </div>
    )

    return <BlockPaper>

      <Typography paragraph style={{ whiteSpace: 'pre-line' }}>
        { battlegroup.description }
      </Typography>

      <div className={ classes.rowContainer }>
        <ResourceDisplay
          current={ battlegroup.magnitude }
          total={ totalMagnitude(battlegroup) }
          label="Magnitude"
          className={ classes.poolBlock }
        />

        <PoolLine pool={{ total: battlegroup.size }}
          label="Size"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: prettyDrillRating(battlegroup) }}
          label="Drill"
          classes={{ root: classes.poolBlock }}
        />

        { battlegroup.might > 0 &&
          <PoolLine pool={{ total: battlegroup.might }}
            label="Might"
            classes={{ root: classes.poolBlock }}
          />
        }
        { battlegroup.perfect_morale  &&
          <PoolLine pool={{ total: 'Perfect' }}
            label="Morale"
            classes={{ root: classes.poolBlock }}
          />
        }
      </div>

      <div className={ classes.rowContainer }>
        <PoolLine pool={{ total: battlegroup.join_battle }}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.movement }}
          label="Movement"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.parry }}
          label="Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.evasion }}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: bgSoak(battlegroup) }}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        { battlegroup.hardness > 0 &&
          <PoolLine pool={{ total: battlegroup.hardness }}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        }
        <div className={ classes.tags }>
          <div className={ classes.label }>
            <span className={ classes.labelSpan }>Armor Name</span>
          </div>
          { battlegroup.armor_name || 'Unarmored' }
        </div>
      </div>

      <Typography variant="subheading">
        Attacks
      </Typography>
      { attacks }

      <div className={ classes.rowContainer }>
        <PoolLine pool={{ total: battlegroup.senses }}
          label="Senses"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.resolve }}
          label="Resolve"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.guile }}
          label="Guile"
          classes={{ root: classes.poolBlock }}
        />
        <PoolLine pool={{ total: battlegroup.appearance }}
          label="Appearance"
          classes={{ root: classes.poolBlock }}
        />
      </div>
    </BlockPaper>
  }
}

BattlegroupSheet.propTypes = {
  id: PropTypes.string,
  battlegroup: PropTypes.object,
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  classes: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.bgId
  const battlegroup = getSpecificBattlegroup(state, id)

  let qc_attacks = []

  if (battlegroup != undefined) {
    qc_attacks = getAttacksForBattlegroup(state, id)
  }

  return {
    id,
    qc_attacks,
    battlegroup
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(mapStateToProps)(
      BattlegroupSheet
    )
  )
)
