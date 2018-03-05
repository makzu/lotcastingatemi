import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import { qcAttack } from '../../utils/propTypes'
import * as calc from '../../utils/calculated'

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

    const { battlegroup, qc_attacks } = this.props

    const attacks = qc_attacks.map((attack) =>
      <div key={attack.id}>
        { attack.name }: { calc.bgAttackPool(battlegroup, attack) } dice {' '}
        ({ calc.bgDamage(battlegroup, attack) } damage{ attack.overwhelming > 1 && <span>, minimum {attack.overwhelming}</span>})
      </div>
    )

    return <BlockPaper>

      <Typography paragraph style={{ whiteSpace: 'pre-line' }}>
        { battlegroup.description }
      </Typography>

      <Typography component="div">
        <strong>Size:</strong> { battlegroup.size },
        <strong> Drill:</strong> { battlegroup.drill },
        <strong> Might:</strong> { battlegroup.might }
      </Typography>

      <Typography component="div">
        <strong>Magnitude:</strong> { battlegroup.magnitude_current } / { battlegroup.magnitude }
      </Typography>

      <Typography component="div">
        <strong>Join Battle:</strong> { battlegroup.join_battle } dice,
        <strong> Combat Movement:</strong> { battlegroup.movement } dice,
        <strong> Soak:</strong> { calc.bgSoak(battlegroup) } {' '}
        ({ battlegroup.armor_name || 'unarmored' }),
        { battlegroup.hardness > 0 &&
          <span> <strong>Hardness:</strong> { battlegroup.hardness },</span>
        }
        <strong> Parry:</strong> { battlegroup.parry + calc.bgDefenseBonus(battlegroup) },
        <strong> Evasion:</strong> { battlegroup.evasion + calc.bgDefenseBonus(battlegroup) }
      </Typography>

      <Typography component="div">
        <strong>Attacks:</strong>
        { attacks }
      </Typography>

      <Typography component="div">
        <strong>Resolve:</strong> { battlegroup.resolve },
        <strong> Guile:</strong> { battlegroup.guile },
        <strong> Appearance:</strong> { battlegroup.appearance }<br />
        <strong>Senses: </strong> { battlegroup.senses }
      </Typography>
    </BlockPaper>
  }
}

BattlegroupSheet.propTypes = {
  id: PropTypes.string,
  battlegroup: PropTypes.object,
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.bgId
  const battlegroup = state.entities.battlegroups[id]

  let qc_attacks = []

  if (battlegroup != undefined) {
    qc_attacks = battlegroup.qc_attacks.map((id) => state.entities.qc_attacks[id])
  }

  return {
    id,
    qc_attacks,
    battlegroup
  }
}

export default connect(
  mapStateToProps
)(BattlegroupSheet)
