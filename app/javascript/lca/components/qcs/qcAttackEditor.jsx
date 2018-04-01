import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import QcAttackFields from './qcAttackFields.jsx'
import { createQcAttack, destroyQcAttack, updateQcAttack } from '../../ducks/actions.js'
import { getAttacksForBattlegroup, getAttacksForQc, } from '../../selectors'
import { qcAttack } from '../../utils/propTypes'

class QcAttackEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.battlegroup ? 'Battlegroup' : 'Qc'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(id, trait, value) {
    this.props.updateQcAttack(id, this.props.qc.id, this.state.type, trait, value)
  }

  handleAdd() {
    this.props.addQcAttack(this.props.qc.id, this.state.type)
  }

  handleRemove(id) {
    this.props.removeQcAttack(id, this.props.qc.id, this.state.type)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcAttacks = this.props.qc_attacks.map((attack) =>
      <QcAttackFields key={ attack.id } attack={ attack } qc={ this.props.qc }
        onAttackChange={ handleChange } onRemoveClick={ handleRemove }
        battlegroup={ this.props.battlegroup }
      />
    )

    return <div>
      <Typography variant="subheading">
        Attacks
      </Typography>

      { qcAttacks }

      <Button onClick={ handleAdd }>
        Add Attack&nbsp;
        <ContentAddCircle  />
      </Button>
    </div>
  }
}
QcAttackEditor.propTypes = {
  qc: PropTypes.object,
  battlegroup: PropTypes.bool,
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  updateQcAttack: PropTypes.func,
  addQcAttack: PropTypes.func,
  removeQcAttack: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const qc = ownProps.qc
  let qc_attacks = []

  if (qc != undefined)
    qc_attacks = qc.type === 'battlegroup' ? getAttacksForBattlegroup(state, qc.id) : getAttacksForQc(state, qc.id)

  return {
    qc_attacks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQcAttack: (id, qcId, qcType, trait, value) => {
      dispatch(updateQcAttack(id, qcId, qcType, trait, value))
    },
    addQcAttack: (qcId, qcType) => {
      dispatch(createQcAttack(qcId, qcType))
    },
    removeQcAttack: (id, qcId, qcType) => {
      dispatch(destroyQcAttack(id, qcId, qcType))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcAttackEditor)
