import { Component } from 'react'
import { connect } from 'react-redux'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import { Button, Grid, Typography } from '@mui/material'

import SortableGridList from '@/components/generic/SortableGridList.jsx'
import SortableItem from '@/components/generic/SortableItem'
import {
  createQcMerit,
  destroyQcMerit,
  updateQcMerit,
} from '@/ducks/actions.js'
import { updateQcMeritSort } from '@/ducks/entities/qc_merit'
import { getMeritsForQc } from '@/selectors'
import { type RootState } from '@/store.js'
import type { Enhancer, QcMerit, fullQc } from '@/utils/flow-types'
import QcMeritFields from './qcMeritFields.jsx'

interface ExposedProps {
  qc: fullQc
  classes: Record<string, $TSFixMe>
}
type Props = ExposedProps & {
  qc_merits: QcMerit[]
  updateQcMerit: $TSFixMeFunction
  createQcMerit: $TSFixMeFunction
  destroyQcMerit: $TSFixMeFunction
  updateQcMeritSort: $TSFixMeFunction
}

class QcMeritEditor extends Component<Props> {
  handleChange = (id, trait) => {
    this.props.updateQcMerit(id, this.props.qc.id, trait)
  }
  handleAdd = () => {
    this.props.createQcMerit(this.props.qc.id)
  }
  handleRemove = (id) => {
    this.props.destroyQcMerit(id, this.props.qc.id)
  }
  handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.qc_merits[oldIndex]!
    const meritB = this.props.qc_merits[newIndex]!
    const offset = meritA.sorting > meritB.sorting ? -1 : 1

    this.props.updateQcMeritSort({
      id: meritA.id,
      sorting: meritB.sorting + offset,
    })
    this.props.updateQcMerit(meritA.id, this.props.qc.id, {
      sorting_position: newIndex,
    })
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this
    const { classes } = this.props
    const qcMerits = this.props.qc_merits.map((merit, i) => (
      <SortableItem key={merit.id} index={i}>
        <Grid item xs={12} md={6} xl={4}>
          <QcMeritFields
            merit={merit}
            qc={this.props.qc}
            onMeritChange={handleChange}
            onRemoveClick={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))
    return (
      <SortableGridList
        header={
          <Typography variant="h6">
            Merits
            <Button onClick={handleAdd}>
              Add Merit
              <ContentAddCircle />
            </Button>
          </Typography>
        }
        items={qcMerits}
        classes={classes}
        onSortEnd={handleSort}
        useDragHandle
        axis="xy"
      />
    )
  }
}

function mapStateToProps(state: RootState, ownProps: ExposedProps) {
  const qc = ownProps.qc
  const qc_merits = qc !== undefined ? getMeritsForQc(state, qc.id) : []
  return {
    qc_merits,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  updateQcMerit,
  createQcMerit,
  destroyQcMerit,
  updateQcMeritSort,
})

export default enhance(QcMeritEditor)
