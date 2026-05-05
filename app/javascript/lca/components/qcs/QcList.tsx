import DocumentTitle from 'react-document-title'
import { SortableElement } from 'react-sortable-hoc'
import { Grid, Typography } from '@material-ui/core'

import useAppDispatch from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import SortableGridList from 'components/generic/SortableGridList.tsx'
import QcCard from 'components/qcs/QcCard.jsx'
import QcCreatePopup from 'components/qcs/qcCreatePopup.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getMyQcs, updateQc } from 'ducks/entities'
import { updateQcSort } from 'ducks/entities/qc'

const SortableItem = SortableElement(({ children }) => children)

const QcList = () => {
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
