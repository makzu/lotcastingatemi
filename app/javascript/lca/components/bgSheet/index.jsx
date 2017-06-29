import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateBattlegroup } from '../../ducks/actions.js'
import { fullQc, qcMerit, qcAttack } from '../../utils/propTypes'
import * as calc from '../../utils/calculated'

class BgSheet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { battlegroup, qc, qc_id, qc_attacks, qc_merits } = this.props

    if (battlegroup == undefined) {
      return(<div>
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
    const merits = qc_merits.map((merit) =>
      <div key={merit.id}>
        <strong>{merit.name}: </strong>{ merit.body }
      </div>
    )

    return(<div className="qcSheet">
      <h1>{ battlegroup.name }</h1>
      <h3>Based on <Link to={`/qcs/${qc_id}`}>{ qc.name }</Link></h3>

      <div>
        <strong>Size:</strong> { battlegroup.size }, {' '}
        <strong>Drill:</strong> { battlegroup.drill }, {' '}
        <strong>Might:</strong> { battlegroup.might }
      </div>

      <div>
        <strong>Magnitude:</strong> { battlegroup.magnitude_current } / { calc.bgMagnitudeTotal(battlegroup, qc) }
      </div>
      <div>
        <strong>Join Battle:</strong> { qc.join_battle } dice, {' '}
        <strong>Combat Movement:</strong> { qc.movement } dice, {' '}
        <strong>Soak:</strong> { calc.bgSoak(battlegroup, qc) } ({qc.armor_name}), {' '}
        {qc.hardness > 0 &&
          <span><strong>Hardness:</strong> { qc.hardness }, </span>
        }
        <strong>Defense:</strong> { calc.bgDefense(battlegroup, qc) }
      </div>
      <div>
        <strong>Attacks:</strong>
        { qc.grapple > 0 &&
          <span>Grapple: { qc.grapple } ({ qc.grapple_control} dice to control)</span>
        }
        { attacks }
      </div>
      <div>
        <strong>Resolve:</strong> { qc.resolve },
        <strong>Guile:</strong> { qc.guile },
        <strong>Appearance:</strong> { qc.appearance }<br />
        <strong>Actions:</strong>
        Senses: { qc.senses }
      </div>

      <div>
        <h4 style={{ marginBottom: '0.25em' }}>Merits:</h4>
        { merits }
      </div>
    </div>)
  }
}

BgSheet.propTypes = {
  id: PropTypes.string,
  qc_id: PropTypes.string,
  battlegroup: PropTypes.object,
  qc: PropTypes.shape(fullQc),
  qc_merits: PropTypes.arrayOf(PropTypes.shape(qcMerit)),
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  updateBattlegroup: PropTypes.func
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.bgId
  const battlegroup = state.entities.battlegroups[id]
  const qc = battlegroup != undefined ? state.entities.qcs[battlegroup.qc] : undefined

  let qc_attacks = []
  let qc_merits = []
  let qc_id = 0

  if (qc != undefined) {
    qc_id = qc.id

    if (qc.qc_attacks != undefined) {
      qc_attacks = qc.qc_attacks.map((id) => state.entities.qc_attacks[id])
    }
    if (qc.qc_merits != undefined) {
      qc_merits = qc.qc_merits.map((id) => state.entities.qc_merits[id])
    }
  }

  return {
    id,
    qc,
    qc_id,
    qc_attacks,
    qc_merits,
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
