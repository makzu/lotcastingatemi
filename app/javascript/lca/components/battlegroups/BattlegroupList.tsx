import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { Grid, Typography } from '@material-ui/core'

import BattlegroupCard from '@lca/components/battlegroups/BattlegroupCard.tsx'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import {
  getMyBattlegroups,
  updateBattlegroup,
} from '@lca/ducks/entities/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import { useBetterDocumentTitle } from '@lca/hooks/UseDocumentTitle.ts'
import BattlegroupCreatePopup from './BattlegroupCreatePopup.tsx'

const BattlegroupList = () => {
  useBetterDocumentTitle('Battlegroups')
  const battlegroups = useAppSelector((state) => getMyBattlegroups(state))
  const dispatch = useAppDispatch()

  const mappedBgs = battlegroups.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <BattlegroupCard battlegroup={c} />
    </SortableGridItem>
  ))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="stickyHeader">
        <Typography variant="h5">
          Battlegroups &nbsp;
          <BattlegroupCreatePopup />
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
              updateBattlegroup(source.id as number, {
                sorting_position: source.index,
              }),
            )
          }
        }}
      >
        {mappedBgs}
      </DragDropProvider>
    </Grid>
  )
}

export default ProtectedComponent(BattlegroupList)
