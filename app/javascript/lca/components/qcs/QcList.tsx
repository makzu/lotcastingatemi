import { Grid, Typography } from '@mui/material'

import SortableGridList from '@/components/generic/SortableGridList'
import QcCard from '@/components/qcs/QcCard'
import QcCreatePopup from '@/components/qcs/qcCreatePopup'
import ProtectedComponent from '@/containers/ProtectedComponent'
import { getMyQcs, updateQc } from '@/ducks/entities'
import { useAppDispatch, useAppSelector, useDocumentTitle } from '@/hooks'
import SortableItem from '../generic/SortableItem'

const QcList = () => {
  useDocumentTitle('Qcs | Lot-Casting Atemi')
  const qcs = useAppSelector((state) => getMyQcs(state))
  const dispatch = useAppDispatch()

  const chars = qcs.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="qcs">
      <Grid item xs={12} md={6} xl={4}>
        <QcCard qc={c} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = qcs[oldIndex]!
    const charB = qcs[newIndex]!
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    dispatch(updateQc(charA.id, { sort_order: charB.sort_order + offset }))
  }

  const classes = {}

  return (
    <>
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
