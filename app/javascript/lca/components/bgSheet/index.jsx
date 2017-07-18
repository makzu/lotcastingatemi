import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateBattlegroup } from '../../ducks/actions.js'
import { qcAttack } from '../../utils/propTypes'
import * as calc from '../../utils/calculated'

class BgSheet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { battlegroup, qc_attacks } = this.props

    if (battlegroup == undefined) {
      return(<div className="qcSheet">
        <h1>Battlegroup Editor</h1>
        <p>The Battlegroup has not yet loaded.</p>
      </div>)
    }

    const attacks = qc_attacks.map((attack) =>
      <div key={attack.id}>
        { attack.name }: { calc.bgAttackPool(battlegroup, attack) } dice {' '}
        ({ calc.bgDamage(battlegroup, attack) } damage{ attack.overwhelming > 1 && <span>, minimum {attack.overwhelming}</span>})
      </div>
    )

    return(<div className="qcSheet">
      <h1>{ battlegroup.name }</h1>

      <div>
        <strong>Size:</strong> { battlegroup.size }, {' '}
        <strong>Drill:</strong> { battlegroup.drill }, {' '}
        <strong>Might:</strong> { battlegroup.might }
      </div>

      <div>
        <strong>Magnitude:</strong> { battlegroup.magnitude_current } / { battlegroup.magnitude }
      </div>
      <div>
        <strong>Join Battle:</strong> { battlegroup.join_battle } dice, {' '}
        <strong>Combat Movement:</strong> { battlegroup.movement } dice, {' '}
        <strong>Soak:</strong> { calc.bgSoak(battlegroup) } {' '}
        ({ battlegroup.armor_name || 'unarmored' }), {' '}
        { battlegroup.hardness > 0 &&
          <span><strong>Hardness:</strong> { battlegroup.hardness }, </span>
        }
        <strong>Defense:</strong> { calc.bgDefense(battlegroup) }
      </div>
      <div>
        <strong>Attacks:</strong>
        { battlegroup.grapple > 0 &&
          <span>Grapple: { battlegroup.grapple } ({ battlegroup.grapple_control} dice to control)</span>
        }
        { attacks }
      </div>
      <div>
        <strong>Resolve:</strong> { battlegroup.resolve },
        <strong>Guile:</strong> { battlegroup.guile },
        <strong>Appearance:</strong> { battlegroup.appearance }<br />
        <strong>Actions:</strong>
        Senses: { battlegroup.senses }
      </div>

    </div>)
  }
}

BgSheet.propTypes = {
  id: PropTypes.string,
  battlegroup: PropTypes.object,
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  updateBattlegroup: PropTypes.func
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

function mapDispatchToProps(dispatch) {
  return {
    updateBattlegroup: (id, trait, value) => {
      dispatch(updateBattlegroup(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BgSheet)
