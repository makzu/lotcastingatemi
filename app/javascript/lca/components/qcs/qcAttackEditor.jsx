// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import QcAttackFields from './qcAttackFields.jsx'
import {
  createQcAttack,
  destroyQcAttack,
  updateQcAttack,
} from 'ducks/actions.js'
import { getAttacksForBattlegroup, getAttacksForQc } from 'selectors'
import type { fullQc, QcAttack } from 'utils/flow-types'

type Props = {
  qc: fullQc,
  battlegroup?: boolean,
  qc_attacks: Array<QcAttack>,
  updateQcAttack: Function,
  createQcAttack: Function,
  destroyQcAttack: Function,
}

class QcAttackEditor extends Component<Props, { type: string }> {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.battlegroup ? 'Battlegroup' : 'Qc',
    }
  }

  handleChange = (id, trait, value) => {
    this.props.updateQcAttack(
      id,
      this.props.qc.id,
      this.state.type,
      trait,
      value
    )
  }

  handleAdd = () => {
    this.props.createQcAttack(this.props.qc.id, this.state.type)
  }

  handleRemove = id => {
    this.props.destroyQcAttack(id, this.props.qc.id, this.state.type)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcAttacks = this.props.qc_attacks.map(attack => (
      <QcAttackFields
        key={attack.id}
        attack={attack}
        qc={this.props.qc}
        onAttackChange={handleChange}
        onRemoveClick={handleRemove}
        battlegroup={this.props.battlegroup}
      />
    ))

    return (
      <div>
        <Typography variant="subheading">Attacks</Typography>

        {qcAttacks}

        <Button onClick={handleAdd}>
          Add Attack&nbsp;
          <ContentAddCircle />
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const qc = ownProps.qc
  let qc_attacks = []

  if (qc != undefined)
    qc_attacks =
      qc.type === 'battlegroup'
        ? getAttacksForBattlegroup(state, qc.id)
        : getAttacksForQc(state, qc.id)

  return {
    qc_attacks,
  }
}

export default connect(mapStateToProps, {
  updateQcAttack,
  createQcAttack,
  destroyQcAttack,
})(QcAttackEditor)
