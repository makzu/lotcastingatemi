import { SortableElement } from 'react-sortable-hoc'
import { Grid, Typography } from '@material-ui/core'

import SortableGridList from '@lca/components/generic/SortableGridList.tsx'
import QcCard from '@lca/components/qcs/QcCard.tsx'
import QcCreatePopup from '@lca/components/qcs/QcCreatePopup.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent'
import { getMyQcs, updateQc } from '@lca/ducks/entities'
import { updateQcSort } from '@lca/ducks/entities/qc'
import { useDocumentTitle } from '@lca/hooks'
import useAppDispatch from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'

const SortableItem = SortableElement(({ children }) => children)

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

  const handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = qcs[oldIndex]
    const charB = qcs[newIndex]
    const offset = charA.sorting > charB.sorting ? 1 : -1
    dispatch(updateQcSort({ id: charA.id, sorting: charB.sorting + offset }))
    dispatch(updateQc(charA.id, { sorting_position: newIndex }))
  }

  const classes = {}

  return (
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
  )
}

export default ProtectedComponent(QcList)
