import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { Grid, Typography } from '@material-ui/core'

import QcCard from '@lca/components/qcs/QcCard.tsx'
import QcCreatePopup from '@lca/components/qcs/QcCreatePopup.tsx'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { getMyQcs, updateQc } from '@lca/ducks/entities/index.ts'
import { useDocumentTitle } from '@lca/hooks/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'

const QcList = () => {
  useDocumentTitle('Qcs | Lot-Casting Atemi')
  const qcs = useAppSelector((state) => getMyQcs(state))
  const dispatch = useAppDispatch()

  const mappedQcs = qcs.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <QcCard qc={c} />
    </SortableGridItem>
  ))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="stickyHeader">
        <Typography variant="h5">
          Qcs &nbsp;
          <QcCreatePopup />
        </Typography>
      </Grid>

      <DragDropProvider
        onDragEnd={(event) => {
          const { source } = event.operation

          if (isSortable(source)) {
            if (source.index === source.initialIndex) {
              return
            }

            dispatch(
              updateQc(source.id as number, {
                sorting_position: source.index,
              }),
            )
          }
        }}
      >
        {mappedQcs}
      </DragDropProvider>
    </Grid>
  )
}

export default ProtectedComponent(QcList)
