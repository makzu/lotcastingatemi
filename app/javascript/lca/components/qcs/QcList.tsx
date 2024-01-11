import React from 'react'
import DocumentTitle from 'react-document-title'
import { useDispatch, useSelector } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import { Grid, Typography } from '@material-ui/core'

import SortableGridList from 'components/generic/SortableGridList'
import QcCard from 'components/qcs/QcCard'
import QcCreatePopup from 'components/qcs/qcCreatePopup'
import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMyQcs, updateQc } from 'ducks/entities'
import SortableItem from 'components/generic/SortableItem'

const QcList = () => {
  const qcs = useSelector((state: State) => getMyQcs(state))
  const dispatch = useDispatch()

  const chars = qcs.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="qcs">
      <Grid item xs={12} md={6} xl={4}>
        <QcCard qc={c} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = qcs[oldIndex]
    const charB = qcs[newIndex]
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    dispatch(updateQc(charA.id, { sort_order: charB.sort_order + offset }))
  }

  const classes = {}

  return (
    <>
      <DocumentTitle title="Qcs | Lot-Casting Atemi" />

      <SortableGridList
        header={
          <Typography variant="h5">
            Qcs &nbsp;
            <QcCreatePopup />
          </Typography>
        }
        items={chars}
        classes={classes}
        onSortEnd={handleSort}
        useDragHandle
        axis="xy"
      />
    </>
  )
}

export default ProtectedComponent(QcList)
