import { Component } from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'

import ContentAddCircle from '@mui/icons-material/AddCircle'

import QcAttackFields from './qcAttackFields'
import {
  createQcAttack,
  destroyQcAttack,
  updateQcAttack,
} from '@/ducks/actions'
import { getAttacksForBattlegroup, getAttacksForQc } from '@/selectors'
import type { QcAttack, Enhancer } from '@/utils/flow-types'
import SortableItem from '@/components/generic/SortableItem'
import type { RootState } from 'store'
import type { Battlegroup, QC } from '@/types'

import { Button, Typography } from '@mui/material'

// @ts-expect-error New dnd library should fix this
const SortableAttackList = SortableContainer(({ items }) => <div>{items}</div>)
interface ExposedProps {
  qc: QC | Battlegroup
  battlegroup?: boolean
}
type Props = ExposedProps & {
  qc_attacks: QcAttack[]
  type: 'qc' | 'battlegroup'
  updateQcAttack: $TSFixMeFunction
  createQcAttack: $TSFixMeFunction
  destroyQcAttack: $TSFixMeFunction
}

class QcAttackEditor extends Component<Props> {
  handleChange = (id, trait) => {
    this.props.updateQcAttack(id, this.props.qc.id, trait, this.props.type)
  }
  handleAdd = () => {
    this.props.createQcAttack(this.props.qc.id, {
      parent: this.props.type,
    })
  }
  handleRemove = (id: number) => {
    this.props.destroyQcAttack(id, this.props.qc.id, this.props.type)
  }
  handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const attackA = this.props.qc_attacks[oldIndex]!
    const attackB = this.props.qc_attacks[newIndex]!
    const offset = attackA.sort_order > attackB.sort_order ? -1 : 1
    this.props.updateQcAttack(
      attackA.id,
      this.props.qc.id,
      { sort_order: attackB.sort_order + offset },
      this.props.type,
    )
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this
    const qcAttacks = this.props.qc_attacks.map((attack, i) => (
      <SortableItem index={i} key={attack.id}>
        <QcAttackFields
          attack={attack}
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
          useDragHandle
        />

        <Button onClick={handleAdd}>
          Add Attack&nbsp;
          <ContentAddCircle />
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state: RootState, ownProps: ExposedProps) {
  const qc = ownProps.qc
  let qc_attacks: QcAttack[] = []
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

// @ts-expect-error hooks rewrite will fix this
const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  updateQcAttack,
  createQcAttack,
  destroyQcAttack,
})
export default enhance(QcAttackEditor)
