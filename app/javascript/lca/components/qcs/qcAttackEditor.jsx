// @flow
import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import {
  createQcAttack,
  destroyQcAttack,
  updateQcAttack,
} from 'ducks/actions.js'
import { updateQcAttackSort } from 'ducks/entities/qc_attack'
import { getAttacksForBattlegroup, getAttacksForQc } from 'selectors'
import type { Enhancer, QcAttack } from 'utils/flow-types'
import QcAttackFields from './qcAttackFields.jsx'

const SortableItem = SortableElement(({ children }) => children)
const SortableAttackList = SortableContainer(({ items }) => <div>{items}</div>)

type ExposedProps = {
  qc: Object,
  battlegroup?: boolean,
}
type Props = ExposedProps & {
  qc_attacks: Array<QcAttack>,
  type: 'qc' | 'battlegroup',
  updateQcAttack: Function,
  createQcAttack: Function,
  destroyQcAttack: Function,
  updateQcAttackSort: Function,
}

class QcAttackEditor extends React.Component<Props> {
  handleChange = (id, trait) => {
    this.props.updateQcAttack(id, this.props.qc.id, trait, this.props.type)
  }

  handleAdd = () => {
    this.props.createQcAttack(this.props.qc.id, { parent: this.props.type })
  }

  handleRemove = (id) => {
    this.props.destroyQcAttack(id, this.props.qc.id, this.props.type)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    const attackA = this.props.qc_attacks[oldIndex]
    const attackB = this.props.qc_attacks[newIndex]
    const offset = attackA.sorting > attackB.sorting ? -1 : 1
    this.props.updateQcAttackSort({
      id: attackA.id,
      sorting: attackB.sorting + offset,
    })
    this.props.updateQcAttack(
      attackA.id,
      this.props.qc.id,
      { sorting_position: newIndex },
      this.props.type,
    )
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this

    const qcAttacks = this.props.qc_attacks.map((attack, i) => (
      <SortableItem index={i} key={attack.id}>
        <QcAttackFields
          attack={attack}
          qc={this.props.qc}
          onAttackChange={handleChange}
          onRemoveClick={handleRemove}
          battlegroup={this.props.battlegroup}
        />
      </SortableItem>
    ))

    return (
      <div>
        <Typography variant="subtitle1">Attacks</Typography>
        <SortableAttackList
          items={qcAttacks}
          onSortEnd={handleSort}
          useDragHandle={true}
        />

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
  let type = 'qc'

  if (qc != undefined) {
    if (qc.type === 'battlegroup') {
      type = 'battlegroup'
      qc_attacks = getAttacksForBattlegroup(state, qc.id)
    } else {
      qc_attacks = getAttacksForQc(state, qc.id)
    }
  }

  return {
    qc_attacks,
    type,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  updateQcAttack,
  createQcAttack,
  destroyQcAttack,
  updateQcAttackSort,
})

export default enhance(QcAttackEditor)
