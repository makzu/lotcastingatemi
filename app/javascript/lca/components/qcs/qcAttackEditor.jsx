// @flow
import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import QcAttackFields from './qcAttackFields.jsx'
import {
  createQcAttack,
  destroyQcAttack,
  updateQcAttack,
} from 'ducks/actions.js'
import { getAttacksForBattlegroup, getAttacksForQc } from 'selectors'
import type { QcAttack, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  qc: Object,
  battlegroup?: boolean,
}
type Props = ExposedProps & {
  qc_attacks: Array<QcAttack>,
  updateQcAttack: Function,
  createQcAttack: Function,
  destroyQcAttack: Function,
}
type State = {
  type: string,
}

class QcAttackEditor extends React.Component<Props, State> {
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

function mapStateToProps(state, ownProps: ExposedProps) {
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

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    updateQcAttack,
    createQcAttack,
    destroyQcAttack,
  }
)

export default enhance(QcAttackEditor)
